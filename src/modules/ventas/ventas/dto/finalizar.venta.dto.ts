import { ApiProperty } from '@nestjs/swagger';

export class FinalizarVentaDto {
  @ApiProperty({
    description: 'Cantidad de dinero recibida del cliente (mayor a 0)',
    example: 150.00
  })
  cantidadRecibida: number;
}