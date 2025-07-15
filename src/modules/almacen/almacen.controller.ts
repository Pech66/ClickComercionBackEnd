import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ValidacionService } from 'src/components/validaciondatos/validacionService';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Almacen')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'))
export class AlmacenService {
  constructor(
    private prisma: PrismaService,
    private validacionService: ValidacionService,
  ) { }

  async crearAlmacen(nombre: string, idTienda: string) {
    // Validar nombre
    const validarNombre = this.validacionService.validateNombre(nombre);
    if (!validarNombre) {
      throw new BadRequestException('El nombre del almacén no es válido');
    }

    // Antes de crear, valida que la tienda exista
    const tienda = await this.prisma.tienda.findUnique({
      where: { Id: idTienda },
    });
    if (!tienda) {
      throw new BadRequestException('La tienda asociada no existe');
    }

    // Validar que no exista ya un almacén para esta tienda
    const almacenesExistentes = await this.prisma.almacen.findMany({
      where: { Id_tienda: idTienda }
    });
    if (almacenesExistentes.length > 0) {
      throw new BadRequestException('Ya existe un almacén para esta tienda. Solo puedes tener uno.');
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

    // Validar nombre
    const validarNombre = this.validacionService.validateNombre(nombre);
    if (!validarNombre) {
      throw new BadRequestException('El nombre del almacén no es válido');
    }

    // Actualizamos el almacén
    return this.prisma.almacen.update({
      where: { Id: idAlmacen },
      data: { nombre },
    });
  }

  // Opcional: Eliminar almacén
  async eliminarMiAlmacen(idAlmacen: string, idTienda: string) {
    // Verificar pertenencia
    const almacen = await this.prisma.almacen.findFirst({
      where: {
        Id: idAlmacen,
        Id_tienda: idTienda,
      }
    });
    if (!almacen) {
      throw new BadRequestException('No tienes permisos para eliminar este almacén');
    }
    return this.prisma.almacen.delete({
      where: { Id: idAlmacen }
    });
  }
}