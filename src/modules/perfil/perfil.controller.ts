import { BadRequestException, Body, Controller, Delete, Get, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsuarioActual } from 'src/components/decoradores/usuario.actual';
import { JwtAuthGuard } from 'src/components/Jwt/jwtAuthGuard';
import { FileInterceptor } from '@nestjs/platform-express';
import { DtoEditarUsuario } from './dto/dto.editar.usuario';
import { ValidacionService } from 'src/components/validaciondatos/validacionService';
import { PerfilService } from './perfil.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Perfil')
@Controller('perfil')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'))
export class PerfilController {
    constructor(
        private readonly perfilService: PerfilService,
        private readonly validacionService: ValidacionService,
    ){}

    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    @Get('datos-usuario')
    @ApiOperation({ summary: 'Obtener datos del usuario autenticado' })
    async obtenerDatosUsuario(@UsuarioActual() usuario) {
        console.log('Usuario extraído del token:', usuario);
      const usuarioId = usuario.sub ?? usuario.id;
      return this.perfilService.obtenerDatosUsuario(usuarioId);
    }
  
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Obtener datos del usuario autenticado por ID' })
    @Put('actualizar-datos')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          nombre: { type: 'string'  },
          foto: {
            type: 'string',
            format: 'binary',
            description: 'Archivo de imagen del avatar',
          },
        }
      }          
    })
    @UseInterceptors(FileInterceptor('foto')) 
    async actualizarAdminTienda(
      @UsuarioActual() usuario,
      @Body() dtoEditarUsuario: DtoEditarUsuario,
      @UploadedFile() foto?: Express.Multer.File, 
    ) { 
      try {
        
        if(!dtoEditarUsuario.nombre && !foto){
          throw new BadRequestException('Debe proporcionar al menos un campo para actualizar (nombre o foto)');
        };

        if(foto){
          this.validacionService.validateImageFormatoTamaño(foto);
        };

        const usuarioId = usuario.sub || usuario.Id || usuario.id;

        const usuarioActualizado = await this.perfilService.editarUsuario(
          usuarioId,
          dtoEditarUsuario,
          foto
        );

        return usuarioActualizado
      } catch (error) {
        throw new BadRequestException(error.message || 'Error al actualizar los datos del usuario');
      }
    }
    
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    @Put('cambiar-contrasena')
    @ApiOperation({ summary: 'Cambiar contraseña del usuario autenticado' })
    @ApiBody({
      description: 'Datos para cambiar contraseña',
      schema: {
        type: 'object',
        properties: {
          contrasenaActual: { 
            type: 'string', 
            example: 'ContrasenaActual123@',
            description: 'Contraseña actual del usuario'
          },
          contrasenaNueva: { 
            type: 'string', 
            example: 'NuevaContrasena123@',
            description: 'Nueva contraseña (mínimo 8 caracteres)'
          }
        },
        required: ['contrasenaActual', 'contrasenaNueva']
      }
    })
    async cambiarContrasena(
      @UsuarioActual() usuario,
      @Body() body: { contrasenaActual: string; contrasenaNueva: string }
    ) {
      try {
        const usuarioId = usuario.sub || usuario.Id || usuario.id;
        return await this.perfilService.cambiarContrasena(
          usuarioId, 
          body.contrasenaActual, 
          body.contrasenaNueva
        );
      } catch (error) {
        throw new BadRequestException(error.message || 'Error al cambiar contraseña');
      }
    }


    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    @Delete('eliminarCuentAutenticado')
    @ApiOperation({ summary: 'Eliminar cuenta del usuario autenticado' })
    async eliminarCuentaAutenticado(@UsuarioActual() usuario) {
      try {
        const usuarioId = usuario.sub || usuario.id;
        return await this.perfilService.eliminarCuenta(usuarioId);
      } catch (error) {
        throw new BadRequestException(error.message || 'Error al eliminar la cuenta');
      }
    }

}
