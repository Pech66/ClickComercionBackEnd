import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class DtoProductoGranel {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    codigobarra: string;

    @Type(() => Number)
    @IsNumber()
    @ApiProperty({ example: 1200.50 })
    precioventa: number; // Precio por kilo/litro

    @IsString()
    @IsNotEmpty()
    unidaddemedida: string;

    @IsBoolean()
    @IsNotEmpty()
    @Type(() => Boolean)
    esgranel: true;

    @IsOptional()
    @IsString()
    Id_almacen?: string;

    @IsOptional()
    @IsString()
    Id_categoria?: string;

    @IsOptional()
    @IsString()
    fotoUrl?: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    preciodeproveedor?: number;
}