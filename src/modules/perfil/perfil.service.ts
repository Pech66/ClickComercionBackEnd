import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DtoEditarUsuario } from './dto/dto.editar.usuario';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/service/cloudinary/cloudinary.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PerfilService {
    constructor(
        private prisma: PrismaService,
        private cloudinaryService: CloudinaryService,

    ){}

    async obtenerDatosUsuario(id: string) {
     const usuario = await this.prisma.usuarios.findUnique({
       where: { Id: id },
       select: {
         Id: true,
         nombre: true,
         email: true,
         rol: true,
         Id_tienda: true,
         fotoUrl: true,

       },
     });
     if (!usuario) throw new UnauthorizedException('Usuario no encontrado');
     return usuario;
    }

    async obtenerUsuarioPorId(id: string) {
        return this.prisma.usuarios.findUnique({
          where: { Id: id },
          include: {
            tienda: true, // O elimina esto si no quieres traer la tienda
          },
        });
    }

    async editarUsuario(id: string, dtoEditarUsuario: DtoEditarUsuario, file?: Express.Multer.File) {
      try {
        let fotoUrl: string | undefined;
        if (file) {
            const resultado = await this.cloudinaryService.uploadFile(file);
            fotoUrl = resultado.secure_url;
        }
        

        const usuarioActualizado = await this.prisma.usuarios.update({
            data: {
                nombre: dtoEditarUsuario.nombre? dtoEditarUsuario.nombre : undefined,
                fotoUrl: fotoUrl? fotoUrl : undefined,
            },
            where: { Id: id },
            
        });
        return usuarioActualizado;
        
      } catch (error) {
        throw new BadRequestException("Error al editar el usuario: " + error.message);
      }
    }

    async eliminarCuenta(id: string) {
        try {
            const usuarioExistente = await this.prisma.usuarios.findUnique({
                where: { Id: id },
            });

            if (!usuarioExistente) {
                throw new UnauthorizedException("Usuario no encontrado");
            }

            await this.prisma.usuarios.delete({
                where: { Id: id },
            });

            return { message: "Usuario eliminado exitosamente" };
        } catch (error) {
            throw new UnauthorizedException("Error al eliminar el usuario: " + error.message);
        }
    }

    async cambiarContrasena(usuarioId: string, contrasenaActual: string, contrasenaNueva: string) {
    // 1. Buscar usuario
    const usuario = await this.prisma.usuarios.findUnique({
      where: { Id: usuarioId },
      select: { Id: true, contrasena: true, email: true }
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // 2. Verificar contraseña actual
    const contrasenaValida = await bcrypt.compare(contrasenaActual, usuario.contrasena);
    if (!contrasenaValida) {
      throw new BadRequestException('Contraseña actual incorrecta');
    }

    // 3. Validar que no sea la misma contraseña
    const esMismaContrasena = await bcrypt.compare(contrasenaNueva, usuario.contrasena);
    if (esMismaContrasena) {
      throw new BadRequestException('La nueva contraseña debe ser diferente a la actual');
    }

    // 4. Encriptar nueva contraseña
    const hashedPassword = await bcrypt.hash(contrasenaNueva, 10);

    // 5. Actualizar en BD
    await this.prisma.usuarios.update({
      where: { Id: usuarioId },
      data: { contrasena: hashedPassword }
    });

    return {
      message: 'Contraseña actualizada exitosamente',
      timestamp: new Date().toISOString()
    };
  }


  





}
