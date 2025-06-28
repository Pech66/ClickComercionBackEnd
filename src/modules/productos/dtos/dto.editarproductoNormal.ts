import { IsOptional, IsString, IsNumber, IsBoolean } from "class-validator";
import { Type } from "class-transformer";

export class DtoEditarProducto {
    @IsOptional()
    @IsString()
    nombre?: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsOptional()
    @IsString()
    codigobarra?: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    precioventa?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    preciodeproveedor?: number;

    @IsOptional()
    @IsString()
    Id_categoria?: string;

    @IsOptional()
    @IsString()
    foroUrl?: string;

    //PARA PRODUCTOS GRANEL
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    preciokilo?: number;

    @IsOptional()
    @IsString()
    unidaddemedida?: string;

    @IsOptional()
    @Type(() => Boolean)
    @IsBoolean()
    esgranel?: boolean;

    @IsOptional()
    @IsString()
    FotoUrl?: string;


   
}

