import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CloudinaryService } from 'src/service/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { DtoProductoGranel } from './dtos/dto.productoganel';
import { DtoProductoNormal } from './dtos/dto.producto';
import { ValidacionService } from 'src/components/validaciondatos/validacionService';
import { DtoEditarProductoGranel } from './dtos/DtoEditarProductoGranel';
import { DtoEditarProductoNormal } from './dtos/dto.editarproductoNormal';
function isValidNumberField(val: unknown): val is number {
  if (val === "") return false;
  if (val === undefined || val === null) return false;
  if (typeof val === "string") return !isNaN(Number(val));
  if (typeof val === "number") return true;
  return false;
}

@Injectable()
export class ProductosService {
  constructor(
    private cloudinaryService: CloudinaryService,
    private prisma: PrismaService,
    private validacionService: ValidacionService
  ) { }


  async normal(dto: DtoProductoNormal, file?: Express.Multer.File) {
    try {
      let fotoUrl: string | undefined;
      if (file) {
        this.validacionService.validateImageFormatoTamaño(file);
        const resultado = await this.cloudinaryService.uploadFile(file);
        fotoUrl = resultado.secure_url;
      }

      if (dto.Id_categoria && dto.Id_categoria.trim() !== "") {
        const categoriaExiste = await this.prisma.categoria.findUnique({
          where: { Id: dto.Id_categoria },
        });
        if (!categoriaExiste) {
          throw new BadRequestException('La categoría seleccionada no existe.');
        }
      }



      // Validar duplicidad solo si hay codigobarra
      if (dto.codigobarra) {
        const productoExistente = await this.prisma.producto.findFirst({
          where: {
            codigobarra: dto.codigobarra,
            Id_almacen: dto.Id_almacen,
          }
        });
        if (productoExistente) {
          throw new BadRequestException('El producto ya está registrado en este almacén.');
        }
      }

      this.validacionService.validateNombre(dto.nombre);
      this.validacionService.validateDescripcion(dto.descripcion);
      this.validacionService.validatePrecio(dto.precioventa);
      if (dto.preciodeproveedor !== undefined && dto.preciodeproveedor !== null) {
        this.validacionService.validatePrecio(dto.preciodeproveedor);
      }

      const productoCreado = await this.prisma.producto.create({
        data: {
          nombre: dto.nombre,
          descripcion: dto.descripcion,
          codigobarra: dto.codigobarra, // Será null si venía vacío
          precioventa: dto.precioventa,
          preciodeproveedor: dto.preciodeproveedor,
          esgranel: false,
          fotoUrl,
          Id_almacen: dto.Id_almacen,
          Id_categoria: dto.Id_categoria && dto.Id_categoria.trim() !== "" ? dto.Id_categoria : null,
        },
      });
      console.log('Producto creado:', productoCreado);
      return productoCreado;
    } catch (error) {
      throw new BadRequestException(error.message || 'Error al crear el producto.');
    }
  }

  async granel(dto: DtoProductoGranel, file?: Express.Multer.File) {
    try {
      let fotoUrl: string | undefined;
      if (file) {
        this.validacionService.validateImageFormatoTamaño(file);
        const resultado = await this.cloudinaryService.uploadFile(file);
        fotoUrl = resultado.secure_url;
      }

      if (dto.Id_categoria && dto.Id_categoria.trim() !== "") {
        const categoriaExiste = await this.prisma.categoria.findUnique({
          where: { Id: dto.Id_categoria },
        });
        if (!categoriaExiste) {
          throw new BadRequestException('La categoría seleccionada no existe.');
        }
      }

      // Limpia codigobarra vacío
      if (!dto.codigobarra || dto.codigobarra.trim() === '') {
        dto.codigobarra = undefined;
      }

      // Validar duplicidad solo si hay codigobarra
      if (dto.codigobarra) {
        const productoExistente = await this.prisma.producto.findFirst({
          where: {
            codigobarra: dto.codigobarra,
            Id_almacen: dto.Id_almacen,
          }
        });
        if (productoExistente) {
          throw new BadRequestException('El producto ya está registrado en este almacén.');
        }
      }

      this.validacionService.validateNombre(dto.nombre);
      this.validacionService.validateDescripcion(dto.descripcion);
      this.validacionService.validatePrecio(dto.precioventa);

      if (dto.preciodeproveedor !== undefined && dto.preciodeproveedor !== null) {
        this.validacionService.validatePrecio(dto.preciodeproveedor);
      }

      const productoCreado = await this.prisma.producto.create({
        data: {
          nombre: dto.nombre,
          descripcion: dto.descripcion,
          codigobarra: dto.codigobarra, // Será null si venía vacío
          precioventa: dto.precioventa,
          unidaddemedida: dto.unidaddemedida,
          preciodeproveedor: dto.preciodeproveedor,
          esgranel: true,
          fotoUrl,
          Id_almacen: dto.Id_almacen,
          Id_categoria: dto.Id_categoria && dto.Id_categoria.trim() !== "" ? dto.Id_categoria : null,
          preciokilo: null
        },
      });

      return productoCreado;
    } catch (error) {
      throw new BadRequestException(error.message || 'Error al crear el producto.');
    }
  }

