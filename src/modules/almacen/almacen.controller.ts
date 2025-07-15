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

@ApiTags('Almacen')
@Controller('almacen')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'))
export class AlmacenController {
  constructor(private readonly almacenService: AlmacenService) { }

  @Post('crear')
async crearAlmacen(@Body() dto: DtoCrearAlmacen, @Req() req) {
  const usuario = req.user;
  if (usuario.rol !== 'ADMIN_TIENDA') {
    throw new ForbiddenException('Solo el AdminTienda puede crear almacenes.');
  }
  // Asegúrate de usar el campo correcto
  return this.almacenService.crearAlmacen(dto.nombre, usuario.id);
}

@Get('obtener')
async obtenerNombreAlmacen(@Req() req) {
  const usuario = req.user;
  if (usuario.rol !== 'ADMIN_TIENDA') {
    throw new ForbiddenException('Solo el AdminTienda puede consultar el almacén.');
  }
  return await this.almacenService.obtenerNombreAlmacen(usuario.id);
}

@Delete('eliminar')
async eliminarAlmacen(@Req() req) {
  const usuario = req.user;
  if (usuario.rol !== 'ADMIN_TIENDA') {
    throw new ForbiddenException('Solo el AdminTienda puede eliminar su almacén.');
  }
  const eliminado = await this.almacenService.eliminarAlmacen(usuario.id);
  if (!eliminado) {
    throw new NotFoundException('No existe un almacén asociado a tu tienda.');
  }
  return { mensaje: 'Almacén eliminado correctamente.' };
}


}