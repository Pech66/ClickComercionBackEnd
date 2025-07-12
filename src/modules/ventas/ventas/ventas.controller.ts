import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, BadRequestException, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { VentasService } from './ventas.service';
import { Roles } from 'src/components/roles/roles.decorator';
import { Rol } from 'src/components/roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/components/roles/roles.guard';
import { AgregarProductoVentaDto } from './dto/agregar.producto.venta.dto';
import { AumentarCantidadProductoDto } from './dto/aumentar.cantidad.producto.dto';
import { FinalizarVentaDto } from './dto/finalizar.venta.dto';


@ApiTags('Ventas')
@Controller('ventas')
@ApiBearerAuth('access-token')
@Roles(Rol.ADMIN_TIENDA)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class VentasController {
    constructor(private readonly ventasService: VentasService) { }

    private obtenerTiendaId(req: any): string {
        const tiendaId = req.user?.tiendaId || req.user?.Id_tienda;
        if (!tiendaId) throw new BadRequestException('Usuario no tiene tienda asignada');
        return tiendaId;
    }

    @Post('iniciar')
    @ApiOperation({ summary: 'Iniciar nueva venta para mi tienda' })
    @ApiResponse({ status: 201, description: 'Venta iniciada exitosamente' })
    @ApiResponse({ status: 400, description: 'Error en la solicitud. Ejemplo: Usuario no tiene tienda asignada.' })
    async iniciarVenta(@Req() req: any) {
        const tiendaId = this.obtenerTiendaId(req);
        return this.ventasService.iniciarVenta(tiendaId);
    }

    @Get(':ventaId/buscar-productos')
    @ApiOperation({ summary: 'Buscar productos disponibles para agregar a la venta' })
    @ApiParam({ name: 'ventaId', description: 'ID de la venta activa' })
    async buscarProductosEnVenta(
        @Param('ventaId') ventaId: string,
        @Req() req?: any
    ) {
        const tiendaId = this.obtenerTiendaId(req);
        return this.ventasService.buscarProductosDisponibles(ventaId,  tiendaId);
    }

    @Post(':ventaId/agregar-producto')
    @ApiOperation({ summary: 'Agregar producto a la venta (normal o granel)' })
    @ApiParam({ name: 'ventaId', description: 'ID de la venta activa' })
    @ApiBody({ type: AgregarProductoVentaDto })
    @ApiResponse({ status: 201, description: 'Producto agregado exitosamente' })
    async agregarProducto(
        @Param('ventaId') ventaId: string,
        @Body() data: AgregarProductoVentaDto,
        @Req() req?: any
    ) {
        const tiendaId = this.obtenerTiendaId(req);
        return this.ventasService.agregarProductoInteligente(ventaId, data, tiendaId);
    }

    @Get(':ventaId/ver')
    @ApiOperation({ summary: 'Ver venta actual con todos los productos' })
    @ApiParam({ name: 'ventaId', description: 'ID de la venta' })
    async verVentaActual(
        @Param('ventaId') ventaId: string,
        @Req() req?: any
    ) {
        const tiendaId = this.obtenerTiendaId(req);
        return this.ventasService.verVentaActual(ventaId, tiendaId);
    }

    @Put(':ventaId/aumentar-producto/:productoId')
    @ApiOperation({ summary: 'Aumentar cantidad de producto en la venta' })
    @ApiParam({ name: 'ventaId', description: 'ID de la venta' })
    @ApiParam({ name: 'productoId', description: 'ID del producto' })
    @ApiBody({ type: AumentarCantidadProductoDto })
    async aumentarCantidad(
        @Param('ventaId') ventaId: string,
        @Param('productoId') productoId: string,
        @Body() datos: AumentarCantidadProductoDto,
        @Req() req?: any
    ) {
        const tiendaId = this.obtenerTiendaId(req);
        return this.ventasService.aumentarCantidadProducto(ventaId, productoId, datos.cantidadAdicional, tiendaId);
    }

    @Put(':ventaId/finalizar')
    @ApiOperation({ summary: 'Finalizar venta y procesar pago' })
    @ApiParam({ name: 'ventaId', description: 'ID de la venta' })
    @ApiBody({ type: FinalizarVentaDto })
    async finalizarVenta(
        @Param('ventaId') ventaId: string,
        @Body() datos: FinalizarVentaDto,
        @Req() req?: any
    ) {
        const tiendaId = this.obtenerTiendaId(req);
        return this.ventasService.procesarPago(ventaId, datos, tiendaId);
    }

    @Delete(':ventaId/cancelar')
@ApiOperation({ summary: 'Cancelar venta' })
@ApiParam({ name: 'ventaId', description: 'ID de la venta' })
async cancelarVenta(
    @Param('ventaId') ventaId: string,
    @Req() req?: any
) {
    const tiendaId = this.obtenerTiendaId(req);
    return this.ventasService.cancelarVenta(ventaId, tiendaId);
}
}