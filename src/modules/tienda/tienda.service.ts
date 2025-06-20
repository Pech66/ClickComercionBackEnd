import { Injectable } from '@nestjs/common';
import { DtoCrearTienda } from './dtos/dto.creartienda';
import { PrismaService } from 'src/prisma/prisma.service';
import { ValidacionService } from 'src/components/validaciondatos/validacionService';



@Injectable()
export class TiendaService {
    constructor(
        private prisma: PrismaService,
        
    ){}

    async registrarTienda(dtoCrearTienda: DtoCrearTienda) {
        try {
          const tienda = await this.prisma.tienda.create({
            data: {
              nombre: dtoCrearTienda.nombre,
              ubicacion: dtoCrearTienda.ubicacion,
              telefono: dtoCrearTienda.telefono,
            },
          });
          return tienda;
        } catch (error) {
          throw new Error(`Error al registrar la tienda: ${error.message}`);
        }
    }

}
