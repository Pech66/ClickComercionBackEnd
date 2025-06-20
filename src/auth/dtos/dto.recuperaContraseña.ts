import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class DtoReenvio {

  @ApiProperty({
    description: 'Correo electrónico para recuperar la contraseña',
  })
  @IsEmail()
  email: string;

  
}
