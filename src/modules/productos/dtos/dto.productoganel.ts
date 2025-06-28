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
    codigobarra: string;

    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    preciokilo: number;

    @IsString()
    @IsNotEmpty()
    unidaddemedida: string;

    @IsBoolean()
    @IsNotEmpty()
    @Type(() => Boolean)
    esgranel: true;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
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
