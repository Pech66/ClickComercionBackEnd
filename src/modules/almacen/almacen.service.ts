import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DtoCrearAlmacen } from './dtos/dtos.crearalmacen';

@Injectable()
export class AlmacenService {
    constructor(
        private prisma: PrismaService,
    ){}
   
    
    async registraAlmacen(dtoCrearAlmacen: DtoCrearAlmacen, tiendaId: string) {
        try {
            return await this.prisma.almacen.create({
                data: {
                    nombre: dtoCrearAlmacen.nombre,
                    Id_tienda: tiendaId,
                },
            });
        } catch (error) {
            throw new Error(`Error al registrar el almacén: ${error.message}`);
        }
    }
    
}

