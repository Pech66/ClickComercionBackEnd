import { BadRequestException, Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/Jwt/jwtAuthGuard';
import { DtoCrearAlmacen } from './dtos/dtos.crearalmacen';
import { AlmacenService } from './almacen.service';

import { UsuarioActual } from 'src/components/decoradores/usuario.actual';

import { AuthService } from 'src/auth/auth.service';
import { DtoEditarAlmacen } from './dtos/dto.editaralmacen';

@Controller('almacen')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class AlmacenController {
    constructor(
        private readonly almacenService: AlmacenService,
        private authService: AuthService
      ){}


    @Post('crear-almacen')
    async crearAlmacen(
      @Body() dto: DtoCrearAlmacen,
      @UsuarioActual() usuario,
    ) {
      // Busca el usuario en la BD
      const user = await this.authService.obtenerUsuarioPorId(usuario.id); 
    
      if (!user?.Id_tienda) {
        throw new BadRequestException('Debe crear una tienda primero');
      }
    
      // Aquí sí es seguro usar el tiendaId, porque viene de la BD
      return this.almacenService.crearAlmacen(dto.nombre, user.Id_tienda);
    }

    @Get('obtenerMialmacen')
    async obtenerMiAlmacen(
      @UsuarioActual() usuario,
    ) {
      // Busca el usuario en la BD
      const user = await this.authService.obtenerUsuarioPorId(usuario.id);

      if (!user?.Id_tienda) {
        throw new BadRequestException('Debes crear una tienda primero');
      }

      return this.almacenService.obtenerMiAlmacen(user.Id_tienda);
    }


    @Put('editar-almacen/:id')
    @ApiOperation({ summary: 'Editar un almacén propio' })
    async editarAlmacen(
      @UsuarioActual() usuario,
      @Body() dtoEditarAlmcen: DtoEditarAlmacen,
      @Param('id') idAlmacen: string,
    ) {
      const user = await this.authService.obtenerUsuarioPorId(usuario.id);
    
      if (!user?.Id_tienda) {
        throw new BadRequestException('Debes crear una tienda primero');
      }
    
      return this.almacenService.editarMiAlmacen(dtoEditarAlmcen.nombre, idAlmacen, user.Id_tienda);
    }

    


    


    
}
