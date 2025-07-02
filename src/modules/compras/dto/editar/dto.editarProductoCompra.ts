import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class DtoEditarProuctoCompra{

    @ApiProperty({ 
        description: "ID del producto compra (si existe, se actualiza; si no, se crea)",
        example: "123e4567-e89b-12d3-a456-426614174000",
        required: false
    })
    @IsOptional()
    @IsUUID()
    Id?: string;

    @IsOptional()
    @ApiProperty({ description: "Cantidad del producto en la compra"})
    @IsNumber()
    cantidad?: number; 

    @IsOptional()
    @ApiProperty({description: "Id del producto comprado(Que debe existir en la base de datos)"})
    @IsUUID()
    Id_producto?: string;
}