import { Injectable } from '@nestjs/common';
import { DtoCrearTienda } from './dtos/dto.creartienda';
import { PrismaService } from 'src/prisma/prisma.service';
import { ValidacionService } from 'src/components/validaciondatos/validacionService';
import { DtoEditarTienda } from './dtos/dto.editartienda';

@Injectable()
export class TiendaService {
  constructor(
    private prisma: PrismaService,
    private validacionService: ValidacionService
  ) { }

  async registrarTienda(dtoCrearTienda: DtoCrearTienda) {
    // Validaciones
    this.validacionService.validateNumeroTelefono(dtoCrearTienda.telefono);
    this.validacionService.validateNombre(dtoCrearTienda.nombre);

    const tienda = await this.prisma.tienda.create({
      data: {
        nombre: dtoCrearTienda.nombre,
        ubicacion: dtoCrearTienda.ubicacion,
        telefono: dtoCrearTienda.telefono,
      },
    });
    return tienda;
  }

  async obtenerMiTienda(usuarioId: string) {
    // Obtener el usuario con su tienda actual desde la BD
    const usuario = await this.prisma.usuarios.findUnique({
      where: { Id: usuarioId },
      select: {
        Id_tienda: true,
        tienda: {
          select: {
            Id: true,
            nombre: true,
            ubicacion: true,
            telefono: true
          }
        }
      }
    });
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    if (!usuario.Id_tienda || !usuario.tienda) {
      throw new Error('El usuario no tiene tienda asignada');
    }
    return usuario.tienda;
  }

  async editarMiTienda(tiendaId: string, dtoEditarTienda: DtoEditarTienda) {
    // Validación de datos
    if (dtoEditarTienda.telefono !== undefined) {
      const numeroValido = this.validacionService.validateNumeroTelefono(dtoEditarTienda.telefono);
      if (!numeroValido) throw new Error('El número de teléfono no es válido');
    }
    if (dtoEditarTienda.nombre !== undefined) {
      const nombreValido = this.validacionService.validateNombre(dtoEditarTienda.nombre);
      if (!nombreValido) throw new Error('El nombre de la tienda debe ser válido');
    }

    // Asegurarse que solo modifica su propia tienda
    const tiendaExistente = await this.prisma.tienda.findUnique({
      where: { Id: tiendaId }
    });
    if (!tiendaExistente) {
      throw new Error('Tienda no encontrada');
    }

    // Construir objeto dinámico solo con campos válidos
    const updateData: any = {};
    if (dtoEditarTienda.nombre !== undefined && dtoEditarTienda.nombre.trim() !== '') {
      updateData.nombre = dtoEditarTienda.nombre.trim();
    }
    if (dtoEditarTienda.ubicacion !== undefined && dtoEditarTienda.ubicacion.trim() !== '') {
      updateData.ubicacion = dtoEditarTienda.ubicacion.trim();
    }
    if (dtoEditarTienda.telefono !== undefined && dtoEditarTienda.telefono.trim() !== '') {
      updateData.telefono = dtoEditarTienda.telefono.trim();
    }
    if (Object.keys(updateData).length === 0) {
      throw new Error('No se proporcionaron campos válidos para actualizar');
    }
    return await this.prisma.tienda.update({
      where: { Id: tiendaId },
      data: updateData,
    });
  }

  async eliminarMiTienda(usuarioId: string, tiendaId: string) {
    // transacciones para la consistencia
    return await this.prisma.$transaction(async (prisma) => {
      // Verificar que la tienda existe y le pertenece al usuario
      const tienda = await prisma.tienda.findUnique({
        where: { Id: tiendaId },
        include: { usuarios: true, almacen: true }
      });
      if (!tienda) throw new Error('Tienda no encontrada');
      const usuarioEsDueno = tienda.usuarios.some(u => u.Id === usuarioId);
      if (!usuarioEsDueno) throw new Error('Esta tienda no te pertenece');

      // Desasignar todos los usuarios de la tienda
      await prisma.usuarios.updateMany({
        where: { Id_tienda: tiendaId },
        data: { Id_tienda: null }
      });

      // Eliminar todos los almacenes de la tienda
      await prisma.almacen.deleteMany({
        where: { Id_tienda: tiendaId }
      });

      // Eliminar la tienda
      await prisma.tienda.delete({
        where: { Id: tiendaId }
      });

      return {
        mensaje: 'Tienda eliminada correctamente',
        usuariosDesasignados: tienda.usuarios.length,
        almacenesEliminados: tienda.almacen.length
      };
    });
  }
  async buscarPorId(idTienda: string) {
    return this.prisma.tienda.findUnique({
      where: { Id: idTienda }
    });
  }
}