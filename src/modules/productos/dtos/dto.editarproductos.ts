

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class DtoProductoActualizar {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Nombre del producto',})
  nombre?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Descripción del producto',})
  descripcion?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Código de barras del producto',})
  codigobarra?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'Precio de venta del producto',})
  precioventa?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'Precio de compra del producto (opcional)',})
  precriokilo?: number; // Opcional, para productos a granel

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'Precio de compra del proveedor (opcional)',})
  precioPorveedor?: number; // No es obligatorio, pero si se proporciona debe ser un número  

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'Precio de compra del producto (opcional)',})
  preciodeproveedor?: number; // Opcional
}