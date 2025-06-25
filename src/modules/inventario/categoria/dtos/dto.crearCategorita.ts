import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class DtoCategoria {

  
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Nombre de la categoría',
  })
  nombre?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Descripción de la categoría',
  })
  descripcion?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'ID del producto asociado a la categoría',
  })
  Id_producto?: string;
}
