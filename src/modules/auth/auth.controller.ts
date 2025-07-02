import { BadRequestException, Body, ConflictException, Controller,  Delete,  Get, HttpCode, Param, Post, Put, Req, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { DtoRegistraUsuario } from "./dtos/dto.registra.usuario";
import { DtoVerificacion } from "./dtos/dto.verificacion";
import { DtoLoginUsuario } from "./dtos/dto.login.usuario";
import { DtoReenvio } from "./dtos/dto.reenvio";
import { ApiBearerAuth, ApiBody, ApiOperation } from "@nestjs/swagger";
import { ValidacionService } from "src/components/validaciondatos/validacionService";
import { JwtAuthGuard } from "src/components/Jwt/jwtAuthGuard";
import { UsuarioActual } from "src/components/decoradores/usuario.actual";



@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  
  @Post('registro')
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

  @Post('verificar-cuenta')  
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

  @Post('logout')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Cerrar sesión del usuario autenticado' })
  async logout(@UsuarioActual() usuario) {
    try {
      const usuarioId = usuario.sub || usuario.Id || usuario.id;
      return await this.authService.logout(usuarioId);
    } catch (error) {
      throw new BadRequestException(error.message || 'Error al cerrar sesión');
    }
  }

  
  @Post('forgot-password')
  @ApiOperation({ summary: 'Solicitar recuperación de contraseña' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'usuario@email.com' }
      }
    }
  })
  async forgotPassword(@Body() body: { email: string }) {
    try {
      return await this.authService.forgotPassword(body.email);
    } catch (error) {
      throw new BadRequestException(error.message || 'Error al procesar solicitud');
    }
  }

 
  @Post('reset-password')
  @ApiOperation({ summary: 'Restablecer contraseña con token' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
        password: { type: 'string', example: 'NuevaContrasena123@' }
      }
    }
  })
  async resetPassword(@Body() body: { token: string; password: string }) {
    try {
      return await this.authService.resetPassword(body.token, body.password);
    } catch (error) {
      throw new BadRequestException(error.message || 'Error al restablecer contraseña');
    }
  }
  

 

}