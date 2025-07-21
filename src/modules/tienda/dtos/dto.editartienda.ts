import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

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
  @Min(1000000000)
  @Max(9999999999)
  @IsOptional()
  telefono?: string;

}