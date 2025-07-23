import { BadRequestException, Body, ConflictException, Controller, Post, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { DtoRegistraUsuario } from "./dtos/dto.registra.usuario";
import { DtoVerificacion } from "./dtos/dto.verificacion";
import { DtoLoginUsuario } from "./dtos/dto.login.usuario";
import { DtoReenvio } from "./dtos/dto.reenvio";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/components/Jwt/jwtAuthGuard";
import { UsuarioActual } from "src/components/decoradores/usuario.actual";


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }


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
  @ApiBody({
    description: 'Email del usuario para recuperar contraseña',
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          format: 'email',
          example: 'usuario@ejemplo.com',
          description: 'Email registrado del usuario'
        }
      },
      required: ['email']
    }
  })
  @ApiOperation({ summary: 'Solicitar código de recuperación de contraseña' })
  async forgotPassword(@Body() body: { email: string }) {
    try {
      return await this.authService.forgotPassword(body.email);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('verify-recovery-code')
  @ApiOperation({ summary: 'Verificar código de recuperación de contraseña' })
  @ApiBody({
    description: 'Datos para verificar código de recuperación',
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          format: 'email',
          example: 'usuario@ejemplo.com',
          description: 'Email registrado del usuario'
        },
        codigo: {
          type: 'string',
          example: '123456',
          description: 'Código de verificación enviado al email',
          minLength: 6,
          maxLength: 6
        }
      },
      required: ['email', 'codigo']
    }
  })
  async verifyRecoveryCode(@Body() body: { email?: string; codigo?: string }) {
    if (!body?.email || !body?.codigo) {
      throw new BadRequestException('El email y el código son obligatorios');
    }
    const valido = await this.authService.verifyRecoveryCode(body.email, body.codigo);
    if (!valido) throw new BadRequestException('Código inválido o expirado');
    return { message: 'Código válido' };
  }

  // 3. POST /auth/reset-password
  @Post('reset-password')
  @ApiOperation({ summary: 'Restablecer contraseña con código' })
  @ApiBody({
    description: 'Datos para restablecer contraseña',
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          format: 'email',
          example: 'usuario@ejemplo.com',
          description: 'Email del usuario'
        },
        codigo: {
          type: 'string',
          example: '123456',
          description: 'Código de 6 dígitos recibido por email',
          minLength: 6,
          maxLength: 6
        },
        password: {
          type: 'string',
          example: 'NuevaContrasena123@',
          description: 'Nueva contraseña (mínimo 8 caracteres)',
          minLength: 8
        }
      },
      required: ['email', 'codigo', 'password']
    }
  })
  async resetPassword(@Body() body: { email: string; codigo: string; password: string }) {
    try {
      return await this.authService.resetPassword(body.email, body.codigo, body.password);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


 
}  