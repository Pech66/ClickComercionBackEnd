import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Min, MinLength } from "class-validator";


export class DtoEditarUsuario {
    
    @IsOptional()
    @IsString()
    @ApiProperty({ description: 'Nombre del usuario', example: 'Juan Perez' })
    nombre?: string;

    @IsOptional()
    @IsString()
    @MinLength (12)
    @ApiProperty({ description: 'Contraseña del usuario de 12 ', example: 'Abecedario1@' })
    contrasena?: string;
    
    @IsOptional()
    @IsString()
    @ApiProperty({ description: 'Archivo de la imagne', example: 'https://example.com/foto.jpg' })
    fotoUrl?: string;
}