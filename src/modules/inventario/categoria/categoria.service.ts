import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DtoCategoria } from './dtos/dto.crearCategorita';
import { ValidacionService } from 'src/components/validaciondatos/validacionService';

@Injectable()
export class CategoriaService {
  constructor(
    private prisma: PrismaService,
    private validacionService: ValidacionService,
  ) {}

  async crearCategoria(dtocategoria: DtoCategoria, Id_tienda: string) {
    // Verifica que la tienda exista si lo deseas 
    if (!Id_tienda) throw new BadRequestException('Falta el Id de la tienda');

    // Validar que el nombre de la categoría no esté vacío
    if (!dtocategoria.nombre || dtocategoria.nombre.trim() === '') {
      throw new BadRequestException('El nombre de la categoría no puede estar vacío.');
    }
    // Valida el formato 
    this.validacionService.validateNombre(dtocategoria.nombre);
    
    return await this.prisma.categoria.create({
      data: {
        nombre: dtocategoria.nombre,
        descripcion: dtocategoria.descripcion,
        Id_tienda: Id_tienda
      }
    });
  }

  async obtenerCategorias(Id_tienda: string) {
    return await this.prisma.categoria.findMany({
      where: { Id_tienda },
      orderBy: { nombre: 'asc' }
    });
  }


  async editarCategoria(idCategoria: string, dtocategoria: DtoCategoria, Id_tienda: string) {
    // Asegura que la categoría pertenezca a la tienda
    const categoria = await this.prisma.categoria.findUnique({ where: { Id: idCategoria } });
    if (!categoria) throw new BadRequestException('La categoría no existe.');
    if (categoria.Id_tienda !== Id_tienda) throw new BadRequestException('No tienes permiso para editar esta categoría.');

    // Valida el formato 
    const validarNombre = this.validacionService.validateNombre(dtocategoria.nombre);
    if (validarNombre) {
      throw new BadRequestException('El nombre de la categoría no es válido.');
    }
    
    return await this.prisma.categoria.update({
      where: { Id: idCategoria },
      data: {
        nombre: dtocategoria.nombre,
        descripcion: dtocategoria.descripcion
      }
    });
  }

  async eliminarCategoria(idCategoria: string, Id_tienda: string) {
    const categoria = await this.prisma.categoria.findUnique({ where: { Id: idCategoria } });
    if (!categoria) throw new BadRequestException('La categoría no existe.');
    if (categoria.Id_tienda !== Id_tienda) throw new BadRequestException('No tienes permiso para eliminar esta categoría.');

    await this.prisma.categoria.delete({ where: { Id: idCategoria } });
    return { message: 'Categoría eliminada correctamente' };
  }

  async obtenerCategoriasDeTienda(Id_tienda: string) {
    return await this.prisma.categoria.findMany({
      where: { Id_tienda },
      orderBy: { nombre: 'asc' }
    });
  }
}
