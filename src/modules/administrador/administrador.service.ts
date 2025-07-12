import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class AdministradorService {
  constructor(private prisma: PrismaService) {}

  async findAllAdmins() {
    return this.prisma.usuarios.findMany({
      where: { rol: 'SUPERADMIN' }, 
      include: { tienda: true }
    });
  }

  async findAdminById(id: string) {
    const admin = await this.prisma.usuarios.findUnique({
      where: { Id: id },
      include: { tienda: true }
    });
    if (!admin) throw new NotFoundException(`Usuario admin ${id} no encontrado`);
    return admin;
  }

  async activarAdmin(id: string) {
    return this.prisma.usuarios.update({
      where: { Id: id },
      data: { activo: true }
    });
  }

  async desactivarAdmin(id: string) {
    return this.prisma.usuarios.update({
      where: { Id: id },
      data: { activo: false }
    });
  }

  async eliminarAdmin(id: string) {
    return this.prisma.usuarios.delete({
      where: { Id: id }
    });
  }

  async obtenerTiendaDeAdmin(id: string) {
    const admin = await this.prisma.usuarios.findUnique({
      where: { Id: id },
      include: { tienda: true }
    });
    if (!admin) throw new NotFoundException(`Usuario admin ${id} no encontrado`);
    return admin.tienda;
  }
}