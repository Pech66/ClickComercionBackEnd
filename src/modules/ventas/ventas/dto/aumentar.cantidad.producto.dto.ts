    import { IsNumber, IsPositive } from 'class-validator';

export class AumentarCantidadProductoDto {
  @IsNumber()
  @IsPositive()
  cantidadAdicional: number; // cantidad a sumar (unidades o gramos/kilos)
}