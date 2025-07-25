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
  codigobarra?: string | null; // ← Solo string o null (no necesitas | undefined)

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
  Id_categoria?: string | null; // ← Solo string o null

  @IsOptional()
  @IsString()
  foroUrl?: string;

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