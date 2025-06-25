import { Controller, Post, Put, Get, Delete, Param, Body, UseGuards, BadRequestException } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/Jwt/jwtAuthGuard';
import { UsuarioActual } from 'src/components/decoradores/usuario.actual';
import { AuthService } from 'src/auth/auth.service';
import { DtoCategoria } from './dtos/dto.crearCategorita';

@Controller('Categoria')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class CategoriaController {
  constructor(
    private categoriaService: CategoriaService,
    private authService: AuthService
  ) {}

  @Post('Crear')
  @ApiOperation({ summary: 'Crear categoría' })
  async crearCategoria(
    @Body() dtoCategoria: DtoCategoria,
    @UsuarioActual() usuario
  ) {
    // Opcional: Validar si el producto le pertenece a su tienda
    return await this.categoriaService.crearCategoria(dtoCategoria);
  }

  @Put('Editar/:idCategoria')
  @ApiOperation({ summary: 'Editar categoría' })
  async editarCategoria(
    @Param('idCategoria') idCategoria: string,
    @Body() dtoCategoria: DtoCategoria
  ) {
    return await this.categoriaService.editarCategoria(idCategoria, dtoCategoria);
  }

  @Delete('Eliminar/:idCategoria')
  @ApiOperation({ summary: 'Eliminar categoría' })
  async eliminarCategoria(
    @Param('idCategoria') idCategoria: string
  ) {
    return await this.categoriaService.eliminarCategoria(idCategoria);
  }

  @Get('ObtenerDeTienda')
  @ApiOperation({ summary: 'Obtener todas las categorías de la tienda del usuario' })
  async obtenerCategoriasDeTienda(
    @UsuarioActual() usuario
  ) {
    // Busca la tienda del usuario
    const user = await this.authService.obtenerUsuarioPorId(usuario.id);
    if (!user?.Id_tienda) {
      throw new BadRequestException('Debes crear una tienda primero.');
    }
    return await this.categoriaService.obtenerCategoriasDeTienda(user.Id_tienda);
  }
}
