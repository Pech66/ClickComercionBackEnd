import {  BadRequestException, Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/service/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { DtoProductoGranel } from './dtos/dto.productoganel';
import { DtoProductoNormal } from './dtos/dto.producto';
import { DtoEditarProducto } from './dtos/dto.editarproductoNormal';



@Injectable()
export class ProductosService {
    constructor(
        private cloudinaryService: CloudinaryService,
        private prisma: PrismaService,
        private authService: AuthService,
    ){}


    async normal(dto: DtoProductoNormal, file?: Express.Multer.File) {
    try {
        

            let fotoUrl: string | undefined;
            if (file) {
                const resultado = await this.cloudinaryService.uploadFile(file);
                fotoUrl = resultado.secure_url;
            }

            if(dto.Id_categoria && dto.Id_categoria.trim() !== ""){
                // Validar si la categoría existe solo si envía ID
                const categoriaExiste = await this.prisma.categoria.findUnique({
                    where: { Id: dto.Id_categoria },
                });

                if (!categoriaExiste) {
                    throw new BadRequestException('La categoría seleccionada no existe.');
                }
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
                    esgranel: false,
                    fotoUrl,
                    Id_almacen: dto.Id_almacen, 
                    Id_categoria: dto.Id_categoria && dto.Id_categoria.trim() !== "" ? dto.Id_categoria : null, 
                },
            });
            return productoCreado;
        } catch (error) {
            throw new Error(`Error al crear el producto: ${error.message}`);
        }
    }

    async granel(dtoproductogranel: DtoProductoGranel, file?: Express.Multer.File) {
    try {
        

            let fotoUrl: string | undefined;
            if (file) {
                const resultado = await this.cloudinaryService.uploadFile(file);
                fotoUrl = resultado.secure_url;
            }
            if(dtoproductogranel.Id_categoria && dtoproductogranel.Id_categoria.trim() !== ""){
                // Validar si la categoría existe solo si envía ID
                const categoriaExiste = await this.prisma.categoria.findUnique({
                    where: { Id: dtoproductogranel.Id_categoria },
                });

                if (!categoriaExiste) {
                    throw new BadRequestException('La categoría seleccionada no existe.');
                }
            } 
               
            // Valida campos aquí si quieres, pero el Id_almacen YA viene del controller
            if (!dtoproductogranel.codigobarra) {
                throw new Error('El producto ya está registrado');
            }

            const productoCreado = await this.prisma.producto.create({
                data: {
                    nombre: dtoproductogranel.nombre,
                    descripcion: dtoproductogranel.descripcion,
                    codigobarra: dtoproductogranel.codigobarra,
                    preciokilo: dtoproductogranel.preciokilo,
                    unidaddemedida: dtoproductogranel.unidaddemedida,
                    preciodeproveedor: dtoproductogranel.preciodeproveedor,
                    esgranel: true,
                    fotoUrl,
                    Id_almacen: dtoproductogranel.Id_almacen, 
                    Id_categoria: dtoproductogranel.Id_categoria && dtoproductogranel.Id_categoria.trim() !== "" ? dtoproductogranel.Id_categoria : null,
                },
            });
            return productoCreado;
        } catch (error) {
            throw new Error(`Error al crear el producto: ${error.message}`);
        }
    }
    
    async editarProducto(
      idProducto: string,
      dtoeditarproducto: DtoEditarProducto,
      fotoUrl?: string
    ) {
      // Prepara el objeto de actualización SOLO con los campos enviados
      const data: any = {};
      
      if (dtoeditarproducto.nombre !== undefined) data.nombre = dtoeditarproducto.nombre;
      if (dtoeditarproducto.descripcion !== undefined) data.descripcion = dtoeditarproducto.descripcion;
      if (dtoeditarproducto.codigobarra !== undefined) data.codigobarra = dtoeditarproducto.codigobarra;
      if (dtoeditarproducto.precioventa !== undefined) data.precioventa = dtoeditarproducto.precioventa;
      if (dtoeditarproducto.preciodeproveedor !== undefined) data.preciodeproveedor = dtoeditarproducto.preciodeproveedor;
      if (dtoeditarproducto.preciokilo !== undefined) data.preciokilo = dtoeditarproducto.preciokilo;
      if (dtoeditarproducto.unidaddemedida !== undefined) data.unidaddemedida = dtoeditarproducto.unidaddemedida;
      if (dtoeditarproducto.esgranel !== undefined) data.esgranel = dtoeditarproducto.esgranel;
      if (dtoeditarproducto.Id_categoria !== undefined) {
        // Valida si existe la categoría antes de asignarla
        const categoria = await this.prisma.categoria.findUnique({ where: { Id: dtoeditarproducto.Id_categoria } });
        if (!categoria) throw new BadRequestException('La categoría seleccionada no existe.');
        data.Id_categoria = dtoeditarproducto.Id_categoria;
      }
      if (fotoUrl !== undefined) data.fotoUrl = fotoUrl;
  
      return await this.prisma.producto.update({
        where: { Id: idProducto },
        data,
      });
    }


    async eliminarProducto(idProducto: string): Promise<{ message: string }> {
    await this.prisma.producto.delete({
      where: { Id: idProducto }
    });
    return { message: 'Producto eliminado correctamente' };
  }


    


}

