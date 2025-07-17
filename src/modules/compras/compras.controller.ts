import { ComprasService } from './compras.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { DtoProductoCompra } from './dto/dto.compra';
import { DtoEditarProductoCompra } from './dto/editar/dto.editarcompra';
import { PrismaService } from 'src/prisma/prisma.service';
import { DtoEditarProductoCompraUnitario } from './dto/editar/dto.editarproductocompraUni';
import { Rol } from 'src/components/roles/roles.enum';
import { Roles } from 'src/components/roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/components/roles/roles.guard';
import { UsuarioActual } from 'src/components/decoradores/usuario.actual';
import { DtoAgregarProductosCompra } from './dto/dto.agregarproducto';

@ApiTags('Compras')
@Controller('compras')
@ApiBearerAuth('access-token')
@Roles(Rol.ADMIN_TIENDA)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ComprasController {
    constructor(
        private readonly comprasService: ComprasService,
        private readonly prisma: PrismaService,
    ) { }

    private async obtenerIdTienda(usuarioId: string): Promise<string> {
        const user = await this.prisma.usuarios.findUnique({
            where: { Id: usuarioId },
            select: { Id_tienda: true }
        });

        if (!user?.Id_tienda) {
            throw new BadRequestException('Debes crear tu tienda primero.');
        }

        return user.Id_tienda;
    }

    @Post('registrar')
    @ApiOperation({ summary: 'Registrar una compra (puede ser sin proveedor)' })
    @ApiResponse({ status: 201, description: 'Compra registrada exitosamente' })
    @ApiResponse({ status: 400, description: 'Error de validación' })
    async registrarCompra(
        @Body() dto: DtoProductoCompra,
        @UsuarioActual() usuario,
    ) {
        const Id_tienda = await this.obtenerIdTienda(usuario.id);
        return this.comprasService.registrarCompra(dto, Id_tienda);
    }

    @Get('todos')
    @ApiOperation({ summary: 'Obtener todas las compras' })
    @ApiResponse({ status: 200, description: 'Lista de todas las compras' })
    async obtenerTodasLasCompras(@UsuarioActual() usuario) {
        const Id_tienda = await this.obtenerIdTienda(usuario.id);
        return this.comprasService.obtenerTodasLasCompras(Id_tienda);
    }



    @Put('editar/:id')
    @ApiOperation({ summary: 'Editar una compra existente' })
    @ApiResponse({ status: 200, description: 'Compra actualizada exitosamente' })
    @ApiResponse({ status: 404, description: 'Compra no encontrada' })
    async editarCompra(
        @Param('id') id: string,
        @Body() dto: DtoEditarProductoCompra,
        @UsuarioActual() usuario,
    ) {
        const Id_tienda = await this.obtenerIdTienda(usuario.id);
        return this.comprasService.editarCompraTicket(id, dto, Id_tienda);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener una compra por ID' })
    @ApiParam({ name: 'id', description: 'ID de la compra' })
    @ApiResponse({ status: 200, description: 'Compra encontrada' })
    @ApiResponse({ status: 404, description: 'Compra no encontrada' })
    async obtenerCompraPorId(
        @Param('id') id: string,
        @UsuarioActual() usuario,
    ) {
        const Id_tienda = await this.obtenerIdTienda(usuario.id);
        return this.comprasService.obtenerCompraPorId(id, Id_tienda);
    }

    @Get('mes/:ano/:mes')
    @ApiOperation({ summary: 'Obtener compras por año y mes' })
    @ApiParam({ name: 'ano', description: 'Año' })
    @ApiParam({ name: 'mes', description: 'Mes' })
    @ApiResponse({ status: 200, description: 'Lista de compras del mes y año indicados' })
    async obtenerComprasPorMes(
        @Param('ano') ano: string,
        @Param('mes') mes: string,
        @UsuarioActual() usuario,
    ) {
        const Id_tienda = await this.obtenerIdTienda(usuario.id);
        return this.comprasService.obtenerComprasPorMes(Number(ano), Number(mes), Id_tienda);
    }

    @Post(':id/productos')
    @ApiBody({ type: DtoAgregarProductosCompra })
    @ApiOperation({ summary: 'Agregar productos a una compra existente' })
    @ApiParam({ name: 'id', description: 'ID de la compra' })
    @ApiResponse({ status: 201, description: 'Productos agregados correctamente' })
    async agregarProductosACompra(
        @Param('id') id: string,
        @Body() dto: DtoAgregarProductosCompra,
        @UsuarioActual() usuario,
    ) {
        const Id_tienda = await this.obtenerIdTienda(usuario.id);
        return this.comprasService.agregarProductosACompra(id, dto, Id_tienda);
    }


    @Put(':id/productos/:productoCompraId')
    @ApiOperation({ summary: 'Editar un producto de una compra' })
    @ApiParam({ name: 'id', description: 'ID de la compra' })
    @ApiParam({ name: 'productoCompraId', description: 'ID del producto en la compra' })
    @ApiResponse({ status: 200, description: 'Producto de compra actualizado' })
    async editarProductoDeCompra(
        @Param('id') id: string,
        @Param('productoCompraId') productoCompraId: string,
        @Body() dto: DtoEditarProductoCompraUnitario,
        @UsuarioActual() usuario,
    ) {
        const Id_tienda = await this.obtenerIdTienda(usuario.id);
        return this.comprasService.editarProductoDeCompra(id, productoCompraId, dto, Id_tienda);
    }

}