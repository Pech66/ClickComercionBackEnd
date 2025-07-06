import { BadRequestException, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/components/roles/roles.decorator';
import { Rol } from 'src/components/roles/roles.enum';
import { StockService } from './stock.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/components/roles/roles.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsuarioActual } from 'src/components/decoradores/usuario.actual';

@ApiTags('Stock')
@Controller('stock')
@ApiBearerAuth('access-token')
@Roles(Rol.ADMIN_TIENDA)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class StockController {
    constructor(private readonly stockService: StockService, private readonly prisma: PrismaService) { }

    private async obtenerIdTienda(usuarioId: string): Promise<string> {
        const user = await this.prisma.usuarios.findUnique({
            where: { Id: usuarioId },
            select: { Id_tienda: true }
        });

        if (!user?.Id_tienda) {
            throw new BadRequestException('Debes crear tu tienda primero para ver el inventario.');
        }

        return user.Id_tienda;
    }

    @Get('total-productos')
    @ApiOperation({ summary: 'Obtener cantidad total de productos en mi tienda' })
    @ApiResponse({
        status: 200,
        description: 'Cantidad total de productos en la tienda',
        schema: {
            type: 'object',
            properties: {
                total_productos: { type: 'number', example: 25 },
                mensaje: { type: 'string', example: 'Tienes 25 productos registrados en tu tienda' }
            }
        }
    })
    async obtenerTotalProductos(@UsuarioActual() usuario) {
        try {
            const Id_tienda = await this.obtenerIdTienda(usuario.id);
            return await this.stockService.obtenerCantidadTotalProductos(Id_tienda);
        } catch (error) {
            throw new BadRequestException(error.message || 'Error al obtener total de productos');
        }
    }

    @Get('por-producto')
    @ApiOperation({ summary: 'Obtener stock actual de cada producto en mi tienda' })
    @ApiResponse({
        status: 200,
        description: 'Stock detallado por producto',
        schema: {
            type: 'object',
            properties: {
                productos: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            Id: { type: 'string' },
                            nombre: { type: 'string' },
                            stock_actual: { type: 'number' },
                            estado: { type: 'string', enum: ['Disponible', 'Stock Bajo', 'Agotado'] }
                        }
                    }
                },
                resumen: {
                    type: 'object',
                    properties: {
                        total_productos: { type: 'number' },
                        con_stock: { type: 'number' },
                        sin_stock: { type: 'number' }
                    }
                }
            }
        }
    })
    async obtenerStockPorProducto(@UsuarioActual() usuario) {
        try {
            const Id_tienda = await this.obtenerIdTienda(usuario.id);
            return await this.stockService.obtenerStockPorProducto(Id_tienda);
        } catch (error) {
            throw new BadRequestException(error.message || 'Error al obtener stock por producto');
        }
    }

    @Get('resumen-total')
    @ApiOperation({ summary: 'Obtener resumen total del stock de mi tienda' })
    @ApiResponse({
        status: 200,
        description: 'Resumen completo del inventario',
        schema: {
            type: 'object',
            properties: {
                stock_total: { type: 'number', example: 150 },
                valor_total_inventario: { type: 'number', example: 25000.50 },
                productos_con_stock: { type: 'number', example: 20 },
                productos_sin_stock: { type: 'number', example: 5 },
                productos_stock_bajo: { type: 'number', example: 3 }
            }
        }
    })
    async obtenerResumenStock(@UsuarioActual() usuario) {
        try {
            const Id_tienda = await this.obtenerIdTienda(usuario.id);
            return await this.stockService.obtenerResumenCompleto(Id_tienda);
        } catch (error) {
            throw new BadRequestException(error.message || 'Error al obtener resumen de stock');
        }
    }

    @Get('productos-agotados')
    @ApiOperation({ summary: 'Obtener productos sin stock en mi tienda' })
    @ApiResponse({
        status: 200,
        description: 'Lista de productos agotados',
        schema: {
            type: 'object',
            properties: {
                productos_agotados: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            Id: { type: 'string' },
                            nombre: { type: 'string' },
                            descripcion: { type: 'string' },
                            categoria: { type: 'string' }
                        }
                    }
                },
                total_agotados: { type: 'number' }
            }
        }
    })
    async obtenerProductosAgotados(@UsuarioActual() usuario) {
        try {
            const Id_tienda = await this.obtenerIdTienda(usuario.id);
            return await this.stockService.obtenerProductosAgotados(Id_tienda);
        } catch (error) {
            throw new BadRequestException(error.message || 'Error al obtener productos agotados');
        }
    }

    @Get('stock-bajo')
    @ApiOperation({ summary: 'Obtener productos con stock bajo (menos de 10 unidades)' })
    async obtenerProductosStockBajo(@UsuarioActual() usuario) {
        try {
            const Id_tienda = await this.obtenerIdTienda(usuario.id);
            return await this.stockService.obtenerProductosStockBajo(Id_tienda);
        } catch (error) {
            throw new BadRequestException(error.message || 'Error al obtener productos con stock bajo');
        }
    }
}
