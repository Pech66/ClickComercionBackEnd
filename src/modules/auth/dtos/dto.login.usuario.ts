import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";


export class DtoLoginUsuario {

    @IsString()
    @IsEmail()
    @ApiProperty({
        description: 'Correo electrónico del usuario',  })
    email: string;

    @ApiProperty({
        description: 'Contraseña del usuario',  })
    @IsString()
    contrasena: string;
}