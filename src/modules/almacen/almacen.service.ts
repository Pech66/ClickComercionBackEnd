import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ValidacionService } from 'src/components/validaciondatos/validacionService';

@Injectable()
export class AlmacenService {
  constructor(
    private prisma: PrismaService,
    private validacionService: ValidacionService,
  ) {}

  async crearAlmacen(nombre: string, idTienda: string, idUsuario: string) {
    // Validar nombre
    const validarNombre = this.validacionService.validateNombre(nombre);
    if (!validarNombre) {
      throw new BadRequestException('El nombre del almacén no es válido');
    }

    // Validar que la tienda exista y pertenezca al usuario
    const tienda = await this.prisma.tienda.findFirst({
      where: {
        Id: idTienda,
        usuarios: {
          some: {
            Id: idUsuario,
            rol: 'ADMIN_TIENDA'
          }
        }
      },
    });
    if (!tienda) {
      throw new BadRequestException('La tienda asociada no existe o no tienes permisos.');
    }

    // Validar que no exista ya un almacén para esta tienda
    const almacenesExistentes = await this.prisma.almacen.findMany({
      where: { Id_tienda: idTienda }
    });
    if (almacenesExistentes.length > 0) {
      throw new BadRequestException('Ya existe un almacén para esta tienda. Solo puedes tener uno.');
    }

    // Crear almacén
    return this.prisma.almacen.create({
      data: {
        nombre,
        Id_tienda: idTienda,
      },
    });
  }
}