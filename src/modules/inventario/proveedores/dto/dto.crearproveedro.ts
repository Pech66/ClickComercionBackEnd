import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class DtoCrearProveedor{
    

    @ApiProperty({
        description: 'Nombre del proveedor',
        example: 'Proveedor S.A.',
        required: true
    })
    @IsString()
    nombre: string 

    @ApiProperty({ 
        description: 'Nombre del proveedor',
        example: 'Proveedor S.A.',
        required: true
    })
    @IsString()
    telefon : string
    
    @ApiProperty({
        description: 'Nombre de la empresa del proveedor',
        example: 'Empresa S.A.',
        required: true
    })
    @IsString()
    empresa : string 
}