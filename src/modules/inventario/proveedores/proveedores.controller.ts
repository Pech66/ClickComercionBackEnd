import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/components/Jwt/jwtAuthGuard';
import { Roles } from 'src/components/roles/roles.decorator';
import { Rol } from 'src/components/roles/roles.enum';
import { DtoCrearProveedor } from './dto/dto.crearproveedro';
import { UsuarioActual } from 'src/components/decoradores/usuario.actual';
import { ProveedoresService } from './proveedores.service';
import { DtoEditaeProveedor } from './dto/dto.editarproveedor';
import { PerfilService } from 'src/modules/perfil/perfil.service';

@Controller('proveedores')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Roles(Rol.ADMIN_TIENDA)
export class ProveedoresController {
    constructor(
        private readonly perfilService: PerfilService,
        private readonly provedoresService: ProveedoresService
    ) {}


    @Post('Crear')
    @ApiOperation({ summary: 'Crear proveedor' })
    async crearProveedor (
        @Body() dtoCreaProveedor: DtoCrearProveedor,
        @UsuarioActual() usuario
    ){
        const user = await this.perfilService.obtenerUsuarioPorId(usuario.id);
        if (!user?.Id_tienda) throw new BadRequestException('Debes crear una tienda primero.');
        return await this.provedoresService.CrearProveedor(dtoCreaProveedor, user.Id_tienda);
    }

    @Get('obtener')
    @ApiOperation({ summary: 'Obtener proveedores de la tienda del usuario' })
    async obtenerProveedores(
        @UsuarioActual() usuario
    ){
        //Nos encargamos de obtener el usuario actual
        const user = await this.perfilService.obtenerUsuarioPorId(usuario.id);

        if(!user?.Id_tienda) throw new BadRequestException('Debes crear una tienda primero.');

        //Retornamos los proveedores de la tienda del usuario
        return await this.provedoresService.obtenerProveedoresDeTienda(user.Id_tienda);
    }


    @Put('editar/:idProveedor')
    @ApiOperation({ summary: 'Editar proveedor' })
    async editarproveedor(
        @Param('idProveedor') idProveedor: string,
        @Body() dtoEditarProveedor: DtoEditaeProveedor,
        @UsuarioActual() usuario
    ){
        const user = await this.perfilService.obtenerUsuarioPorId(usuario.id);
        if (!user?.Id_tienda) throw new BadRequestException('Debes crear una tienda primero.');
        return await this.provedoresService.editarProveedor(idProveedor, dtoEditarProveedor, user.Id_tienda);
    }

    @Delete('eliminar/:idProveedor')
    @ApiOperation({ summary: 'Eliminar proveedor' })
    async eliminarProveedor(
        @Param('idProveedor') idProveedor: string,
        @UsuarioActual() usuario
    ) {
        const user = await this.perfilService.obtenerUsuarioPorId(usuario.id);
        if (!user?.Id_tienda) throw new BadRequestException('Debes crear una tienda primero.');
        return await this.provedoresService.eliminarProveedor(idProveedor, user.Id_tienda);
    }
}
