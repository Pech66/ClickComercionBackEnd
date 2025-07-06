import {  BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CloudinaryService } from 'src/service/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/modules/auth/auth.service';
import { DtoProductoGranel } from './dtos/dto.productoganel';
import { DtoProductoNormal } from './dtos/dto.producto';
import { DtoEditarProducto } from './dtos/dto.editarproductoNormal';
import { ValidacionService } from 'src/components/validaciondatos/validacionService';
import { error } from 'console';



@Injectable()
export class ProductosService {
  constructor(
      private cloudinaryService: CloudinaryService,
      private prisma: PrismaService,
      private authService: AuthService,
      private validacionService: ValidacionService
  ){}


  async normal(dto: DtoProductoNormal, file?: Express.Multer.File) {
    try {
      let fotoUrl: string | undefined;

      if (file) {
          this.validacionService.validateImageFormatoTamaño(file);
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

      //validar campos 
      this.validacionService.validateNombre(dto.nombre);
      this.validacionService.validateDescripcion(dto.descripcion);
      this.validacionService.validateCodigoBarra(dto.codigobarra);
      this.validacionService.validatePrecio(dto.precioventa);
      if (dto.precioporveedor !== undefined && dto.precioporveedor !== null) {
          this.validacionService.validatePrecio(dto.precioporveedor);
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
          this.validacionService.validateImageFormatoTamaño(file);
          const resultado = await this.cloudinaryService.uploadFile(file);
          fotoUrl = resultado.secure_url;
      }

      if(dtoproductogranel.Id_categoria && dtoproductogranel.Id_categoria.trim() !== ""){
          // Validar si la categoría existe solo si envía ID
          const categoriaExiste = await this.prisma.categoria.findUnique({
              where: { Id: dtoproductogranel.Id_categoria },
          })
          if (!categoriaExiste) {
              throw new BadRequestException('La categoría seleccionada no existe.');
          }
      } 
               
      // Valida campos aquí si quieres, pero el Id_almacen YA viene del controller
      if (!dtoproductogranel.codigobarra) {
          throw new Error('El producto ya está registrado');
      }

      //validacion
      this.validacionService.validateNombre(dtoproductogranel.nombre);
      this.validacionService.validateDescripcion(dtoproductogranel.descripcion);
      this.validacionService.validateCodigoBarra(dtoproductogranel.codigobarra);
      this.validacionService.validatePrecio(dtoproductogranel.preciokilo);
      if (dtoproductogranel.preciodeproveedor !== undefined && dtoproductogranel.preciodeproveedor !== null) {
          this.validacionService.validatePrecio(dtoproductogranel.preciodeproveedor);
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
  
  

  async editarProducto(id: string, dto: DtoEditarProducto, fotoUrl?: string) {
  const dataUpdate: any = {};

  // Validación y asignación de categoría (única vez, limpio falsy y string vacío)
  if (dto.Id_categoria !== undefined) {
    const idCat = dto.Id_categoria?.trim?.() || null;
    if (!idCat) {
      // Si columna permite null:
      dataUpdate.Id_categoria = null;
    } else {
      const categoriaExiste = await this.prisma.categoria.findUnique({
        where: { Id: idCat }
      });
      if (!categoriaExiste) {
        throw new BadRequestException('La categoría seleccionada no existe.');
      }
      dataUpdate.Id_categoria = idCat;
    }
  }


  if (dto.nombre !== undefined && dto.nombre !== "") dataUpdate.nombre = dto.nombre;
  if (dto.descripcion !== undefined && dto.descripcion !== "") dataUpdate.descripcion = dto.descripcion;
  if (dto.codigobarra !== undefined && dto.codigobarra !== "") dataUpdate.codigobarra = dto.codigobarra;
  
  if (dto.precioventa !== undefined && dto.precioventa !== 0) dataUpdate.precioventa = dto.precioventa;
  if (dto.preciodeproveedor !== undefined && dto.preciodeproveedor !== 0) dataUpdate.preciodeproveedor = dto.preciodeproveedor;
  if (dto.preciokilo !== undefined && dto.preciokilo !== 0) dataUpdate.preciokilo = dto.preciokilo;
  
  if (dto.unidaddemedida !== undefined && dto.unidaddemedida !== "") dataUpdate.unidaddemedida = dto.unidaddemedida;
  if (dto.esgranel !== undefined) dataUpdate.esgranel = dto.esgranel;
  if (fotoUrl !== undefined) dataUpdate.fotoUrl = fotoUrl;

  const producto = await this.prisma.producto.findUnique({ where: { Id: id } });
  if (!producto) throw new BadRequestException('El producto no existe.');
  if (dto.esgranel !== undefined && dto.esgranel !== producto.esgranel) {
    if (dto.esgranel) dataUpdate.precioventa = null;
    else {
      dataUpdate.preciokilo = null;
      dataUpdate.unidaddemedida = null;
    }
  }

  // Actualiza en la base de datos
  return await this.prisma.producto.update({
    where: { Id: id },
    data: dataUpdate
  });
}


  async obtenerProductoPorId(idProducto: string, idTienda: string) {
        try {
          // 1. Buscar el producto con todas sus relaciones
          const producto = await this.prisma.producto.findUnique({
            where: { Id: idProducto },
            include: {
              categoria: {
                select: { 
                  Id: true, 
                  nombre: true,
                  descripcion: true 
                }
              },
              almacen: {
                select: { 
                  Id: true, 
                  nombre: true, 
                  Id_tienda: true,
                }
              }
            }
          });

             // 2. Verificar que el producto existe
          if (!producto) {
            throw new BadRequestException('Producto no encontrado');
          }

             // 3. Verificar que el producto pertenece a la tienda del usuario
          if (!producto.almacen || producto.almacen.Id_tienda !== idTienda) {
            throw new BadRequestException('No tienes permiso para ver este producto');
          }

             // 4. Formatear la respuesta
          return {
            Id: producto.Id,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            codigobarra: producto.codigobarra,
            fotoUrl: producto.fotoUrl,
            precioventa: producto.precioventa,
            preciodeproveedor: producto.preciodeproveedor,
            preciokilo: producto.preciokilo,
            unidaddemedida: producto.unidaddemedida,
            esgranel: producto.esgranel,
            categoria: producto.categoria ? {
              Id: producto.categoria.Id,
              nombre: producto.categoria.nombre,
            } : null,
          };

        } catch (error) {
          if (error instanceof BadRequestException) {
            throw error;
          }
          throw new Error(`Error al obtener el producto: ${error.message}`);
        }
    }


}

