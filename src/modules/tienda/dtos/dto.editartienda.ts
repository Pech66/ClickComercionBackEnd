import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class DtoEditarTienda {

  @ApiProperty({
    description: 'Nombre de la tienda',
  })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiProperty({
    description: 'Dirección de la tienda',
  })
  @IsString()
  @IsOptional()
  ubicacion?: string;

  
  @ApiProperty({
    description: 'Número de teléfono de la tienda',
  })
  @IsNumber()
  @IsOptional()
  telefono?: string;

}