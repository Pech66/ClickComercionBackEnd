import {  ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsISO8601, IsNumber, IsOptional, IsString, IsUUID, Matches, ValidateNested } from "class-validator";
import { DtoEditarProuctoCompra } from "./dto.editarProductoCompra";


export class DtoEditarProductoCompra {

    @IsOptional()
    @ApiProperty({ description: "Fecha de la compra",})
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { 
        message: 'La fecha debe tener el formato YYYY-MM-DD (solo fecha, sin hora)' 
    })
    fecha?: string;

    @IsOptional()
    @ApiProperty({ description: "Total de la compra",})
    @IsNumber()
    total?: number;

    @IsOptional()
    @ApiProperty({description: "Tiket de la compra(optional si no hay tiket)",})
    @IsOptional()
    @IsString()
    sku?: string;

    @IsOptional()
    @ApiProperty({description:"Id del proveedor (Opcional si no hay proveedor)"})
    @IsString()
    @IsUUID()
    @IsOptional()
    Id_proveedor?: string;

    @IsOptional()
    @ApiProperty({ description: "Productos comprados", type: [DtoEditarProuctoCompra],})
    @ValidateNested({ each: true }) //Validar cada elemento del array
    @Type(() => DtoEditarProuctoCompra) // Transformar cada elemento a DtoProuctoCompra
    @ArrayMinSize(1) // Asegurar que el array tenga al menos un elemento
    productos?: DtoEditarProuctoCompra[];
}