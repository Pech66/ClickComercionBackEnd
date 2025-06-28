import { BadRequestException, Body, ConflictException, Controller, ForbiddenException, Get, NotFoundException, Param, Post, Put, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DtoCrearTienda } from './dtos/dto.creartienda';
import { JwtAuthGuard } from 'src/components/Jwt/jwtAuthGuard';
import { Rol } from 'src/components/roles/roles.enum';
import { Roles } from 'src/components/roles/roles.decorator';
import { TiendaService } from './tienda.service';
import { AuthService } from 'src/auth/auth.service';
import { UsuarioActual } from 'src/components/decoradores/usuario.actual';
import { DtoEditarTienda } from './dtos/dto.editartienda';
import { PrismaService } from 'src/prisma/prisma.service';
import { DtoEliminarTienda } from './dtos/dto.eliminartienda';
import { RolesGuard } from 'src/components/roles/roles.guard';

@Controller('Tienda')
@ApiBearerAuth('access-token')
@Roles(Rol.ADMIN_TIENDA)
@UseGuards(JwtAuthGuard, RolesGuard)
export class TiendaController {
  constructor(
    private readonly tiendaService: TiendaService,
    private readonly authService: AuthService,
    private prisma: PrismaService,
  
  ){

    }

    @Post('CrearTienda')
    @ApiOperation({ summary: 'Crear una nueva tienda y vincular al usuario actual' })
    async crearTienda(
      @Body() dtoCrearTienda: DtoCrearTienda,
      @UsuarioActual() usuario,
    ) {
      try {
        //Crear la tienda
        const tiendaCreada = await this.tiendaService.registrarTienda(dtoCrearTienda);

        //Vincular el usuario con la tienda 
        await this.authService.vincularUsuarioConTienda(usuario.id, tiendaCreada.Id);

        //Responder con la tienda creada
        return {mensaje: 'Tienda creada y vinculada correctamente', tiendaCreada};
      } catch (error) {
        throw new BadRequestException(error.message || 'Error al crear la tienda');
      }
    }

    @Get('mi-tienda')
    @ApiOperation({ summary: 'Obtener la tienda del usuario autenticado' })
    @UseGuards(JwtAuthGuard)
    async obtenerMiTienda(@UsuarioActual() usuario) {
      try {
        console.log('Usuario del JWT:', usuario);

        const tienda = await this.tiendaService.obtenerMiTienda(usuario.id);

        return {
          mensaje: 'Tienda obtenida correctamente',
          tienda
        };
      } catch (error) {
        console.error('Error al obtener tienda:', error.message);

        if (error.message.includes('no tiene tienda asignada')) {
          throw new NotFoundException('No tienes una tienda asignada');
        }

        throw new BadRequestException(error.message || 'Error al obtener tu tienda');
      }
    }

    @Get('ObtenerTienda/:Id')
    @ApiOperation({ summary: 'Obtener una tienda por su ID' })
    async obtenerTiendaPorId(@Param('Id') Id: string) {
      try {
        const tienda = await this.tiendaService.obtenerTiendaPorId(Id);
        if (!tienda) {
          throw new NotFoundException('Tienda no encontrada');
        }
        return tienda;
      } catch (error) {
        throw new BadRequestException(error.message || 'Error al obtener la tienda');
      }
    }

    @Put('editar-mi-tienda')
    @ApiOperation({ summary: 'Editar mi tienda ' })
    @UseGuards(JwtAuthGuard)
    async editarTienda(
      @Body() dtoEditarTienda: DtoEditarTienda,
      @UsuarioActual() usuario,
    ) {
      try {
        
      
        // Verificar rol
        if (usuario.rol !== Rol.ADMIN_TIENDA) {
          throw new ForbiddenException('No tienes permisos para editar tiendas');
        }
      
        // Verificar tienda asignada
        if (!usuario.tiendaId) {
          throw new BadRequestException('No tienes una tienda asignada');
        }
      
        // Editar la tienda
        const tiendaEditada = await this.tiendaService.editarMiTienda(
          usuario.tiendaId, 
          dtoEditarTienda,
        );
      
        return { 
          mensaje: 'Tienda editada correctamente', 
          tienda: tiendaEditada 
        };
      } catch (error) {
        console.error('Error en editar tienda:', error); // Para debug

        if (error instanceof ForbiddenException || error instanceof BadRequestException) {
          throw error;
        }
        throw new BadRequestException(error.message || 'Error al editar la tienda');
      }
    }


    @UseGuards(JwtAuthGuard)
    @Post('eliminarMiTienda')
    @ApiOperation({ summary: 'Eliminar la tienda del usuario autenticado' })
    async eliminarMiTienda(
      @Body() dtoEliminarTienda: DtoEliminarTienda,
      @UsuarioActual() usuario,
    ) {
      try {
        // Verificar que el usuario tenga rol ADMIN_TIENDA
        if (usuario.rol !== Rol.ADMIN_TIENDA) {
          throw new ForbiddenException('Solo los administradores de tienda pueden eliminar su tienda');
        }
      
        // Verificar que el usuario tenga una tienda asignada
        if (!usuario.tiendaId) {
          throw new BadRequestException('No tienes una tienda asignada para eliminar');
        }
      
        // Obtener los datos completos del usuario para verificar la contraseña
        const usuarioCompleto = await this.prisma.usuarios.findUnique({
          where: { Id: usuario.id },
          select: { contrasena: true }
        });
      
        if (!usuarioCompleto) {
          throw new BadRequestException('Usuario no encontrado');
        }
      
        // Verificar la contraseña 
        const bcrypt = require('bcrypt');
        const contrasenaValida = await bcrypt.compare(
          dtoEliminarTienda.contrasena, 
          usuarioCompleto.contrasena
        );
      
        if (!contrasenaValida) {
          throw new UnauthorizedException('Contraseña incorrecta');
        }
      
        // Eliminar la tienda
        const resultado = await this.tiendaService.eliminarMiTienda(usuario.id, usuario.tiendaId);
      
        return {
          mensaje: 'Tu tienda ha sido eliminada correctamente',
          advertencia: 'Esta acción no se puede deshacer'
        };
      } catch (error) {
        if (error instanceof ForbiddenException || 
            error instanceof BadRequestException || 
            error instanceof UnauthorizedException) {
          throw error;
        }
        throw new BadRequestException(error.message || 'Error al eliminar la tienda');
      }
    }



    @Get('todasLasTiendas')
    @ApiOperation({ summary: 'Obtener todas las tiendas (Solo SuperAdmin)' })
    @UseGuards(JwtAuthGuard)
    async obtenerTodasLasTiendas(@UsuarioActual() usuario) {
      try {
        // Verificar que el usuario sea SuperAdmin
        if (usuario.rol !== Rol.SUPERADMIN) {
          throw new ForbiddenException('Solo los SuperAdmin pueden ver todas las tiendas');
        }
      
        const tiendas = await this.tiendaService.obtenerTodasLasTiendas();
        
        return {
          mensaje: 'Tiendas obtenidas correctamente',
          total: tiendas.length,
          tiendas
        };
      } catch (error) {
        if (error instanceof ForbiddenException) {
          throw error;
        }
        throw new BadRequestException(error.message || 'Error al obtener las tiendas');
      }
    }



}
