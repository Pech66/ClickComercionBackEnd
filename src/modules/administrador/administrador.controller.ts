import { Controller, Get, Param, Post, Delete, NotFoundException } from '@nestjs/common';

import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AdministradorService } from './administrador.service';



@ApiTags('superadmin')
@Controller('superadmin/usuarios-admin')
export class AdministradorController {
  constructor(private readonly administradorService: AdministradorService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los usuarios admin' })
  findAll() {
    return this.administradorService.findAllAdmins();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario admin por ID' })
  findOne(@Param('id') id: string) {
    return this.administradorService.findAdminById(id);
  }

  @Post(':id/activar')
  @ApiOperation({ summary: 'Activar usuario admin' })
  activar(@Param('id') id: string) {
    return this.administradorService.activarAdmin(id);
  }

  @Post(':id/desactivar')
  @ApiOperation({ summary: 'Desactivar usuario admin' })
  desactivar(@Param('id') id: string) {
    return this.administradorService.desactivarAdmin(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar usuario admin' })
  eliminar(@Param('id') id: string) {
    return this.administradorService.eliminarAdmin(id);
  }

  @Get(':id/tienda')
  @ApiOperation({ summary: 'Obtener la tienda del usuario admin' })
  obtenerTienda(@Param('id') id: string) {
    return this.administradorService.obtenerTiendaDeAdmin(id);
  }
}