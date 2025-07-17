import { Controller, Get, Param, Query, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/components/roles/roles.decorator';
import { Rol } from 'src/components/roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/components/roles/roles.guard';
import { DetallesVentasService } from './detalles_ventas.service';

@ApiTags('HistorialVentas')
@Controller('ventas-historial')
@ApiBearerAuth('access-token')
@Roles(Rol.ADMIN_TIENDA)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class DetallesVentasController {
    constructor(private readonly detallesVentasService: DetallesVentasService) {}

    private obtenerTiendaId(req: any): string {
        const tiendaId = req.user?.tiendaId || req.user?.Id_tienda;
        if (!tiendaId) throw new BadRequestException('Usuario no tiene tienda asignada');
        return tiendaId;
    }

    @Get()
    @ApiOperation({ summary: 'Obtener historial de ventas paginado' })
    @ApiResponse({ status: 200, description: 'Lista de ventas finalizadas' })
    async obtenerHistorialVentas(
        @Req() req: any,
        @Query('page') page = 1,
        @Query('limit') limit = 10,
    ) {
        const tiendaId = this.obtenerTiendaId(req);
        return this.detallesVentasService.obtenerHistorialVentas(tiendaId, Number(page), Number(limit));
    }

    @Get(':ventaId')
    @ApiOperation({ summary: 'Obtener detalles de una venta por ID' })
    @ApiResponse({ status: 200, description: 'Detalle de venta' })
    async obtenerDetalleVenta(
        @Param('ventaId') ventaId: string,
        @Req() req: any,
    ) {
        const tiendaId = this.obtenerTiendaId(req);
        return this.detallesVentasService.obtenerDetalleVenta(ventaId, tiendaId);
    }
}
