import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class DtoProductoGranel {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsOptional()
  codigobarra?: string | null | undefined;

  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ example: 1200.50 })
  precioventa: number;

  @IsString()
  unidaddemedida: string;

  @IsBoolean()
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