import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsUUID } from "class-validator";

export class DtoCrearCompra{

    @ApiProperty({ description: "Cantidad del producto en la compra"})
    @IsNumber()
    cantidad: number; 

    @ApiProperty({description: "Id del producto comprado(Que debe existir en la base de datos)"})
    @IsUUID()
    Id_producto: string;
}