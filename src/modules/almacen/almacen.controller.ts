import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/Jwt/jwtAuthGuard';
import { DtoCrearAlmacen } from './dtos/dtos.crearalmacen';
import { AlmacenService } from './almacen.service';
import { TiendaService } from '../tienda/tienda.service';
import { TiendaAlmacen } from 'src/components/decoradores/TiendaAlmacen';

@Controller('almacen')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class AlmacenController {
    constructor(
        private readonly almacenService: AlmacenService,
        
    ){}


    @Post('CrearAlmacen')
    @ApiOperation({ summary: 'Crear un nuevo almacén' })
    async crearAlmacen(
        @Body() dtoCrearAlmacen: DtoCrearAlmacen,
        @TiendaAlmacen() tienda,
    ) {
        try {
            const almacen = await this.almacenService.registraAlmacen(dtoCrearAlmacen, tienda.id);
            return { mensaje: 'Almacen creado correctamente', almacen };
        } catch (error) {
            throw new Error(`Error al crear el almacén: ${error.message}`);
        }
    }


    
}
