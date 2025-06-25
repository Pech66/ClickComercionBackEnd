import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class DtoEliminarTienda {
  @ApiProperty({ 
    description: 'Contraseña del usuario para confirmar la eliminación',
    example: 'miContraseñaSegura123'
  })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @IsString()
  @MinLength(1, { message: 'La contraseña no puede estar vacía' })
  contrasena: string;
}