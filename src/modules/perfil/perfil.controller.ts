import { BadRequestException, Body, Controller, Delete, Get, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { UsuarioActual } from 'src/components/decoradores/usuario.actual';
import { JwtAuthGuard } from 'src/components/Jwt/jwtAuthGuard';
import { FileInterceptor } from '@nestjs/platform-express';
import { DtoEditarUsuario } from './dto/dto.editar.usuario';
import { ValidacionService } from 'src/components/validaciondatos/validacionService';
import { PerfilService } from './perfil.service';

@Controller('perfil')
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
    @Put('actualizarAdminitienda')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          nombre: { type: 'string', example: 'Juan Perez' },
          contrasena: { type: 'string', example: 'Abecedario1@' },
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
      @Req() req,
      @Body() dtoEditarUsuario: DtoEditarUsuario,
      @UploadedFile() foto?: Express.Multer.File, 
    ) { 
      try {
        if (foto) {
          this.validacionService.validateImageFormatoTamaño(foto); 
        }
      
        const usuarioId = req.user.Id || req.user.id; 
        const usuarioActualizado = await this.perfilService.editarUsuario(usuarioId, dtoEditarUsuario, foto); 
        return usuarioActualizado;
      } catch (error) {
        throw new BadRequestException(error.message);
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
