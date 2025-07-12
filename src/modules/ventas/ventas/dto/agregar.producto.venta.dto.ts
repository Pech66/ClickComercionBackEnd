import { IsString, IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class AgregarProductoVentaDto {
  @IsString()
  @IsNotEmpty()
  Id_producto: string;

  // Solo para productos a granel
  @IsNumber()
  @IsOptional()
  @IsPositive()
  cantidad?: number; // gramos, kilos, unidades según producto
}