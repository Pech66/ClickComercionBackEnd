import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { Rol } from '../roles/roles.enum';



export class DtoRegistraUsuario {

  @ApiProperty({
    description: 'Nombre del usuario',
    })
  @IsString()
  @MinLength(3)
  nombre: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
  })
  @IsString()
  @MinLength(6)
  contrasena: string;

  @IsOptional()
  @IsEnum(Rol)
  rol?: Rol;

  @IsOptional()
  @IsString()
  Id_tienda?: string;
    
}