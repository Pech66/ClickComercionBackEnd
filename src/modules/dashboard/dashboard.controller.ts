import {
  Controller,
  Get,
  Req,
  UseGuards,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TiendaService } from '../tienda/tienda.service';
import { ResumenTiendaDto } from './dto/ResumenDto';
import { PerfilService } from '../perfil/perfil.service';

@ApiTags('Dashboard')
@Controller('dashboard')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'))
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly usuarioService: PerfilService,
  ) { }

  @Get('resumen')
  async resumenTienda(@Req() req): Promise<ResumenTiendaDto> {
    const usuarioToken = req.user;

    // Validar rol
    if (usuarioToken.rol !== 'ADMIN_TIENDA') {
      throw new ForbiddenException('Solo el AdminTienda puede consultar el resumen de su tienda.');
    }

    // Buscar el usuario real en la base de datos
    const usuario = await this.usuarioService.buscarPorId(usuarioToken.id); 
    if (!usuario) {
      throw new ForbiddenException('Usuario no encontrado.');
    }

    if (!usuario.Id_tienda) {
      throw new ForbiddenException('No tienes una tienda registrada.');
    }

    // Validar que la tienda existe
/*x   // const tienda = await this.tiendaService.buscarPorId(usuario.Id_tienda);
    if (!tienda) {
      throw new NotFoundException('La tienda asociada no existe.');
    }
*/
    // Obtener el resumen
    return this.dashboardService.resumenTienda(usuario.Id_tienda);
  }


  @Get('ventas')
  async datosVentas(@Req() req) {
    const usuario = req.user;
    if (usuario.rol !== 'ADMIN_TIENDA') {
      throw new ForbiddenException('Solo el AdminTienda puede consultar ventas.');
    }
    return this.dashboardService.datosVentas(usuario.Id_tienda);
  }

  @Get('compras')
  async datosCompras(@Req() req) {
    const usuario = req.user;
    if (usuario.rol !== 'ADMIN_TIENDA') {
      throw new ForbiddenException('Solo el AdminTienda puede consultar compras.');
    }
    return this.dashboardService.datosCompras(usuario.Id_tienda);
  }

  @Get('alertas')
  async alertasStock(@Req() req) {
    const usuario = req.user;
    if (usuario.rol !== 'ADMIN_TIENDA') {
      throw new ForbiddenException('Solo el AdminTienda puede consultar alertas.');
    }
    return this.dashboardService.productosStockBajo(usuario.Id_tienda);
  }

  @Get('grafica/ventas-mes')
  async graficaVentasMes(@Req() req) {
    const usuario = req.user;
    if (usuario.rol !== 'ADMIN_TIENDA') {
      throw new ForbiddenException('Solo el AdminTienda puede consultar gráficas.');
    }
    return this.dashboardService.graficaVentasPorMes(usuario.Id_tienda);
  }

  @Get('grafica/compras-mes')
  async graficaComprasMes(@Req() req) {
    const usuario = req.user;
    if (usuario.rol !== 'ADMIN_TIENDA') {
      throw new ForbiddenException('Solo el AdminTienda puede consultar gráficas.');
    }
    return this.dashboardService.graficaComprasPorMes(usuario.Id_tienda);
  }

  @Get('grafica/stock-categoria')
  async graficaStockCategoria(@Req() req) {
    const usuario = req.user;
    if (usuario.rol !== 'ADMIN_TIENDA') {
      throw new ForbiddenException('Solo el AdminTienda puede consultar gráficas.');
    }
    return this.dashboardService.graficaStockPorCategoria(usuario.Id_tienda);
  }

  @Get('grafica/ingresos-egresos')
  async graficaIngresosEgresos(@Req() req) {
    const usuario = req.user;
    if (usuario.rol !== 'ADMIN_TIENDA') {
      throw new ForbiddenException('Solo el AdminTienda puede consultar gráficas.');
    }
    return this.dashboardService.graficaIngresosVsEgresos(usuario.Id_tienda);
  }
}