// dtoReenvio.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class DtoReenvio {

  @ApiProperty({
    description: 'Correo electrónico del usuario para reenviar el código de verificación',
  })
  @IsEmail()
  email: string;
}
