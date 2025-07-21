import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsOptional } from 'class-validator';

export class DtoCrearAlmacen {

    @ApiProperty    ({
        description: 'Nombre del almacén',
        example: 'Almacén Central',
    })
    @IsString()
    @MaxLength(100)
    nombre: string;
}