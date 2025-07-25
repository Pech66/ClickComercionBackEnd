import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  ForbiddenException,
  Get,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { AlmacenService } from './almacen.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DtoCrearAlmacen } from './dtos/dtos.crearalmacen';
import { PerfilService } from '../perfil/perfil.service';
import { RolesGuard } from 'src/components/roles/roles.guard';
import { Roles } from 'src/components/roles/roles.decorator';
import { Rol } from 'src/components/roles/roles.enum';

@ApiTags('Almacen')
@Controller('almacen')
@ApiBearerAuth('access-token')
@Roles(Rol.ADMIN_TIENDA)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AlmacenController {
  constructor(
    private readonly almacenService: AlmacenService,
    private readonly usuarioService: PerfilService
  ) { }

  @Post('crear')
  async crearAlmacen(@Body() dto: DtoCrearAlmacen, @Req() req) {
    const user = req.user;
    // Busca al usuario real EN BASE DE DATOS y saca su Id_tienda
    const usuario = await this.usuarioService.buscarPorId(user.Id || user.id);
    if (!usuario || !usuario.Id_tienda) {
      throw new ForbiddenException('No tienes una tienda asociada.');
    }
    if (usuario.rol !== 'ADMIN_TIENDA') {
      throw new ForbiddenException('Solo el AdminTienda puede crear almacén.');
    }
    // Llama al servicio
    return this.almacenService.crearAlmacen(dto.nombre, usuario.Id); // <-- PASA el id de usuario realmente
  }

  @Get('obtener')
  async obtenerNombreAlmacen(@Req() req) {
    const user = req.user;
    const usuario = await this.usuarioService.buscarPorId(user.Id || user.id);
    if (!usuario || !usuario.Id_tienda) {
      throw new ForbiddenException('No tienes una tienda asociada.');
    }
    if (usuario.rol !== 'ADMIN_TIENDA') {
      throw new ForbiddenException('Solo el AdminTienda puede consultar el almacén.');
    }
    return await this.almacenService.obtenerNombreAlmacen(usuario.Id_tienda);
  }

  @Delete('eliminar')
  async eliminarAlmacen(@Req() req) {
    const user = req.user;
    const usuario = await this.usuarioService.buscarPorId(user.Id || user.id);
    if (!usuario || !usuario.Id_tienda) {
      throw new ForbiddenException('No tienes una tienda asociada.');
    }
    if (usuario.rol !== 'ADMIN_TIENDA') {
      throw new ForbiddenException('Solo el AdminTienda puede eliminar su almacén.');
    }
    const eliminado = await this.almacenService.eliminarAlmacen(usuario.Id_tienda);
    if (!eliminado) {
      throw new NotFoundException('No existe un almacén asociado a tu tienda.');
    }
    return { mensaje: 'Almacén eliminado correctamente.' };
  }
}