import { ApiProperty } from "@nestjs/swagger";
import { DtoCrearCompra } from "./dto.productocompra";

export class DtoAgregarProductosCompra {
    
    @ApiProperty({
    type: [DtoCrearCompra],
    description: 'Lista de productos a agregar a la compra'
     })
    productos: DtoCrearCompra[];
}