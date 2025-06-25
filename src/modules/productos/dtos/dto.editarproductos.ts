

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsNotEmpty, IsBoolean } from 'class-validator';

export class DtoProductoActualizar {
      
      @IsOptional()
      @IsString()
      @IsNotEmpty()
      @ApiProperty({ example: 'Laptop Dell XPS 13' })
      nombre?: string;
  
      @IsOptional()
      @IsString()
      @IsNotEmpty()
      @ApiProperty({ example: 'Laptop Dell XPS 13 con procesador Intel i7, 16GB RAM, 512GB SSD' })
      descripcion?: string;
  
      @IsOptional()
      @IsString()
      @IsNotEmpty()
      @ApiProperty({ example: 'D4GH5J6K7L8M9N0' })
      codigobarra?: string;
  
      @Type(() => Number)
      @IsOptional()
      @IsNumber()
      @ApiProperty({ example: 1200.50 })
      precioventa?: number;
  
      @Type(() => Number)
      @IsOptional()
      @IsNumber()
      @IsOptional()
      @ApiProperty({ example: 1000.00, required: false })
      precioporveedor?: number;
  
      // PARA PRODUCTO POR KILO (puedes omitir estos campos para productos por unidad)
      @Type(() => Number)
      @IsOptional()
      @IsOptional()
      @IsNumber()
      @ApiProperty({ example: 35.00, required: false })
      precioKilo?: number;
  
      @IsOptional()
      @IsOptional()
      @IsString()
      @ApiProperty({ example: 'kg', required: false })
      unidadMedida?: string;
  
      @Type(() => Boolean)
      @IsOptional()
      @IsOptional()
      @IsBoolean()
      @ApiProperty({ example: true, required: false })
      esgranel?: boolean;

      @IsOptional()
      @IsOptional()
      @IsString()
      @ApiProperty({ required: false, description: 'URL de la foto del producto' })
      fotoUrl?: string;


  
}