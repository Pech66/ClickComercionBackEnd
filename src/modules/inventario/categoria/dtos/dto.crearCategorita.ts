import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class DtoCategoria {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Nombre de la categoría' })
  nombre: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Descripción de la categoría', required: false })
  descripcion?: string;
}
