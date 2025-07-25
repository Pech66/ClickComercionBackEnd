import { BadRequestException, Body, Controller, Post, Get, Put, UploadedFile, UseGuards, UseInterceptors, Param, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/components/Jwt/jwtAuthGuard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/service/cloudinary/cloudinary.service';
import { ValidacionService } from 'src/components/validaciondatos/validacionService';
import { ProductosService } from './productos.service';
import { UsuarioActual } from 'src/components/decoradores/usuario.actual';
import { PrismaService } from 'src/prisma/prisma.service';
import { Roles } from 'src/components/roles/roles.decorator';
import { RolesGuard } from 'src/components/roles/roles.guard';
import { Rol } from 'src/components/roles/roles.enum';
import { DtoProductoGranel } from './dtos/dto.productoganel';
import { DtoEditarProducto } from './dtos/dto.editarproductoNormal';
import { DtoProductoNormal } from './dtos/dto.producto';
import { PerfilService } from '../perfil/perfil.service';
import { buffer } from 'stream/consumers';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Productos')
@Controller('Productos')
@ApiBearerAuth('access-token')
@Roles(Rol.ADMIN_TIENDA)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ProductosController {
  constructor(
    private cloudinaryService: CloudinaryService,
    private validacionService: ValidacionService,
    private productoService: ProductosService,
    private perfilService: PerfilService,
    private prisma: PrismaService,
  ) { }

  private async obtenerIdTienda(usuarioId: string): Promise<string> {
    const user = await this.prisma.usuarios.findUnique({
      where: { Id: usuarioId },
      select: { Id_tienda: true }
    });

    if (!user?.Id_tienda) {
      throw new BadRequestException('Debes crear tu tienda primero.');
    }

    return user.Id_tienda;
  }

  @Post('normal')
  @ApiOperation({ summary: 'Crear un producto normal' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nombre: { type: 'string', example: 'Laptop Dell XPS 13' },
        descripcion: { type: 'string', example: 'Laptop Dell XPS 13 con Intel i7...', nullable: true },
        codigobarra: { type: 'string', example: 'D4GH5J6K7L8M9N0', nullable: true },
        precioventa: { type: 'number', example: 1200.50 },
        preciodeproveedor: { type: 'number', example: 1000.00, nullable: true },
        Id_categoria: { type: 'string', example: 'e17ef0e6-b1a8-46cf-9f1f-2f75e69b3dcd', nullable: true, description: 'ID de la categoría (opcional)' },
        foto: {
          type: 'string',
          format: 'binary',
          description: 'Archivo de imagen del producto',
          nullable: true,
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('foto'))
  async crearProductoNormal(
    @UploadedFile() file: Express.Multer.File,
    @Body() dtoproductonormal: DtoProductoNormal,
    @UsuarioActual() usuario,
  ) {
    try {
      // Validar nombre obligatorio
      this.validacionService.validateNombre(dtoproductonormal.nombre);

      // Validar descripcion y codigobarra sólo si vienen
      if (dtoproductonormal.descripcion)
        this.validacionService.validateDescripcion(dtoproductonormal.descripcion);
      if (dtoproductonormal.codigobarra)
        this.validacionService.validateCodigoBarra(dtoproductonormal.codigobarra);

      const Id_tienda = await this.obtenerIdTienda(usuario.id);

      if (file) {
        this.validacionService.validateImageFormatoTamaño(file);
      }

      const almacen = await this.prisma.almacen.findFirst({
        where: { Id_tienda: Id_tienda },
      });
      if (!almacen) {
        throw new BadRequestException('No hay almacén registrado para tu tienda.');
      }
      dtoproductonormal.Id_almacen = almacen.Id;
      return await this.productoService.normal(dtoproductonormal, file);
    } catch (error) {
      throw new BadRequestException(error.message || 'Error al crear el producto normal.');
    }
  }

  @Post('granel')
  @ApiOperation({ summary: 'Crear un producto a granel' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nombre: { type: 'string', example: 'Azúcar' },
        descripcion: { type: 'string', example: 'Azúcar a granel, excelente calidad', nullable: true },
        codigobarra: { type: 'string', example: 'COD12345', nullable: true },
        precioventa: { type: 'number', example: 1200.50 },
        unidaddemedida: { type: 'string', example: 'kg' },
        preciodeproveedor: { type: 'number', example: 32.00, nullable: true },
        esgranel: { type: 'boolean', example: true, default: true },
        Id_categoria: { type: 'string', example: 'e17ef0e6-b1a8-46cf-9f1f-2f75e69b3dcd', nullable: true, description: 'ID de la categoría (opcional)' },
        foto: {
          type: 'string',
          format: 'binary',
          description: 'Archivo de imagen del producto',
          nullable: true,
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('foto'))
  async granel(
    @UploadedFile() file: Express.Multer.File,
    @Body() dtoproductogranel: DtoProductoGranel,
    @UsuarioActual() usuario,
  ) {
    try {
      // Validar nombre obligatorio
      this.validacionService.validateNombre(dtoproductogranel.nombre);

      // Validar descripcion y codigobarra sólo si vienen
      if (dtoproductogranel.descripcion)
        this.validacionService.validateDescripcion(dtoproductogranel.descripcion);
      if (dtoproductogranel.codigobarra)
        this.validacionService.validateCodigoBarra(dtoproductogranel.codigobarra);

      if (file) {
        this.validacionService.validateImageFormatoTamaño(file);
      }

      const user = await this.perfilService.obtenerUsuarioPorId(usuario.id);
      if (!user?.Id_tienda) {
        throw new BadRequestException('Debes crear una tienda primero.');
      }
      const almacen = await this.prisma.almacen.findFirst({
        where: { Id_tienda: user.Id_tienda },
      });
      if (!almacen) {
        throw new BadRequestException('No hay almacén registrado para tu tienda.');
      }
      dtoproductogranel.Id_almacen = almacen.Id;

      return await this.productoService.granel(dtoproductogranel, file);
    } catch (error) {
      throw new BadRequestException(error.message || 'Error al crear el producto a granel.');
    }
  }

  @Put('editar/:idProducto')
  @ApiOperation({ summary: 'Editar un producto' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({
    name: 'idProducto',
    description: 'ID del producto a editar',
    example: 'e17ef0e6-b1a8-46cf-9f1f-2f75e69b3dcd'
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nombre: { type: 'string', example: 'Laptop Dell XPS 13', nullable: true, description: 'Nombre del producto' },
        descripcion: { type: 'string', example: 'Laptop Dell XPS 13 con Intel i7...', nullable: true, description: 'Descripción del producto' },
        codigobarra: { type: 'string', example: 'D4GH5J6K7L8M9N0', nullable: true, description: 'Código de barras del producto' },
        precioventa: { type: 'number', example: 1200.50, nullable: true, description: 'Precio de venta' },
        preciodeproveedor: { type: 'number', example: 1000.00, nullable: true, description: 'Precio del proveedor' },
        Id_categoria: { type: 'string', example: 'e17ef0e6-b1a8-46cf-9f1f-2f75e69b3dcd', nullable: true, description: 'ID de la categoría (opcional)' },
        unidaddemedida: { type: 'string', example: 'kg', nullable: true, description: 'Unidad de medida (kg, gramos, litros, etc.)' },
        foto: { type: 'string', format: 'binary', description: 'Archivo de imagen del producto', nullable: true }
      }
    }
  })
  @UseInterceptors(FileInterceptor('foto'))
  async editarProducto(
    @Param('idProducto') idProducto: string,
    @Body() dtoEditarProducto: DtoEditarProducto,
    @UploadedFile() file: Express.Multer.File,
    @UsuarioActual() usuario,
  ) {
    try {
      const user = await this.perfilService.obtenerUsuarioPorId(usuario.id);
      if (!user?.Id_tienda) throw new BadRequestException('Debes crear una tienda primero.');

      const producto = await this.prisma.producto.findUnique({
        where: { Id: idProducto },
        include: { categoria: true, almacen: true }
      });
      if (!producto) throw new BadRequestException('El producto no existe.');
      if (!producto.Id_almacen) throw new BadRequestException('El producto no tiene un almacén asignado.');

      const almacen = await this.prisma.almacen.findUnique({ where: { Id: producto.Id_almacen } });
      if (!almacen || almacen.Id_tienda !== user.Id_tienda) {
        throw new BadRequestException('No tienes permiso para modificar este producto.');
      }

      let fotoUrl = producto.fotoUrl;
      if (file) {
        try {
          const resultado = await this.cloudinaryService.uploadFile(file);
          fotoUrl = resultado.secure_url;
        } catch (error) {
          throw new BadRequestException('Error al subir la imagen');
        }
      }

      // Validar nombre si viene
      if (dtoEditarProducto.nombre)
        this.validacionService.validateNombre(dtoEditarProducto.nombre);
      // Validar descripcion si viene
      if (dtoEditarProducto.descripcion)
        this.validacionService.validateDescripcion(dtoEditarProducto.descripcion);
      // Validar codigobarra si viene
      if (dtoEditarProducto.codigobarra)
        this.validacionService.validateCodigoBarra(dtoEditarProducto.codigobarra);

      return this.productoService.editarProducto(idProducto, dtoEditarProducto, fotoUrl ?? undefined);
    } catch (error) {
      throw new BadRequestException(error.message || 'Error al editar el producto.');
    }
  }

  @Get('por-categoria')
  @ApiOperation({ summary: 'Buscar productos por id de categoria' })
  async buscarPorCategoria(
    @UsuarioActual() usuario,
    @Query('categoria') categoria: string,
  ) {
    try {
      const user = await this.perfilService.obtenerUsuarioPorId(usuario.id);
      if (!user?.Id_tienda) throw new BadRequestException('Debes crear una tienda primero.');
      const almacenes = await this.prisma.almacen.findMany({ where: { Id_tienda: user.Id_tienda }, select: { Id: true } });
      if (!almacenes.length) throw new BadRequestException('No hay almacenes registrados para tu tienda.');
      const almacenIds = almacenes.map(a => a.Id);

      if (!categoria || categoria.trim() === '') {
        throw new BadRequestException('Debes indicar una categoría para filtrar.');
      }

      const productos = await this.prisma.producto.findMany({
        where: {
          Id_almacen: { in: almacenIds },
          Id_categoria: categoria,
        },
        include: { categoria: { select: { Id: true, nombre: true } } },
        orderBy: { nombre: 'asc' }
      });

      return { total: productos.length, productos };
    } catch (error) {
      throw new BadRequestException(error.message || 'Error al buscar productos por categoría.');
    }
  }

  @Get('buscar')
  @ApiOperation({ summary: 'Buscar productos por nombre o código de barras' })
  async buscarProductos(
    @UsuarioActual() usuario,
    @Query('buscar') buscar: string,
  ) {
    try {
      const user = await this.perfilService.obtenerUsuarioPorId(usuario.id);
      if (!user?.Id_tienda) throw new BadRequestException('Debes crear una tienda primero.');
      const almacenes = await this.prisma.almacen.findMany({ where: { Id_tienda: user.Id_tienda }, select: { Id: true } });
      if (!almacenes.length) throw new BadRequestException('No hay almacenes registrados para tu tienda.');
      const almacenIds = almacenes.map(a => a.Id);

      if (!buscar || buscar.trim() === '') {
        throw new BadRequestException('Debes escribir un texto para buscar.');
      }

      const productos = await this.prisma.producto.findMany({
        where: {
          Id_almacen: { in: almacenIds },
          OR: [
            { nombre: { contains: buscar } },
            { codigobarra: { contains: buscar } }
          ]
        },
        include: { categoria: { select: { Id: true, nombre: true } } },
        orderBy: { nombre: 'asc' }
      });

      return { total: productos.length, productos };
    } catch (error) {
      throw new BadRequestException(error.message || 'Error al buscar productos.');
    }
  }


  @Get('mis-productos')
  @ApiOperation({ summary: 'Obtener todos los productos de mi tienda' })
  async obtenerMisProductos(@UsuarioActual() usuario) {
    try {
      const user = await this.perfilService.obtenerUsuarioPorId(usuario.id);
      if (!user?.Id_tienda) {
        throw new BadRequestException('Debes crear una tienda primero.');
      }

      const almacenes = await this.prisma.almacen.findMany({ where: { Id_tienda: user.Id_tienda }, select: { Id: true } });
      if (!almacenes.length) {
        throw new BadRequestException('No hay almacenes registrados para tu tienda.');
      }
      const almacenIds = almacenes.map(a => a.Id);

      const productos = await this.prisma.producto.findMany({
        where: { Id_almacen: { in: almacenIds } },
        include: {
          categoria: { select: { Id: true, nombre: true } },
          almacen: { select: { Id: true, nombre: true } }
        },
        orderBy: { nombre: 'asc' }
      });

      return { total: productos.length, productos };
    } catch (error) {
      throw new BadRequestException(error.message || 'Error al obtener los productos de tu tienda.');
    }
  }



  @Get('obtener/:id')
  @ApiOperation({ summary: 'Obtener producto por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del producto',
    example: 'e17ef0e6-b1a8-46cf-9f1f-2f75e69b3dcd'
  })
  async obtenerProductoPorId(
    @Param('id') id: string,
    @UsuarioActual() usuario,
  ) {
    try {
      const user = await this.perfilService.obtenerUsuarioPorId(usuario.id);
      if (!user?.Id_tienda) {
        throw new BadRequestException('Debes crear una tienda primero.');
      }

      const producto = await this.prisma.producto.findUnique({
        where: { Id: id },
        include: {
          categoria: { select: { Id: true, nombre: true } },
          almacen: { select: { Id: true, nombre: true, Id_tienda: true } }
        }
      });

      if (!producto) {
        throw new BadRequestException('Producto no encontrado');
      }

      if (!producto.almacen || producto.almacen.Id_tienda !== user.Id_tienda) {
        throw new BadRequestException('No tienes permiso para ver este producto');
      }

      return { producto, tienda: user.Id_tienda };
    } catch (error) {
      throw new BadRequestException(error.message || 'Error al obtener el producto');
    }
  }


  @Delete('Eliminar/:idProducto')
  @ApiOperation({ summary: 'Eliminar un producto propio' })
  async eliminarProducto(
    @Param('idProducto') idProducto: string,
    @UsuarioActual() usuario,
  ) {
    try {
      const user = await this.perfilService.obtenerUsuarioPorId(usuario.id);
      if (!user?.Id_tienda) {
        throw new BadRequestException('Debes crear una tienda primero.');
      }
      const producto = await this.prisma.producto.findUnique({ where: { Id: idProducto } });
      if (!producto) {
        throw new BadRequestException('El producto no existe.');
      }
      if (!producto.Id_almacen) {
        throw new BadRequestException('El producto no tiene un almacén asignado.');
      }
      const almacen = await this.prisma.almacen.findUnique({ where: { Id: producto.Id_almacen } });
      if (!almacen || almacen.Id_tienda !== user.Id_tienda) {
        throw new BadRequestException('No tienes permiso para eliminar este producto.');
      }
      await this.prisma.producto.delete({ where: { Id: idProducto } });
      return { message: 'Producto eliminado correctamente' };
    } catch (error) {
      throw new BadRequestException(error.message || 'Error al eliminar el producto.');
    }
  }

}
