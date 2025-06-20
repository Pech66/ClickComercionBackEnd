import { Body, ConflictException, Controller, createParamDecorator, Delete, ExecutionContext, Get, Param, Post, Put, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { DtoRegistraUsuario } from "./dtos/dto.registra.usuario";
import { DtoVerificacion } from "./dtos/dto.verificacion";
import { DtoLoginUsuario } from "./dtos/dto.login.usuario";
import { JwtAuthGuard } from "./Jwt/jwtAuthGuard";
import { Roles } from "./roles/roles.decorator";
import { RolesGuard } from "./roles/roles.guard";
import { Rol } from "./roles/roles.enum";
import { DtoEditarUsuario } from "./dtos/dto.editar.usuario";
import { DtoReenvio } from "./dtos/dto.reenvio";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { UsuarioActual } from "./decorador/usuario.actual";

  
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
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

  
  @Post('verificar')  
  @ApiOperation({ summary: 'Verificar cuenta de usuario' })
  async verificarCuenta(@Body() dtoVerificacion: DtoVerificacion) {
    try {
      return await this.authService.verificarCuenta(dtoVerificacion);
    } catch (error) {
      if (error instanceof ConflictException) {
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


  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión de usuario verificado' })
  async login(@Body() dtoLoginUsuario: DtoLoginUsuario) {
    try {
      return await this.authService.login(dtoLoginUsuario);
    } catch (error) {
      throw new UnauthorizedException('Credenciales inválidas');
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
  
  
  
  async recupeararContraseña(@Body()){
    
  }
  




}