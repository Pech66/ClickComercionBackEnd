import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
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
                nombre: dtoEditarUsuario.nombre,
                fotoUrl: fotoUrl,
                contrasena: dtoEditarUsuario.contrasena ? await bcrypt.hash(dtoEditarUsuario.contrasena, 10) : undefined,
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

}
