import {  ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class DtoCrearAlmacen {
  
    @IsString()
    @ApiProperty({
        description: 'Nombre del almacén',
    })
    nombre: string;
}