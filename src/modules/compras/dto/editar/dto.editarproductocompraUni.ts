import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class DtoEditarProductoCompraUnitario {


    @ApiProperty ({
        description: 'ID del producto de la compra',   })
    @IsNumber()
    cantidad: number;
}