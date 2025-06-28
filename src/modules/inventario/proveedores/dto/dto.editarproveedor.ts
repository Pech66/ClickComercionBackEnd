import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"

export class DtoEditaeProveedor{
    

    @ApiProperty({
        description: 'Nombre del proveedor',
        example: 'Proveedor S.A.',
        required: true
    })
    @IsString()
    @IsOptional()
    nombre?: string 

    @ApiProperty({ 
        description: 'Nombre del proveedor',
        example: 'Proveedor S.A.',
        required: true
    })
    @IsString()
    @IsOptional()
    telefono?: string
    
    @ApiProperty({
        description: 'Nombre de la empresa del proveedor',
        example: 'Empresa S.A.',
        required: true
    })
    @IsString()
    @IsOptional()
    empresa?: string 
}