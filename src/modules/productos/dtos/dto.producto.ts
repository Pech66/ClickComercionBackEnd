import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsNumber } from "class-validator";

export class DtoProducto {
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
    @ApiProperty({ example: 1000.00, required: false })
    precioporveedor?: number;

    // PARA PRODUCTO POR KILO (puedes omitir estos campos para productos por unidad)
    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    @ApiProperty({ example: 35.00, required: false })
    precioKilo?: number;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'kg', required: false })
    unidadMedida?: string;

    @Type(() => Boolean)
    @IsOptional()
    @IsBoolean()
    @ApiProperty({ example: true, required: false })
    esgranel?: boolean;

    // Clave: Hacer Id_almacen OPCIONAL
    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, description: 'ID del almacén, se asigna en backend automáticamente' })
    Id_almacen?: string;
}
