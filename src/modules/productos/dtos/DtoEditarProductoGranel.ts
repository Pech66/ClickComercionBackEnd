import { IsOptional, IsString, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class DtoEditarProductoGranel {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  codigobarra?: string | null;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  precioventa?: number;

  @IsOptional()
  @IsString()
  Id_categoria?: string | null;

  @IsOptional()
  @IsString()
  unidaddemedida?: string;

  @IsOptional()
  @IsString()
  fotoUrl?: string;
}