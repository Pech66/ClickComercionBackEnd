import { ApiProperty } from '@nestjs/swagger';

export class AgregarProductoVentaDto {
  @ApiProperty({
    description: 'ID del producto a agregar a la venta',
    example: 'b6a8a0d1-72d7-4c2c-8c1e-7e9dc2fe1111'
  })
  Id_producto: string;

  @ApiProperty({
    description: 'Cantidad del producto a agregar (opcional, por defecto 1; requerido para productos a granel)',
    example: 2,
    required: false
  })
  cantidad?: number;
}