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

  // Resumen de la tienda del usuario autenticado (aislamiento total)
  @Get('resumen')
  async resumenTienda(@Req() req): Promise<ResumenTiendaDto> {
    const usuarioToken = req.user;
    if (usuarioToken.rol !== 'ADMIN_TIENDA') {
      throw new ForbiddenException('Solo el AdminTienda puede consultar el resumen de su tienda.');
    }
    const usuario = await this.usuarioService.buscarPorId(usuarioToken.Id || usuarioToken.id);
    if (!usuario) throw new NotFoundException('Usuario no encontrado.');
    if (!usuario.Id_tienda) throw new ForbiddenException('No tienes una tienda registrada.');
    return this.dashboardService.resumenTienda(usuario.Id_tienda);
  }

  // Ventas de la tienda del usuario autenticado
  @Get('ventas')
  async datosVentas(@Req() req) {
    const usuarioToken = req.user;
    if (usuarioToken.rol !== 'ADMIN_TIENDA') {
      throw new ForbiddenException('Solo el AdminTienda puede consultar ventas.');
    }
    const usuario = await this.usuarioService.buscarPorId(usuarioToken.Id || usuarioToken.id);
    if (!usuario || !usuario.Id_tienda) {
      throw new ForbiddenException('No tienes una tienda registrada.');
    }
    return this.dashboardService.datosVentas(usuario.Id_tienda);
  }

  // Compras de la tienda del usuario autenticado
  @Get('compras')
  async datosCompras(@Req() req) {
    const usuarioToken = req.user;
    if (usuarioToken.rol !== 'ADMIN_TIENDA') {
      throw new ForbiddenException('Solo el AdminTienda puede consultar compras.');
    }
    const usuario = await this.usuarioService.buscarPorId(usuarioToken.Id || usuarioToken.id);
    if (!usuario || !usuario.Id_tienda) {
      throw new ForbiddenException('No tienes una tienda registrada.');
    }
    return this.dashboardService.datosCompras(usuario.Id_tienda);
  }

  // Alertas de stock de la tienda del usuario autenticado
  @Get('alertas')
  async alertasStock(@Req() req) {
    const usuarioToken = req.user;
    if (usuarioToken.rol !== 'ADMIN_TIENDA') {
      throw new ForbiddenException('Solo el AdminTienda puede consultar alertas.');
    }
    const usuario = await this.usuarioService.buscarPorId(usuarioToken.Id || usuarioToken.id);
    if (!usuario || !usuario.Id_tienda) {
      throw new ForbiddenException('No tienes una tienda registrada.');
    }
    return this.dashboardService.productosStockBajo(usuario.Id_tienda);
  }

  // Gráfica de ventas por mes (solo tienda del usuario autenticado)
  @Get('grafica/ventas-mes')
  async graficaVentasMes(@Req() req) {
    const usuarioToken = req.user;
    if (usuarioToken.rol !== 'ADMIN_TIENDA') {
      throw new ForbiddenException('Solo el AdminTienda puede consultar gráficas.');
    }
    const usuario = await this.usuarioService.buscarPorId(usuarioToken.Id || usuarioToken.id);
    if (!usuario || !usuario.Id_tienda) {
      throw new ForbiddenException('No tienes una tienda registrada.');
    }
    return this.dashboardService.graficaVentasPorMes(usuario.Id_tienda);
  }

  // Gráfica de compras por mes (solo tienda del usuario autenticado)
  @Get('grafica/compras-mes')
  async graficaComprasMes(@Req() req) {
    const usuarioToken = req.user;
    if (usuarioToken.rol !== 'ADMIN_TIENDA') {
      throw new ForbiddenException('Solo el AdminTienda puede consultar gráficas.');
    }
    const usuario = await this.usuarioService.buscarPorId(usuarioToken.Id || usuarioToken.id);
    if (!usuario || !usuario.Id_tienda) {
      throw new ForbiddenException('No tienes una tienda registrada.');
    }
    return this.dashboardService.graficaComprasPorMes(usuario.Id_tienda);
  }

  // Gráfica de stock por categoría (solo tienda del usuario autenticado)
  @Get('grafica/stock-categoria')
  async graficaStockCategoria(@Req() req) {
    const usuarioToken = req.user;
    if (usuarioToken.rol !== 'ADMIN_TIENDA') {
      throw new ForbiddenException('Solo el AdminTienda puede consultar gráficas.');
    }
    const usuario = await this.usuarioService.buscarPorId(usuarioToken.Id || usuarioToken.id);
    if (!usuario || !usuario.Id_tienda) {
      throw new ForbiddenException('No tienes una tienda registrada.');
    }
    return this.dashboardService.graficaStockPorCategoria(usuario.Id_tienda);
  }

  // Gráfica de ingresos vs egresos (solo tienda del usuario autenticado)
  @Get('grafica/ingresos-egresos')
  async graficaIngresosEgresos(@Req() req) {
    const usuarioToken = req.user;
    if (usuarioToken.rol !== 'ADMIN_TIENDA') {
      throw new ForbiddenException('Solo el AdminTienda puede consultar gráficas.');
    }
    const usuario = await this.usuarioService.buscarPorId(usuarioToken.Id || usuarioToken.id);
    if (!usuario || !usuario.Id_tienda) {
      throw new ForbiddenException('No tienes una tienda registrada.');
    }
    return this.dashboardService.graficaIngresosVsEgresos(usuario.Id_tienda);
  }
}