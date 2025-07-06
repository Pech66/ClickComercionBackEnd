import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DtoCrearProveedor } from './dto/dto.crearproveedro';
import { DtoEditaeProveedor } from './dto/dto.editarproveedor';
import { ValidacionService } from 'src/components/validaciondatos/validacionService';

@Injectable()
export class ProveedoresService {
    constructor(
        private prisma: PrismaService,
        private validacionService: ValidacionService, 
    ) {}

    async CrearProveedor(dtoCrearProveedro: DtoCrearProveedor, Id_tienda: string) {
        if(!Id_tienda) throw new Error('Falta el Id de la tienda');

        // validaciones 
        this.validacionService.validateNombre(dtoCrearProveedro.nombre);
        this.validacionService.validateNumeroTelefono(dtoCrearProveedro.telefono);
        this.validacionService.validateNombre(dtoCrearProveedro.empresa);
        

        return await this.prisma.proveedor.create({
            data: {
                nombre: dtoCrearProveedro.nombre,
                telefono: dtoCrearProveedro.telefono,
                empresa: dtoCrearProveedro.empresa,
                Id_tienda: Id_tienda
            }
        });
    }

    async obtenerProveedoresDeTienda(Id_tienda: string){
        return await this.prisma.proveedor.findMany({
            where: { Id_tienda },
            orderBy: { nombre: 'asc' }
        });
    }
    
    async editarProveedor(idProveedor: string, dtoEditarProveedor : DtoEditaeProveedor ,Id_tienda: string){
        // Asegura que el proveedor pertenezca a la tienda
        const proveedor = await this.prisma.proveedor.findUnique({
            where: { Id: idProveedor}
        });

        if (!proveedor) throw new BadRequestException('El proveedor no existe.');
        if (proveedor.Id_tienda !== Id_tienda) throw new BadRequestException('No tienes permiso para editar este proveedor.');
        

        // Actualiza el proveedor
        return await this.prisma.proveedor.update({
            where: {Id: idProveedor},
            data: {
                nombre: dtoEditarProveedor.nombre,
                telefono: dtoEditarProveedor.telefono,
                empresa: dtoEditarProveedor.empresa
            }
        });
    }

    async obtenerProveedorPorId(idProveedor: string, idTienda: string) {
      const proveedor = await this.prisma.proveedor.findFirst({
        where: {
          Id: idProveedor,
          Id_tienda: idTienda
        }
      });
      if (!proveedor) {
        throw new NotFoundException('Proveedor no encontrado o no pertenece a tu tienda.');
      }
      return proveedor;
    }

    async eliminarProveedor(idProveedor: string, Id_tienda: string) {
        const proveedor = await this.prisma.proveedor.findUnique({ where: { Id: idProveedor } });
        if (!proveedor) throw new BadRequestException('El proveedor no existe.');
        if (proveedor.Id_tienda !== Id_tienda) throw new BadRequestException('No tienes permiso para eliminar este proveedor.');

        await this.prisma.proveedor.delete({ where: { Id: idProveedor } });
        return { message: 'Proveedor eliminado correctamente' };
    }

}
