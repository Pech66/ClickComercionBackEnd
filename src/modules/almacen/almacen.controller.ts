import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DtoCrearAlmacen } from './dtos/dtos.crearalmacen';
import { AlmacenService } from './almacen.service';
import { UsuarioActual } from 'src/components/decoradores/usuario.actual';
import { DtoEditarAlmacen } from './dtos/dto.editaralmacen';
import { RolesGuard } from 'src/components/roles/roles.guard';
import { Roles } from 'src/components/roles/roles.decorator';
import { Rol } from 'src/components/roles/roles.enum';
import { PerfilService } from '../perfil/perfil.service';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';

@ApiTags('Almacen')
@Controller('almacen')
@ApiBearerAuth('access-token')
@Roles(Rol.ADMIN_TIENDA)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AlmacenController {
  constructor(
    private readonly almacenService: AlmacenService,
    private readonly prisma: PrismaService
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

  @Post('crear-almacen')
  @ApiOperation({ summary: 'Crear un almacén propio' })
  async crearAlmacen(
    @Body() dto: DtoCrearAlmacen,
    @UsuarioActual() usuario,
  ) {
    const Id_tienda = await this.obtenerIdTienda(usuario.id);
    return this.almacenService.crearAlmacen(dto.nombre, Id_tienda);
  }

  @Get('obtenerMialmacen')
  @ApiOperation({ summary: 'Obtener mi almacén' })
  async obtenerMiAlmacen(@UsuarioActual() usuario) {
    const Id_tienda = await this.obtenerIdTienda(usuario.id);
    return this.almacenService.obtenerMiAlmacen(Id_tienda);
  }

  @Put('editar-almacen/:id')
  @ApiOperation({ summary: 'Editar un almacén propio' })
  async editarAlmacen(
    @UsuarioActual() usuario,
    @Body() dtoEditarAlmcen: DtoEditarAlmacen,
    @Param('id') idAlmacen: string,
  ) {
    const Id_tienda = await this.obtenerIdTienda(usuario.id);
    return this.almacenService.editarMiAlmacen(dtoEditarAlmcen.nombre, idAlmacen, Id_tienda);
  }









}
