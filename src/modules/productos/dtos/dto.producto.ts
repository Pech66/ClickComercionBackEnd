import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsNumber } from "class-validator";

export class DtoProductoNormal {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Laptop Dell XPS 13' })
    nombre: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Laptop Dell XPS 13 con procesador Intel i7, 16GB RAM, 512GB SSD' })
    descripcion: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'D4GH5J6K7L8M9N0' })
    codigobarra: string;

    @Type(() => Number)
    @IsNumber()
    @ApiProperty({ example: 1200.50 })
    precioventa: number;

    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    @ApiProperty({ example: 1000.00})
    preciodeproveedor?: number;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, description: 'ID del almacén, se asigna en backend automáticamente' })
    Id_almacen?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, description: 'ID de la categoría del producto, se asigna en backend automáticamente' })
    Id_categoria?: string;
}
