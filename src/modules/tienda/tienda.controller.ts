import { BadRequestException, Body, ConflictException, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DtoCrearTienda } from './dtos/dto.creartienda';
import { JwtAuthGuard } from 'src/auth/Jwt/jwtAuthGuard';
import { Rol } from 'src/auth/roles/roles.enum';
import { Roles } from 'src/auth/roles/roles.decorator';
import { TiendaService } from './tienda.service';
import { AuthService } from 'src/auth/auth.service';
import { UsuarioActual } from 'src/auth/decorador/usuario.actual';

@Controller('Tienda')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class TiendaController {
  constructor(
    private readonly tiendaService: TiendaService,
    private readonly authService: AuthService,
  
  ){

    }

    @Post('CrearTienda')
    @ApiOperation({ summary: 'Crear una nueva tienda y vincular al usuario actual' })
    async crearTienda(
      @Body() dtoCrearTienda: DtoCrearTienda,
      @UsuarioActual() usuario,
    ) {
      console.log('Usuario recibido en endpoint:', usuario); 
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
}
