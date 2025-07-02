import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/components/roles/roles.decorator';
import { Rol } from 'src/components/roles/roles.enum';
import { StockService } from './stock.service';

@Controller('stock')
@ApiBearerAuth('access-token')
@Roles(Rol.ADMIN_TIENDA)
export class StockController {
    constructor(private readonly inventarioService: StockService) {}
    
    @Get('total-productos')
    @ApiOperation({ summary: 'Obtener cantidad total de productos en mi tienda' })
    async obtenerTotalProductos(@Req() req: Request & { user: any }) {
        console.log('DEBUG - req.user:', req.user);
        console.log('DEBUG - req.user.Id_tienda:', req.user?.Id_tienda);
        if (!req.user || !req.user.Id_tienda) {
            throw new Error('Usuario no autenticado o sin tienda asignada');
        }
        return this.inventarioService.obtenerCantidadTotalProductos(req.user.Id_tienda);
    }

    @Get('stock-por-producto')
    
    @ApiOperation({ summary: 'Obtener stock por cada producto' })
    async obtenerStockPorProducto(@Req() req: Request & { user: any }) {
        console.log('DEBUG - req.user:', req.user);
        if (!req.user || !req.user.Id_tienda) {
            throw new Error('Usuario no autenticado o sin tienda asignada');
        }
        return this.inventarioService.obtenerStockPorProducto(req.user.Id_tienda);
    }

    @Get('stock-total')
    @ApiOperation({ summary: 'Obtener stock total de la tienda' })
    async obtenerStockTotal(@Req() req: Request & { user: any }) {
         console.log('DEBUG - req.user:', req.user);
        if (!req.user || !req.user.Id_tienda) {
            throw new Error('Usuario no autenticado o sin tienda asignada');
        }
        return this.inventarioService.obtenerStockTotal(req.user.Id_tienda);
    }

}
