import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDecimal, IsString } from "class-validator";


export class DtoProductoKilo {

        
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
    
        @IsString()
        @ApiProperty({
            description: 'URL de la foto del producto',
            example: 'https://example.com/fotos/laptop-dell-xps-13.jpg'
        })
        fotoUrl: string;
    
        @IsDecimal()
        @ApiProperty({
            description: 'Precio de venta del producto',
            example: 1200.50
        })
        precioKilo: number;
    
        @IsDecimal()
        @ApiProperty({
            description: 'Precio de compra del producto/No es obligatorio',
            example: 1000.00
        })
        precioporveedor?: number;

        @IsString()
        @ApiProperty({
            description: 'Unidad de medida del producto (ejemplo: kg, g, lb)',
            example: 'kg'
        })
        unidadMedida: string;

        @ApiProperty({
            description: 'Indica si el producto se vende a granel',
            example: true
        })
        @IsBoolean()
        esgranel: boolean;


}