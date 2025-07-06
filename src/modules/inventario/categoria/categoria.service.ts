import { BadRequestException, Injectable } from '@nestjs/common';
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


  async editarCategoria(idCategoria: string, dtoEditarCategoria: DtoEditarCategoria, Id_tienda: string) {
    try {
      // 1. Validar que el ID no esté vacío
      if (!idCategoria || idCategoria.trim() === '') {
        throw new BadRequestException('ID de categoría es requerido');
      }

      // 2. Validar datos de entrada
      if (dtoEditarCategoria.nombre) {
        this.validacionService.validateNombre(dtoEditarCategoria.nombre);
      }
      if (dtoEditarCategoria.descripcion) {
        this.validacionService.validateDescripcion(dtoEditarCategoria.descripcion);
      }

      // 3. Verificar que la categoría existe y pertenece a la tienda
      const categoria = await this.prisma.categoria.findUnique({
        where: { Id: idCategoria }
      });

      if (!categoria) {
        throw new BadRequestException('La categoría no existe.');
      }

      if (categoria.Id_tienda !== Id_tienda) {
        throw new BadRequestException('No tienes permiso para editar esta categoría.');
      }

      // 4. Verificar que el nombre no esté duplicado en la tienda (opcional)
      if (dtoEditarCategoria.nombre && dtoEditarCategoria.nombre !== categoria.nombre) {
        const categoriaExistente = await this.prisma.categoria.findFirst({
          where: {
            nombre: dtoEditarCategoria.nombre,
            Id_tienda: Id_tienda,
            Id: { not: idCategoria } // Excluir la categoría actual
          }
        });

        if (categoriaExistente) {
          throw new BadRequestException('Ya existe una categoría con ese nombre en tu tienda.');
        }
      }

      // 5. Actualizar solo los campos proporcionados
      const dataToUpdate: any = {};
      if (dtoEditarCategoria.nombre !== undefined) {
        dataToUpdate.nombre = dtoEditarCategoria.nombre;
      }
      if (dtoEditarCategoria.descripcion !== undefined) {
        dataToUpdate.descripcion = dtoEditarCategoria.descripcion;
      }

      const categoriaActualizada = await this.prisma.categoria.update({
        where: { Id: idCategoria },
        data: dataToUpdate,
        include: {
          _count: {
            select: {
              producto: true
            }
          }
        }
      });

      return {
        message: 'Categoría actualizada exitosamente',
        categoria: categoriaActualizada
      };

    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(`Error al editar la categoría: ${error.message}`);
    }

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

  async obtenerCategoriaPorId(idCategoria: string, idTienda: string) {
    // Buscar categoría
    const categoria = await this.prisma.categoria.findUnique({
      where: { Id: idCategoria },
      include: {
        tienda: {
          select: { Id: true, nombre: true }
        }
      }
    });

    if (!categoria) {
      throw new BadRequestException('Categoría no encontrada');
    }

    // Verificar permisos
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
}
