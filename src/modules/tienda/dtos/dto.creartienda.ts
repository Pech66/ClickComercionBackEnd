import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DtoCrearTienda {

  @ApiProperty({
    description: 'Nombre de la tienda',
  })
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'Dirección de la tienda',
  })
  @IsString()
  ubicacion: string;

  
  @ApiProperty({
    description: 'Número de teléfono de la tienda',
  })
  telefono: string;

  
}