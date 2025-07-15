import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  ForbiddenException,
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
  constructor(private readonly almacenService: AlmacenService) {}

  @Post('crear')
  async crearAlmacen(@Body() dto: DtoCrearAlmacen, @Req() req) {
    const usuario = req.user;
    // Solo AdminTienda puede crear almacén y solo para su tienda
    if (usuario.rol !== 'AdminTienda') {
      throw new ForbiddenException('Solo el AdminTienda puede crear almacenes.');
    }
    if (usuario.Id_tienda !== dto.Id_tienda) {
      throw new ForbiddenException('No tienes permisos para crear el almacén en otra tienda.');
    }
    return this.almacenService.crearAlmacen(dto.nombre, dto.Id_tienda, usuario.Id);
  }
}