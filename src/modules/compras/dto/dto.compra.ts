import {  ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsDateString, IsISO8601, IsNumber, IsOptional, IsString, IsUUID, Matches, ValidateNested } from "class-validator";
import {  DtoCrearCompra } from "./dto.productocompra";

export class DtoProductoCompra {

    @ApiProperty({ description: "Fecha de la compra", example: "2023-10-01" })
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { 
        message: 'La fecha debe tener el formato YYYY-MM-DD' 
    })
    fecha: string;

    @ApiProperty({ description: "Total de la compra",})
    @IsNumber()
    total: number;

    @ApiProperty({description: "Tiket de la compra(optional si no hay tiket)",})
    @IsOptional()
    @IsString()
    sku?: string;

    @ApiProperty({description:"Id del proveedor (Opcional si no hay proveedor)"})
    @IsString()
    @IsUUID()
    @IsOptional()
    Id_proveedor?: string;

    @ApiProperty({ description: "Productos comprados", type: [DtoCrearCompra],})
    @ValidateNested({ each: true }) //Validar cada elemento del array
    @Type(() => DtoCrearCompra) // Transformar cada elemento a DtoProuctoCompra
    @ArrayMinSize(1) // Asegurar que el array tenga al menos un elemento
    productos: DtoCrearCompra[];
}