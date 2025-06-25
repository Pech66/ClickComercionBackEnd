import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DtoCategoria } from './dtos/dto.crearCategorita';

@Injectable()
export class CategoriaService {
    constructor(
        private prisma : PrismaService
    ) {}
    
      async crearCategoria(dtoCategoria: DtoCategoria) {
      // Puedes validar si el producto existe, etc.
      return this.prisma.categoria.create({
        data: {
          nombre: dtoCategoria.nombre,
          descripcion: dtoCategoria.descripcion,
          Id_producto: dtoCategoria.Id_producto,
        }
      });
    }
  
    async editarCategoria(idCategoria: string, dtoCategoria: DtoCategoria) {
      const existe = await this.prisma.categoria.findUnique({
        where: { Id: idCategoria }
      });
      if (!existe) throw new BadRequestException('La categoría no existe.');
      return this.prisma.categoria.update({
        where: { Id: idCategoria },
        data: {
          nombre: dtoCategoria.nombre,
          descripcion: dtoCategoria.descripcion,
          Id_producto: dtoCategoria.Id_producto,
        }
      });
    }
  
    async eliminarCategoria(idCategoria: string) {
      const existe = await this.prisma.categoria.findUnique({
        where: { Id: idCategoria }
      });
      if (!existe) throw new BadRequestException('La categoría no existe.');
      await this.prisma.categoria.delete({
        where: { Id: idCategoria }
      });
      return { message: 'Categoría eliminada correctamente' };
    }
  
    async obtenerCategoriasDeTienda(Id_producto: string) {
      
      const productos = await this.prisma.categoria.findMany({
        where: { Id_producto: Id_producto },
        select: { Id: true }
      });
      const productosIds = productos.map(p => p.Id);
    
      return this.prisma.categoria.findMany({
        where: {
          Id_producto: { in: productosIds }
        }
      });
    }

}
