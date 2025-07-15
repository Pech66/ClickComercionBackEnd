import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class DtoCrearAlmacen {

    @ApiProperty({
        description: 'Nombre del almacén',
    })
    @IsString()
    nombre: string;

    @ApiProperty({
        description: 'Identificador de la tienda a la que pertenece el almacén',
    })
    @IsString()
    Id_tienda: string;
}