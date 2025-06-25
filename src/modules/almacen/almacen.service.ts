import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DtoCrearAlmacen } from './dtos/dtos.crearalmacen';

@Injectable()
export class AlmacenService {
    constructor(
        private prisma: PrismaService,
    ){}
   
    
    async crearAlmacen(nombre: string, idTienda: string) {
    // Antes de crear, valida que la tienda exista
    const tienda = await this.prisma.tienda.findUnique({
      where: { Id: idTienda },
    });
  
    if (!tienda) {
      throw new BadRequestException('La tienda asociada no existe');
    }
  
    // creamos el almacén
    return this.prisma.almacen.create({
      data: {
        nombre,
        Id_tienda: idTienda,
      },
    });
  }

  async obtenerMiAlmacen(idTienda: string) {
    const almacenes = await this.prisma.almacen.findMany({
      where: { Id_tienda: idTienda },
      select: {
        Id: true,
        nombre: true,
        tienda: {
          select: {
            Id: true,
            nombre: true,
            ubicacion: true,
            telefono: true,
          }
        }
      }
    });

    if (!almacenes || almacenes.length === 0) {
      throw new BadRequestException('No se encontró almacén para esta tienda');
    }

    return almacenes;
  }


  async editarMiAlmacen(nombre: string, idAlmacen: string, idTienda: string) {
    // Buscamos que el almacén pertenezca a la tienda del usuario
    const almacen = await this.prisma.almacen.findFirst({
      where: { 
        Id: idAlmacen,
        Id_tienda: idTienda,
      }
    });

    if (!almacen) {
      throw new BadRequestException('No tienes permisos para editar este almacén');
    }

    // Actualizamos el almacén
    return this.prisma.almacen.update({
      where: { Id: idAlmacen },
      data: { nombre },
    });
  }

  
      
} 

