import { ApiProperty } from "@nestjs/swagger";
import {  IsString } from "class-validator";


export class DtoProducto {

        @IsString()
        @ApiProperty({
            description: 'Nombre del producto',
            example: 'Laptop Dell XPS 13'
        })
        nombre: string;
        
        @IsString()
        @ApiProperty({
            description: 'Descripción del producto',
            example: 'Laptop Dell XPS 13 con procesador Intel i7, 16GB RAM, 512GB SSD'
        })
        descripcion: string;

        @IsString()
        @ApiProperty({
            description: 'Código de barras del producto',
            example: 'D4GH5J6K7L8M9N0'
        })
        codigobarra: string;

        

        
        @ApiProperty({
            description: 'Precio de venta del producto',
            example: 1200.50
        })
        precioventa: number;

        
        @ApiProperty({
            description: 'Precio de compra del producto/No es obligatorio',
            example: 1000.00
        })
        precioporveedor?: number;


}