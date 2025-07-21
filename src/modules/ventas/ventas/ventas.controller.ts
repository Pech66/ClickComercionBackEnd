import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, BadRequestException, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { VentasService } from './ventas.service';
import { Roles } from 'src/components/roles/roles.decorator';
import { Rol } from 'src/components/roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/components/roles/roles.guard';
import { AgregarProductoVentaDto } from './dto/agregar.producto.venta.dto';
import { AumentarCantidadProductoDto } from './dto/aumentar.cantidad.producto.dto';
import { FinalizarVentaDto } from './dto/finalizar.venta.dto';
import { HistorialDetallesVentaDto } from './dto/historial_detalles_venta.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@ApiTags('Ventas')
@Controller('ventas')
@ApiBearerAuth('access-token')
@Roles(Rol.ADMIN_TIENDA)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class VentasController {
    constructor(
        private readonly ventasService: VentasService,
        private readonly prisma: PrismaService
    ) {}

    // --------- UTILIDAD PARA OBTENER ID DE TIENDA ---------
    private async obtenerTiendaId(req: any): Promise<string> {
        const usuarioId = req.user?.Id || req.user?.id;
        if (!usuarioId) throw new BadRequestException('No se pudo identificar al usuario autenticado.');

        const usuario = await this.prisma.usuarios.findUnique({
            where: { Id: usuarioId },
            include: { tienda: true }
        });

        if (!usuario || !usuario.Id_tienda || !usuario.tienda) {
            throw new BadRequestException('Debes crear una tienda primero.');
        }
        return usuario.Id_tienda;
    }

    // --------- 1. Iniciar venta ---------
    @Post('iniciar')
    @ApiOperation({ summary: 'Iniciar nueva venta para mi tienda' })
    async iniciarVenta(@Req() req: any) {
        const usuarioId = req.user?.Id || req.user?.id;
        if (!usuarioId) throw new BadRequestException('No se pudo identificar al usuario autenticado.');
        const usuario = await this.prisma.usuarios.findUnique({
            where: { Id: usuarioId },
            include: { tienda: true }
        });
        if (!usuario || !usuario.Id_tienda || !usuario.tienda) {
            throw new BadRequestException('Debes crear una tienda primero.');
        }
        return this.ventasService.iniciarVenta(usuario.Id_tienda);
    }

    // --------- 2A. Buscar productos por nombre/categoría (para búsquedas manuales) ---------
    @Get(':ventaId/buscar-productos')
    @ApiOperation({ summary: 'Buscar productos disponibles para agregar a la venta' })
    async buscarProductosEnVenta(
        @Param('ventaId') ventaId: string,
        @Query('query') query?: string,
        @Query('categoria') categoria?: string,
        @Req() req?: any
    ) {
        const tiendaId = await this.obtenerTiendaId(req);
        if (!query && !categoria) {
            throw new BadRequestException({
                mensaje: 'Debes proporcionar al menos uno de estos filtros: query (nombre/código de barras) o categoria.',
                parametros_recibidos: { ventaId, query, categoria },
                parametros_requeridos: ['ventaId (obligatorio)', 'query (opcional)', 'categoria (opcional)'],
                ejemplo: { ventaId: 'id_venta', query: '31668462986', categoria: 'lacteos' }
            });
        }
        return this.ventasService.buscarProductosDisponibles(ventaId, tiendaId, query, categoria);
    }

    // --------- 2B. Buscar producto por código de barras (¡para escáner!) ---------
    @Get(':ventaId/buscar-producto-codigo')
    @ApiOperation({ summary: 'Buscar producto por código de barras para agregar a la venta' })
    async buscarProductoPorCodigo(
        @Param('ventaId') ventaId: string,
        @Query('codigo') codigo: string,
        @Req() req?: any
    ) {
        if (!codigo) {
            throw new BadRequestException({
                mensaje: 'Debes enviar el parámetro "codigo" en el query string.',
                query_recibido: { codigo },
                query_requerido: { codigo: 'string (requerido)' },
                ejemplo: { codigo: '1234567890' }
            });
        }
        const tiendaId = await this.obtenerTiendaId(req);
        return this.ventasService.buscarProductoPorCodigo(ventaId, tiendaId, codigo);
    }

    // --------- 3. Agregar producto a la venta (carrito) ---------
    @Post(':ventaId/agregar-producto')
    @ApiOperation({ summary: 'Agregar producto a la venta (normal o granel)' })
    async agregarProducto(
        @Param('ventaId') ventaId: string,
        @Body() data: AgregarProductoVentaDto,
        @Req() req?: any
    ) {
        const tiendaId = await this.obtenerTiendaId(req);
        if (!data.Id_producto || (data.cantidad !== undefined && data.cantidad < 0)) {
            throw new BadRequestException({
                mensaje: 'Datos enviados inválidos.',
                body_recibido: data,
                body_requerido: {
                    Id_producto: 'string (requerido)',
                    cantidad: 'number (opcional - 1 por defecto, requerido para granel)'
                },
                ejemplo: {
                    Id_producto: 'id-del-producto',
                    cantidad: 2
                }
            });
        }
        return this.ventasService.agregarProductoInteligente(ventaId, data, tiendaId);
    }

    // --------- 4. Ver venta/carrito actual ---------
    @Get(':ventaId/ver')
    @ApiOperation({ summary: 'Ver venta actual con todos los productos' })
    async verVentaActual(
        @Param('ventaId') ventaId: string,
        @Req() req?: any
    ) {
        const tiendaId = await this.obtenerTiendaId(req);
        return this.ventasService.verVentaActual(ventaId, tiendaId);
    }

    // --------- 5A. Aumentar cantidad (solo suma) ---------
    @Put(':ventaId/aumentar-producto/:productoId')
    @ApiOperation({ summary: 'Aumentar cantidad de producto en la venta' })
    async aumentarCantidad(
        @Param('ventaId') ventaId: string,
        @Param('productoId') productoId: string,
        @Body() datos: AumentarCantidadProductoDto,
        @Req() req?: any
    ) {
        const tiendaId = await this.obtenerTiendaId(req);
        if (datos.cantidadAdicional === undefined || datos.cantidadAdicional <= 0) {
            throw new BadRequestException({
                mensaje: 'Debes enviar una cantidadAdicional mayor a 0.',
                body_recibido: datos,
                body_requerido: {
                    cantidadAdicional: 'number (mayor a 0, requerido)'
                },
                ejemplo: {
                    cantidadAdicional: 3
                }
            });
        }
        return this.ventasService.aumentarCantidadProducto(ventaId, productoId, datos.cantidadAdicional, tiendaId);
    }

    // --------- 5B. Modificar cantidad absoluta (o eliminar con 0) ---------
    @Put(':ventaId/modificar-producto/:productoId')
    @ApiOperation({ summary: 'Modificar cantidad de producto en la venta (o eliminar si cantidad = 0)' })
    async modificarProducto(
        @Param('ventaId') ventaId: string,
        @Param('productoId') productoId: string,
        @Body() datos: AumentarCantidadProductoDto,
        @Req() req?: any
    ) {
        const tiendaId = await this.obtenerTiendaId(req);
        if (datos.cantidadAdicional === undefined || datos.cantidadAdicional < 0) {
            throw new BadRequestException({
                mensaje: 'Debes enviar una cantidadAdicional mayor o igual a 0.',
                body_recibido: datos,
                body_requerido: {
                    cantidadAdicional: 'number (>= 0, requerido)'
                },
                ejemplo: {
                    cantidadAdicional: 0
                }
            });
        }
        return this.ventasService.modificarCantidadOEliminarProducto(ventaId, productoId, datos.cantidadAdicional, tiendaId);
    }

    // --------- 6. Finalizar venta ---------
    @Put(':ventaId/finalizar')
    @ApiOperation({ summary: 'Finalizar venta y procesar pago' })
    async finalizarVenta(
        @Param('ventaId') ventaId: string,
        @Body() datos: FinalizarVentaDto,
        @Req() req?: any
    ) {
        const tiendaId = await this.obtenerTiendaId(req);
        if (!datos.cantidadRecibida || datos.cantidadRecibida <= 0) {
            throw new BadRequestException({
                mensaje: 'Debes enviar la cantidadRecibida (mayor a 0).',
                body_recibido: datos,
                body_requerido: {
                    cantidadRecibida: 'number (mayor a 0, requerido)'
                },
                ejemplo: {
                    cantidadRecibida: 100
                }
            });
        }
        return this.ventasService.procesarPago(ventaId, datos, tiendaId);
    }

    // --------- 7. Cancelar venta ---------
    @Delete(':ventaId/cancelar')
    @ApiOperation({ summary: 'Cancelar venta' })
    async cancelarVenta(
        @Param('ventaId') ventaId: string,
        @Req() req?: any
    ) {
        const tiendaId = await this.obtenerTiendaId(req);
        return this.ventasService.cancelarVenta(ventaId, tiendaId);
    }

    // --------- 8. Historial de ventas ---------
    @Get('historial')
    @ApiOperation({ summary: 'Historial de productos vendidos de mi tienda (paginado y por fecha)' })
    async historialVentas(
        @Req() req: any,
        @Query('desde') desde?: string,
        @Query('hasta') hasta?: string,
        @Query('pagina') pagina: number = 1,
        @Query('limite') limite: number = 20,
        @Query('producto') producto?: string,
    ) {
        const tiendaId = await this.obtenerTiendaId(req);
        return this.ventasService.historialDetallesVenta(tiendaId, { desde, hasta, pagina, limite, producto });
    }
}

