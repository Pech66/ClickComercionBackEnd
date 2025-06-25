import { BadRequestException, Body, ConflictException, Controller,  Delete,  Get, HttpCode, Param, Post, Put, Req, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { DtoRegistraUsuario } from "./dtos/dto.registra.usuario";
import { DtoVerificacion } from "./dtos/dto.verificacion";
import { DtoLoginUsuario } from "./dtos/dto.login.usuario";
import { JwtAuthGuard } from "./Jwt/jwtAuthGuard";
import { DtoReenvio } from "./dtos/dto.reenvio";
import { ApiBearerAuth, ApiBody, ApiOperation } from "@nestjs/swagger";
import { UsuarioActual } from "../components/decoradores/usuario.actual";
import { DtoEditarUsuario } from "./dtos/dto.editar.usuario";
import { FileInterceptor } from "@nestjs/platform-express";
import { ValidacionService } from "src/components/validaciondatos/validacionService";
import { ApiConsumes } from '@nestjs/swagger';

  
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly validacionService: ValidacionService,
  ) {}

  
  @Post('registro/admin-tienda')
  @ApiOperation({ summary: 'Registrar un administrador de tienda' })
  async registrarAdminTienda(@Body() registrarUsuarioDto: DtoRegistraUsuario) {
    try {
      return await this.authService.registrarUsuarioAdminTienda(registrarUsuarioDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new ConflictException('Error al registrar el administrador');
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión de usuario verificado' })
  async login(@Body() dtoLoginUsuario: DtoLoginUsuario) {
    try {
      return await this.authService.login(dtoLoginUsuario);
    } catch (error) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
  }

  
  @Post('verificar')  
  @ApiOperation({ summary: 'Verificar cuenta de usuario' })
  async verificarCuenta(@Body() dtoVerificacion: DtoVerificacion) {
    try {
      return await this.authService.verificarCuenta(dtoVerificacion);
    } catch (error) {
      if (error) {
        throw error;
      }
      throw new ConflictException('Error al verificar la cuenta');
    }
  }


  @Post('reenviar-codigo')
  @ApiOperation({ summary: 'Reenviar código de verificación' })
  async reenviarCodigo(@Body() dtoreenvio: DtoReenvio) {
    try {
      await this.authService.reenviarCodigo(dtoreenvio.email);
      return { message: 'Código reenviado exitosamente' };
    } catch (error) {
      throw new ConflictException(error.message || 'Error al reenviar el código');
    }
  }


  
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('datos-usuario')
  @ApiOperation({ summary: 'Obtener datos del usuario autenticado' })
  async obtenerDatosUsuario(@UsuarioActual() usuario) {
      console.log('Usuario extraído del token:', usuario);

    const usuarioId = usuario.sub ?? usuario.id;
    return this.authService.obtenerDatosUsuario(usuarioId);
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
      const usuarioActualizado = await this.authService.editarUsuario(usuarioId, dtoEditarUsuario, foto); 
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
      return await this.authService.eliminarCuenta(usuarioId);
    } catch (error) {
      throw new BadRequestException(error.message || 'Error al eliminar la cuenta');
    }
  }

  



}