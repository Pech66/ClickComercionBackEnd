import { IsString, IsOptional } from 'class-validator';

export class BuscarProductoDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  codigo?: string; // Puede ser código de barra u otro identificador
}