  async editarProductoNormal(id: string, dto: DtoEditarProductoNormal, fotoUrl?: string) {
    const producto = await this.prisma.producto.findUnique({
      where: { Id: id },
      include: { almacen: true }
    });
    if (!producto) throw new BadRequestException('El producto no existe.');
    if (!producto.almacen) throw new BadRequestException('El producto no tiene un almacén asignado.');

    const dataUpdate: any = {};

    if (dto.nombre) dataUpdate.nombre = dto.nombre;
    if (dto.descripcion) dataUpdate.descripcion = dto.descripcion;
    if (dto.codigobarra !== undefined) dataUpdate.codigobarra = dto.codigobarra?.trim() || null;
    if (dto.precioventa !== undefined) dataUpdate.precioventa = Number(dto.precioventa);
    if (dto.preciodeproveedor !== undefined) dataUpdate.preciodeproveedor = Number(dto.preciodeproveedor);

    if (dto.Id_categoria !== undefined) {
      const idCat = dto.Id_categoria?.trim?.() || null;
      if (!idCat) {
        dataUpdate.Id_categoria = null;
      } else {
        const categoriaExiste = await this.prisma.categoria.findUnique({ where: { Id: idCat } });
        if (!categoriaExiste) throw new BadRequestException('La categoría seleccionada no existe.');
        dataUpdate.Id_categoria = idCat;
      }
    }

    if (fotoUrl !== undefined) dataUpdate.fotoUrl = fotoUrl;

    dataUpdate.unidaddemedida = null;
    dataUpdate.esgranel = false;
    dataUpdate.preciokilo = null;

    return await this.prisma.producto.update({
      where: { Id: id },
      data: dataUpdate
    });
  }

  async editarProductoGranel(id: string, dto: DtoEditarProductoGranel, fotoUrl?: string) {
    const producto = await this.prisma.producto.findUnique({
      where: { Id: id },
      include: { almacen: true }
    });
    if (!producto) throw new BadRequestException('El producto no existe.');
    if (!producto.almacen) throw new BadRequestException('El producto no tiene un almacén asignado.');

    const dataUpdate: any = {};

    if (dto.nombre) dataUpdate.nombre = dto.nombre;
    if (dto.descripcion) dataUpdate.descripcion = dto.descripcion;
    if (dto.codigobarra !== undefined) dataUpdate.codigobarra = dto.codigobarra?.trim() || null;
    if (dto.precioventa !== undefined) dataUpdate.precioventa = Number(dto.precioventa);

    if (dto.Id_categoria !== undefined) {
      const idCat = dto.Id_categoria?.trim?.() || null;
      if (!idCat) {
        dataUpdate.Id_categoria = null;
      } else {
        const categoriaExiste = await this.prisma.categoria.findUnique({ where: { Id: idCat } });
        if (!categoriaExiste) throw new BadRequestException('La categoría seleccionada no existe.');
        dataUpdate.Id_categoria = idCat;
      }
    }

    if (fotoUrl !== undefined) dataUpdate.fotoUrl = fotoUrl;

    dataUpdate.unidaddemedida = dto.unidaddemedida || null;
    dataUpdate.esgranel = true;
    dataUpdate.preciodeproveedor = null;
    dataUpdate.preciokilo = null;

    return await this.prisma.producto.update({
      where: { Id: id },
      data: dataUpdate
    });
  }


  // Obtener producto por ID (ya cumple multi-inquilino)
  async obtenerProductoPorId(idProducto: string, idTienda: string) {
    try {
      const producto = await this.prisma.producto.findUnique({
        where: { Id: idProducto },
        include: {
          categoria: {
            select: { Id: true, nombre: true, descripcion: true }
          },
          almacen: {
            select: { Id: true, nombre: true, Id_tienda: true }
          }
        }
      });

      if (!producto) {
        throw new BadRequestException('Producto no encontrado');
      }
      if (!producto.almacen || producto.almacen.Id_tienda !== idTienda) {
        throw new BadRequestException('No tienes permiso para ver este producto');
      }

      return {
        Id: producto.Id,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        codigobarra: producto.codigobarra,
        fotoUrl: producto.fotoUrl,
        precioventa: producto.precioventa,
        preciodeproveedor: producto.preciodeproveedor,
        unidaddemedida: producto.unidaddemedida,
        esgranel: producto.esgranel,
        categoria: producto.categoria ? {
          Id: producto.categoria.Id,
          nombre: producto.categoria.nombre,
        } : null,
      };

    } catch (error) {
      throw new BadRequestException(error.message || 'Error al obtener el producto');
    }
  }

  // Eliminar producto, verificando pertenencia (opcional)
  async eliminarProducto(idProducto: string, idTienda: string) {
    // Buscar el producto y validar existencia y pertenencia
    const producto = await this.prisma.producto.findUnique({
      where: { Id: idProducto },
      include: { almacen: true }
    });
    if (!producto) throw new BadRequestException('El producto no existe.');
    if (!producto.almacen || producto.almacen.Id_tienda !== idTienda) {
      throw new BadRequestException('No tienes permiso para eliminar este producto.');
    }
    await this.prisma.producto.delete({ where: { Id: idProducto } });
    return { message: 'Producto eliminado correctamente' };
  }



  
}