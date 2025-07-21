import { ApiProperty } from '@nestjs/swagger';

export class AumentarCantidadProductoDto {
  @ApiProperty({
    description: 'Cantidad a aumentar para el producto (mayor a 0)',
    example: 3
  })
  cantidadAdicional: number;
}