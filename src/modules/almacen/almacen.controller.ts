import { BadRequestException, Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/components/Jwt/jwtAuthGuard';
import { DtoCrearAlmacen } from './dtos/dtos.crearalmacen';
import { AlmacenService } from './almacen.service';
import { UsuarioActual } from 'src/components/decoradores/usuario.actual';
import { DtoEditarAlmacen } from './dtos/dto.editaralmacen';
import { RolesGuard } from 'src/components/roles/roles.guard';
import { Roles } from 'src/components/roles/roles.decorator';
import { Rol } from 'src/components/roles/roles.enum';
import { PerfilService } from '../perfil/perfil.service';

@Controller('almacen')
@ApiBearerAuth('access-token')
@Roles(Rol.ADMIN_TIENDA)
@UseGuards(JwtAuthGuard, RolesGuard)
export class AlmacenController {
    constructor(
        private readonly almacenService: AlmacenService,
        private perfilService: PerfilService
      ){}


    @Post('crear-almacen')
    @ApiOperation({ summary: 'Crear un almacén propio' })
    async crearAlmacen(
      @Body() dto: DtoCrearAlmacen,
      @UsuarioActual() usuario,
    ) {
      // Busca el usuario en la BD
      const user = await this.perfilService.obtenerUsuarioPorId(usuario.id); 
    
      if (!user?.Id_tienda) {
        throw new BadRequestException('Debe crear una tienda primero');
      }
    
      // Aquí sí es seguro usar el tiendaId, porque viene de la BD
      return this.almacenService.crearAlmacen(dto.nombre, user.Id_tienda);
    }

    @Get('obtenerMialmacen')
    @ApiOperation({ summary: 'Obtener mi almacén' })
    async obtenerMiAlmacen(
      @UsuarioActual() usuario,
    ) {
      // Busca el usuario en la BD
      const user = await this.perfilService.obtenerUsuarioPorId(usuario.id);

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
      const user = await this.perfilService.obtenerUsuarioPorId(usuario.id);
    
      if (!user?.Id_tienda) {
        throw new BadRequestException('Debes crear una tienda primero');
      }
    
      return this.almacenService.editarMiAlmacen(dtoEditarAlmcen.nombre, idAlmacen, user.Id_tienda);
    }

    


    


    
}
