import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DtoCategoria } from './dtos/dto.crearCategorita';
import { ValidacionService } from 'src/components/validaciondatos/validacionService';
import { DtoEditarCategoria } from './dtos/dto.editarCategoria';

@Injectable()
export class CategoriaService {
  constructor(
    private prisma: PrismaService,
    private validacionService: ValidacionService,
  ) { }

  async crearCategoria(dtocategoria: DtoCategoria, Id_tienda: string) {
    if (!Id_tienda) throw new BadRequestException('Falta el Id de la tienda');
    if (!dtocategoria.nombre || dtocategoria.nombre.trim() === '') {
      throw new BadRequestException('El nombre de la categoría no puede estar vacío.');
    }
    this.validacionService.validateNombre(dtocategoria.nombre);

    // Verificar si ya existe una categoría con ese nombre en la misma tienda
    const categoriaExistente = await this.prisma.categoria.findFirst({
      where: {
        nombre: dtocategoria.nombre,
        Id_tienda: Id_tienda
      }
    });
    if (categoriaExistente) {
      throw new BadRequestException('Ya existe una categoría con ese nombre en tu tienda.');
    }

    return await this.prisma.categoria.create({
      data: {
        nombre: dtocategoria.nombre,
        descripcion: dtocategoria.descripcion,
        Id_tienda: Id_tienda
      }
    });
  }

  async obtenerCategoriasDeTienda(Id_tienda: string) {
    return await this.prisma.categoria.findMany({
      where: { Id_tienda },
      orderBy: { nombre: 'asc' }
    });
  }

  async obtenerCategoriaPorId(idCategoria: string, idTienda: string) {
    const categoria = await this.prisma.categoria.findUnique({
      where: { Id: idCategoria },
      include: { tienda: { select: { Id: true, nombre: true } } }
    });

    if (!categoria) {
      throw new BadRequestException('Categoría no encontrada');
      // Opcional: throw new NotFoundException('Categoría no encontrada');
    }

    if (categoria.Id_tienda !== idTienda) {
      throw new BadRequestException('No tienes permiso para ver esta categoría');
    }

    //Contar productos
    const almacenes = await this.prisma.almacen.findMany({
      where: { Id_tienda: idTienda },
      select: { Id: true }
    });

    const totalProductos = await this.prisma.producto.count({
      where: {
        Id_categoria: idCategoria,
        Id_almacen: { in: almacenes.map(a => a.Id) }
      }
    });

    return {
      ...categoria,
      totalProductos
    };
  }

  async editarCategoria(idCategoria: string, dtoEditarCategoria: DtoEditarCategoria, Id_tienda: string) {
    try {
      if (!idCategoria || idCategoria.trim() === '') {
        throw new BadRequestException('ID de categoría es requerido');
      }
      if (dtoEditarCategoria.nombre) {
        this.validacionService.validateNombre(dtoEditarCategoria.nombre);
      }
      if (dtoEditarCategoria.descripcion) {
        this.validacionService.validateDescripcion(dtoEditarCategoria.descripcion);
      }

      const categoria = await this.prisma.categoria.findUnique({
        where: { Id: idCategoria }
      });

      if (!categoria) {
        throw new BadRequestException('La categoría no existe.');
        // Opcional: throw new NotFoundException('La categoría no existe.');
      }
      if (categoria.Id_tienda !== Id_tienda) {
        throw new BadRequestException('No tienes permiso para editar esta categoría.');
      }

      // Verificar nombre duplicado
      if (dtoEditarCategoria.nombre && dtoEditarCategoria.nombre !== categoria.nombre) {
        const categoriaExistente = await this.prisma.categoria.findFirst({
          where: {
            nombre: dtoEditarCategoria.nombre,
            Id_tienda: Id_tienda,
            Id: { not: idCategoria }
          }
        });
        if (categoriaExistente) {
          throw new BadRequestException('Ya existe una categoría con ese nombre en tu tienda.');
        }
      }

      const dataToUpdate: any = {};
      if (dtoEditarCategoria.nombre !== undefined) {
        dataToUpdate.nombre = dtoEditarCategoria.nombre;
      }
      if (dtoEditarCategoria.descripcion !== undefined) {
        dataToUpdate.descripcion = dtoEditarCategoria.descripcion;
      }

      const categoriaActualizada = await this.prisma.categoria.update({
        where: { Id: idCategoria },
        data: dataToUpdate
      });

      return {
        message: 'Categoría actualizada exitosamente',
        categoria: categoriaActualizada
      };

    } catch (error) {
      throw new BadRequestException(error.message || 'Error al editar la categoría');
    }
  }

  async eliminarCategoria(idCategoria: string, Id_tienda: string) {
    const categoria = await this.prisma.categoria.findUnique({ where: { Id: idCategoria } });
    if (!categoria) throw new BadRequestException('La categoría no existe.');
    if (categoria.Id_tienda !== Id_tienda) throw new BadRequestException('No tienes permiso para eliminar esta categoría.');

    await this.prisma.categoria.delete({ where: { Id: idCategoria } });
    return { success: true, message: 'Categoría eliminada correctamente' };
  }

}