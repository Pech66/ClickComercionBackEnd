import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ValidacionService } from 'src/components/validaciondatos/validacionService';

@Injectable()
export class AlmacenService {
  constructor(
    private prisma: PrismaService,
    private validacionService: ValidacionService,
  ) { }

  async crearAlmacen(nombre: string, idUsuario: string) {
    // Validar nombre
    const validarNombre = this.validacionService.validateNombre(nombre);
    if (!validarNombre) {
      throw new BadRequestException('El nombre del almacén no es válido');
    }

    // Obtener el usuario y validar que sea Admin de alguna tienda
    const usuario = await this.prisma.usuarios.findUnique({
      where: { Id: idUsuario },
      include: { tienda: true },
    });
    if (!usuario || usuario.rol !== 'ADMIN_TIENDA') {
      throw new ForbiddenException('Solo el AdminTienda puede crear almacenes.');
    }
    if (!usuario.Id_tienda || !usuario.tienda) {
      throw new BadRequestException('No tienes una tienda asociada.');
    }

    // Validar que no exista ya un almacén para esa tienda
    const almacenExistente = await this.prisma.almacen.findFirst({
      where: { Id_tienda: usuario.Id_tienda }
    });
    if (almacenExistente) {
      throw new BadRequestException('Ya existe un almacén para esta tienda. Solo puedes tener uno.');
    }

    // 4. Crear almacén vinculado a la tienda del usuario
    return this.prisma.almacen.create({
      data: {
        nombre,
        Id_tienda: usuario.Id_tienda,
      },
    });
  }

  // Devuelve el id y nombre del almacén de la tienda del usuario (ADMIN_TIENDA)
  async obtenerNombreAlmacen(idUsuario: string) {
    const usuario = await this.prisma.usuarios.findUnique({
      where: { Id: idUsuario },
    });
    if (!usuario || usuario.rol !== 'ADMIN_TIENDA') {
      throw new ForbiddenException('Solo el AdminTienda puede consultar el almacén.');
    }
    if (!usuario.Id_tienda) {
      throw new BadRequestException('No tienes una tienda asociada.');
    }
    const almacen = await this.prisma.almacen.findFirst({
      where: { Id_tienda: usuario.Id_tienda },
      select: { Id: true, nombre: true },
    });
    return { Id: almacen?.Id ?? null, nombre: almacen?.nombre ?? null };
  }

  // Elimina el almacén solo de la propia tienda del usuario
  async eliminarAlmacen(idUsuario: string): Promise<boolean> {
    const usuario = await this.prisma.usuarios.findUnique({
      where: { Id: idUsuario },
    });
    if (!usuario || usuario.rol !== 'ADMIN_TIENDA') {
      throw new ForbiddenException('Solo el AdminTienda puede eliminar su almacén.');
    }
    if (!usuario.Id_tienda) {
      throw new BadRequestException('No tienes una tienda asociada.');
    }

    // Buscar el almacén
    const almacen = await this.prisma.almacen.findFirst({
      where: { Id_tienda: usuario.Id_tienda },
    });
    if (!almacen) {
      return false;
    }
    // Eliminar el almacén
    await this.prisma.almacen.delete({
      where: { Id: almacen.Id },
    });
    return true;
  }
}