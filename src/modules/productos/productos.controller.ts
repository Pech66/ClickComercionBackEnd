import { BadRequestException, Body, Controller, Post,Get,Put, UploadedFile, UseGuards, UseInterceptors, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/Jwt/jwtAuthGuard';
import { DtoProducto } from './dtos/dto.producto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/service/cloudinary/cloudinary.service';
import { ValidacionService } from 'src/components/validaciondatos/validacionService';
import { ProductosService } from './productos.service';
import { UsuarioActual } from 'src/components/decoradores/usuario.actual';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { DtoProductoActualizar } from './dtos/dto.editarproductos';

@Controller('Productos')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class ProductosController {
    constructor(
        private cloudinaryService: CloudinaryService,
        private validacionService : ValidacionService,
        private productoService: ProductosService,
        private authService: AuthService,
        private prisma: PrismaService,
    ){}
    
    @Post('CrearProducton')
    @ApiOperation({ summary: 'Crear un nuevo producto' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          nombre: { type: 'string', example: 'Laptop Dell XPS 13' },
          descripcion: { type: 'string', example: 'Laptop Dell XPS 13 con Intel i7...' },
          codigobarra: { type: 'string', example: 'D4GH5J6K7L8M9N0' },
          precioventa: { type: 'number', example: 1200.50 },
          precioporveedor: { type: 'number', example: 1000.00 },
          precioKilo: { type: 'number', example: 35.00, nullable: true },
          unidadMedida: { type: 'string', example: 'kg', nullable: true },
          esgranel: { type: 'boolean', example: true, nullable: true },
          foto: {
            type: 'string',
            format: 'binary',
            description: 'Archivo de imagen del producto',
          }
        }
      }
    })
    @UseInterceptors(FileInterceptor('foto'))
    async crearProducto(
        @UploadedFile() file: Express.Multer.File,
        @Body() dtoCrearProducto: DtoProducto,
        @UsuarioActual() usuario,
      ) {
        try {
            this.validacionService.validateImageFormatoTamaño(file);
            this.validacionService.validateDescripcion(dtoCrearProducto.descripcion);
            this.validacionService.validateNombre(dtoCrearProducto.nombre);
            console.log('DTO:', dtoCrearProducto);

            const user = await this.authService.obtenerUsuarioPorId(usuario.id);
            if (!user?.Id_tienda) {
                throw new BadRequestException('Debes crear una tienda primero.');
            }
            const almacen = await this.prisma.almacen.findFirst({
                where: { Id_tienda: user.Id_tienda },
            });
            if (!almacen) {
                throw new BadRequestException('No hay almacén registrado para tu tienda.');
            }
          
            // Asigna SIEMPRE el almacén aquí
            dtoCrearProducto.Id_almacen = almacen.Id;
          
            return await this.productoService.crearProducto(dtoCrearProducto, file);
        } catch (error) {
            throw new Error(`Error al crear el producto: ${error.message}`);
        }
    }


    @Get('ObtenerTodos')
    @ApiOperation({ summary: 'Obtener todos los productos de la tienda del usuario actual' })
    async obtenerTodosProductos(
      @UsuarioActual() usuario,
    ) {
      // Busca el usuario en la BD con su id
      const user = await this.authService.obtenerUsuarioPorId(usuario.id);
      if (!user?.Id_tienda) {
        throw new BadRequestException('Debes crear una tienda primero.');
      }
      // Busca los almacenes de esa tienda (por si tienes más de uno)
      const almacenes = await this.prisma.almacen.findMany({
        where: { Id_tienda: user.Id_tienda },
        select: { Id: true }
      });
    
      if (!almacenes.length) {
        throw new BadRequestException('No hay almacenes registrados para tu tienda.');
      }
      // Obtén los Id de los almacenes
      const almacenIds = almacenes.map(a => a.Id);
    
      // Busca todos los productos que pertenezcan a esos almacenes
      const productos = await this.prisma.producto.findMany({
        where: { Id_almacen: { in: almacenIds } }
      });
    
      return productos;
    }

    @Put('Modificar/:idProducto')
    @ApiOperation({ summary: 'Modificar un producto propio' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          nombre: { type: 'string', example: 'Laptop Dell XPS 13' },
          descripcion: { type: 'string', example: 'Laptop Dell XPS 13 con Intel i7...' },
          codigobarra: { type: 'string', example: 'D4GH5J6K7L8M9N0' },
          precioventa: { type: 'number', example: 1200.50 },
          precioporveedor: { type: 'number', example: 1000.00 },
          precioKilo: { type: 'number', example: 35.00, nullable: true },
          unidadMedida: { type: 'string', example: 'kg', nullable: true },
          esgranel: { type: 'boolean', example: true, nullable: true },
          foto: {
            type: 'string',
            format: 'binary',
            description: 'Archivo de imagen del producto',
          }
        }
      }
    })
    @UseInterceptors(FileInterceptor('foto'))
    async modificarProducto(
      @Param('idProducto') idProducto: string,
      @Body() dto: DtoProductoActualizar, 
      @UploadedFile() file: Express.Multer.File,
      @UsuarioActual() usuario
    ) {
      const user = await this.authService.obtenerUsuarioPorId(usuario.id);
      if (!user?.Id_tienda) {
        throw new BadRequestException('Debes crear una tienda primero.');
      }
      const producto = await this.prisma.producto.findUnique({
        where: { Id: idProducto }
      });
      if (!producto) {
        throw new BadRequestException('El producto no existe.');
      }
      if(!producto.Id_almacen) {
        throw new BadRequestException('El producto no tiene un almacén asignado.');
      }
      const almacen = await this.prisma.almacen.findUnique({
        where: { Id: producto.Id_almacen }
      });
      if (!almacen || almacen.Id_tienda !== user.Id_tienda) {
        throw new BadRequestException('No tienes permiso para modificar este producto.');
      }
    
      // Si se subió nueva foto, actualízala
      let fotoUrl = producto.fotoUrl;
      if (file) {
        // Aquí asume que tienes un servicio para subir a cloudinary o local
        const resultado = await this.cloudinaryService.uploadFile(file);
        fotoUrl = resultado.secure_url;
      }
    
      const productoActualizado = await this.prisma.producto.update({
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
          fotoUrl: fotoUrl // Aquí ya queda la nueva o la anterior si no la cambió
        }
      });
      return productoActualizado;
    }


    @Delete('Eliminar/:idProducto')
    @ApiOperation({ summary: 'Eliminar un producto propio' })
    async eliminarProducto(
      @Param('idProducto') idProducto: string,
      @UsuarioActual() usuario,
    ) {
      const user = await this.authService.obtenerUsuarioPorId(usuario.id);
      if (!user?.Id_tienda) {
        throw new BadRequestException('Debes crear una tienda primero.');
      }
      // Busca el producto y verifica que pertenezca a su tienda
      const producto = await this.prisma.producto.findUnique({
        where: { Id: idProducto }
      });
      if (!producto) {
        throw new BadRequestException('El producto no existe.');
      }
      if(!producto.Id_almacen) {
        throw new BadRequestException('El producto no tiene un almacén asignado.');
      }
      // Valida que el producto pertenezca a un almacén de su tienda
      const almacen = await this.prisma.almacen.findUnique({
        where: { Id: producto.Id_almacen }
      });
      if (!almacen || almacen.Id_tienda !== user.Id_tienda) {
        throw new BadRequestException('No tienes permiso para eliminar este producto.');
      }
      // Elimina el producto
      await this.prisma.producto.delete({
        where: { Id: idProducto }
      });
      return { message: 'Producto eliminado correctamente' };
    }

}
