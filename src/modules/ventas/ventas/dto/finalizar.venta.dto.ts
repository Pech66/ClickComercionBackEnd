import { IsNumber, IsPositive } from 'class-validator';

export class FinalizarVentaDto {
  @IsNumber()
  @IsPositive()
  cantidadRecibida: number; // dinero recibido del cliente
}