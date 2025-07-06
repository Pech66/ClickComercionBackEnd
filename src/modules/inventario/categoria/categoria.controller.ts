import { Controller, Post, Put, Get, Delete, Param, Body, UseGuards, BadRequestException } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/components/Jwt/jwtAuthGuard';
import { UsuarioActual } from 'src/components/decoradores/usuario.actual';
import { DtoCategoria } from './dtos/dto.crearCategorita';
import { Roles } from 'src/components/roles/roles.decorator';
import { Rol } from 'src/components/roles/roles.enum';
import { PerfilService } from 'src/modules/perfil/perfil.service';
import { RolesGuard } from 'src/components/roles/roles.guard';
import { DtoEditarCategoria } from './dtos/dto.editarCategoria';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';


@ApiTags('Categoria')
@Controller('categoria')
@ApiBearerAuth('access-token')
@Roles(Rol.ADMIN_TIENDA)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CategoriaController {
  constructor(
    private categoriaService: CategoriaService,
    private perfilService: PerfilService,
    private prisma: PrismaService
  ) { }

  private async obtenerIdTienda(usuarioId: string): Promise<string> {
    const user = await this.prisma.usuarios.findUnique({
      where: { Id: usuarioId },
      select: { Id_tienda: true }
    });

    if (!user?.Id_tienda) {
      throw new BadRequestException('Debes crear tu tienda primero.');
    }

    return user.Id_tienda;
  }

  @Post('crear')
  @ApiOperation({ summary: 'Crear categoría' })
  async crearCategoria(
    @Body() dtocategoria: DtoCategoria,
    @UsuarioActual() usuario
  ) {
    const Id_tienda = await this.obtenerIdTienda(usuario.id);
    return await this.categoriaService.crearCategoria(dtocategoria, Id_tienda);
  }

  @Get('mis-categorias')
  @ApiOperation({ summary: 'Obtener todas las categorías de mi tienda' })
  async obtenerMisCategorias(@UsuarioActual() usuario) {
    const Id_tienda = await this.obtenerIdTienda(usuario.id);
    return await this.categoriaService.obtenerCategoriasDeTienda(Id_tienda);
  }

  @Get('obtener/:id')
  @ApiOperation({ summary: 'Obtener categoría por ID de mi tienda' })
  @ApiParam({
    name: 'id',
    description: 'ID de la categoría',
    example: 'e17ef0e6-b1a8-46cf-9f1f-2f75e69b3dcd'
  })
  async obtenerCategoriaPorId(
    @Param('id') id: string,
    @UsuarioActual() usuario,
  ) {
    try {
      const Id_tienda = await this.obtenerIdTienda(usuario.id);
      const categoria = await this.categoriaService.obtenerCategoriaPorId(id, Id_tienda);

      return {
        success: true,
        message: 'Categoría encontrada exitosamente',
        data: categoria
      };
    } catch (error) {
      throw new BadRequestException(error.message || 'Error al obtener la categoría');
    }
  }

  @Put('editar/:idCategoria')
  @ApiOperation({ summary: 'Editar categoría' })
  async editarCategoria(
    @Param('idCategoria') idCategoria: string,
    @Body() dtoEditarcategoria: DtoEditarCategoria,
    @UsuarioActual() usuario
  ) {
    try {
      if (!idCategoria || idCategoria.trim() === '') {
        throw new BadRequestException('El ID de la categoría es requerido.');
      }

      const Id_tienda = await this.obtenerIdTienda(usuario.id);
      return await this.categoriaService.editarCategoria(idCategoria, dtoEditarcategoria, Id_tienda);
    } catch (error) {
      throw new BadRequestException(error.message || 'Error al editar la categoría');
    }
  }

  @Delete('eliminar/:idCategoria')
  @ApiOperation({ summary: 'Eliminar categoría' })
  async eliminarCategoria(
    @Param('idCategoria') idCategoria: string,
    @UsuarioActual() usuario
  ) {
    const Id_tienda = await this.obtenerIdTienda(usuario.id);
    return await this.categoriaService.eliminarCategoria(idCategoria, Id_tienda);
  }
}
