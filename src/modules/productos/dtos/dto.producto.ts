import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsOptional, IsNumber } from "class-validator";

export class DtoProductoNormal {
  @IsString()
  @ApiProperty({ example: 'Laptop Dell XPS 13' })
  nombre: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Laptop Dell XPS 13...', required: false })
  descripcion?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'D4GH5J6K7L8M9N0', required: false })
  codigobarra?: string;

  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ example: 1200.50 })
  precioventa: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 1000.00, required: false })
  preciodeproveedor?: number;

  @IsOptional()
  @IsString()
  Id_almacen?: string;

  @IsOptional()
  @IsString()
  Id_categoria?: string;
}