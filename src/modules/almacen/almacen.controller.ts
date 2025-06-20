import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/Jwt/jwtAuthGuard';

@Controller('almacen')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class AlmacenController {
    constructor(

    ){}

    @Post('CrearAlmacen/AdminAlmacen')
    @ApiOperation({ summary: 'Crear un nuevo almacén' })
    async crearAlmacen(){
        
    }
    
}
