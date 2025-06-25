import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class DtoEditarAlmacen {

    @ApiProperty({
        description: 'Nombre del almacén',
    })
    @IsString()
    nombre: string;
    
    

}