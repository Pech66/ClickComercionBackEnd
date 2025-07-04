import { Controller, Post, Put, Get, Delete, Param, Body, UseGuards, BadRequestException } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/components/Jwt/jwtAuthGuard';
import { UsuarioActual } from 'src/components/decoradores/usuario.actual';
import { DtoCategoria } from './dtos/dto.crearCategorita';
import { Roles } from 'src/components/roles/roles.decorator';
import { Rol } from 'src/components/roles/roles.enum';
import { PerfilService } from 'src/modules/perfil/perfil.service';



@Controller('categoria')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Roles(Rol.ADMIN_TIENDA)
export class CategoriaController {
  constructor(
    private categoriaService: CategoriaService,
    private perfilService: PerfilService
  ) {}

  @Post('crear')
  @ApiOperation({ summary: 'Crear categoría' })
  async crearCategoria(
    @Body() dtocategoria: DtoCategoria,
    @UsuarioActual() usuario
  ) {
    const user = await this.perfilService.obtenerUsuarioPorId(usuario.id);
    if (!user?.Id_tienda) throw new BadRequestException('Debes crear una tienda primero.');
    return await this.categoriaService.crearCategoria(dtocategoria, user.Id_tienda);
  }

  @Get('obtener')
  @ApiOperation({ summary: 'Obtener todas las categorías de la tienda del usuario' })
  async obtenerCategorias(
    @UsuarioActual() usuario
  ) {
    const user = await this.perfilService.obtenerUsuarioPorId(usuario.id);
    if (!user?.Id_tienda) throw new BadRequestException('Debes crear una tienda primero.');
    return await this.categoriaService.obtenerCategoriasDeTienda(user.Id_tienda);
  }

  @Put('editar')
  @ApiOperation({ summary: 'Editar categoría' })
  async editarCategoria(
    @Param('idCategoria') idCategoria: string,
    @Body() dtocategoria: DtoCategoria,
    @UsuarioActual() usuario
  ) {
    const user = await this.perfilService.obtenerUsuarioPorId(usuario.id);
    if (!user?.Id_tienda) throw new BadRequestException('Debes crear una tienda primero.');
    return await this.categoriaService.editarCategoria(idCategoria, dtocategoria, user.Id_tienda);
  }

  @Delete('eliminar/:idCategoria')
  @ApiOperation({ summary: 'Eliminar categoría' })
  async eliminarCategoria(
    @Param('idCategoria') idCategoria: string,
    @UsuarioActual() usuario
  ) {
    const user = await this.perfilService.obtenerUsuarioPorId(usuario.id);
    if (!user?.Id_tienda) throw new BadRequestException('Debes crear una tienda primero.');
    return await this.categoriaService.eliminarCategoria(idCategoria, user.Id_tienda);
  }

  @Get('obtener')
  @ApiOperation({ summary: 'Obtener todas las categorías de la tienda del usuario' })
  async obtenerCategoriasDeTienda(
    @UsuarioActual() usuario
  ) {
    const user = await this.perfilService.obtenerUsuarioPorId(usuario.id);
    if (!user?.Id_tienda) throw new BadRequestException('Debes crear una tienda primero.');
    return await this.categoriaService.obtenerCategoriasDeTienda(user.Id_tienda);
  }
}
