import { ApiProperty } from '@nestjs/swagger';

export class HistorialDetallesVentaDto {
  @ApiProperty({
    description: 'ID del detalle de venta',
    example: 'a1b2c3d4-5678-1234-9abc-def123456789'
  })
  id_detalle: string;

  @ApiProperty({
    description: 'ID del producto vendido',
    example: 'b6a8a0d1-72d7-4c2c-8c1e-7e9dc2fe1111'
  })
  id_producto: string;

  @ApiProperty({
    description: 'Nombre del producto vendido',
    example: 'Arroz'
  })
  nombre_producto: string;

  @ApiProperty({
    description: 'Código de barras del producto',
    example: '7501001234567'
  })
  codigobarra: string;

  @ApiProperty({
    description: 'Cantidad vendida al cliente',
    example: 5
  })
  cantidad: number;

  @ApiProperty({
    description: 'Subtotal de este producto en la venta',
    example: 120.00
  })
  subtotal: number;

  @ApiProperty({
    description: 'Precio unitario del producto',
    example: 24.00
  })
  precio_unitario: number;

  @ApiProperty({
    description: 'Fecha y hora de la venta',
    example: '2025-07-20T15:30:00.000Z'
  })
  fecha_venta: string;

  @ApiProperty({
    description: 'ID de la venta',
    example: 'c1d2e3f4-5678-1234-9abc-def123456789'
  })
  id_venta: string;

  @ApiProperty({
    description: 'Total de la venta',
    example: 200.00
  })
  total_venta: number;
}