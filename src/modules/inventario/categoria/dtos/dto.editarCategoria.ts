import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";


export class DtoEditarCategoria {
    @IsOptional()
    @IsString()
    @ApiProperty({ description: 'Nombre de la categoría' })
    nombre?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ description: 'Descripción de la categoría', required: false })
    descripcion?: string;
}