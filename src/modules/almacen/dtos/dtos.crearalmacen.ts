import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class DtoCrearAlmacen {

    @ApiProperty({
        description: 'Nombre del almacén',
    })
    @IsString()
    nombre: string;
    
    @ApiProperty({
        description: 'Id de la tienda a la que pertenece el almacén',
    })
    Id_tienda: string;


    @ApiProperty({
        description: 'Id del producto asociado al almacén',
    })
    Id_producto: string;

}