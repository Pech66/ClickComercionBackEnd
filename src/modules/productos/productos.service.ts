import { BadRequestException, Injectable } from '@nestjs/common';
import { DtoProducto } from './dtos/dto.producto';
import { CloudinaryService } from 'src/service/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { DtoProductoActualizar } from './dtos/dto.editarproductos';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ProductosService {
    constructor(
        private cloudinaryService: CloudinaryService,
        private prisma: PrismaService,
        private authService: AuthService,
    ){}


    async crearProducto(dto: DtoProducto, file?: Express.Multer.File) {
    try {
        

            let fotoUrl: string | undefined;
            if (file) {
                const resultado = await this.cloudinaryService.uploadFile(file);
                fotoUrl = resultado.secure_url;
            }

            // Valida campos aquí si quieres, pero el Id_almacen YA viene del controller
            if (!dto.codigobarra) {
                throw new Error('El producto ya está registrado');
            }

            const productoCreado = await this.prisma.producto.create({
                data: {
                    nombre: dto.nombre,
                    descripcion: dto.descripcion,
                    codigobarra: dto.codigobarra,
                    precioventa: dto.precioventa,
                    preciodeproveedor: dto.precioporveedor,
                    preciokilo: dto.precioKilo,
                    unidaddemedida: dto.unidadMedida,
                    esgranel: dto.esgranel,
                    fotoUrl,
                    Id_almacen: dto.Id_almacen, 
                },
            });
            return productoCreado;
        } catch (error) {
            throw new Error(`Error al crear el producto: ${error.message}`);
        }
    }

    
    async modificarProducto(
      idProducto: string,
      dto: DtoProductoActualizar 
    ): Promise<any> {
      // Actualiza solo los campos enviados
      // ¡Puedes agregar validaciones adicionales aquí si quieres!
      return await this.prisma.producto.update({
        where: { Id: idProducto },
        data: {
          nombre: dto.nombre,
          descripcion: dto.descripcion,
          codigobarra: dto.codigobarra,
          precioventa: dto.precioventa,
          preciodeproveedor: dto.precioporveedor,
          preciokilo: dto.precioKilo,
          unidaddemedida: dto.unidadMedida,
          esgranel: dto.esgranel,
          fotoUrl: dto.fotoUrl 
        }
      });
    }

    async eliminarProducto(idProducto: string): Promise<{ message: string }> {
    await this.prisma.producto.delete({
      where: { Id: idProducto }
    });
    return { message: 'Producto eliminado correctamente' };
  }


    


}

