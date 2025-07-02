import { BadRequestException, Body, Controller, Post,Get,Put, UploadedFile, UseGuards, UseInterceptors, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
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

@Controller('Productos')
@ApiBearerAuth('access-token')
@Roles(Rol.ADMIN_TIENDA)
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductosController {
    constructor(
        private cloudinaryService: CloudinaryService,
        private validacionService : ValidacionService,
        private productoService: ProductosService,
        private perfilService: PerfilService,
        private prisma: PrismaService,
    ){}
    
    @Post('normal')
    @ApiOperation({ summary: 'Crear un producto normal' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          nombre: { type: 'string', example: 'Laptop Dell XPS 13' },
          descripcion: { type: 'string', example: 'Laptop Dell XPS 13 con Intel i7...' },
          codigobarra: { type: 'string', example: 'D4GH5J6K7L8M9N0' },
          precioventa: { type: 'number', example: 1200.50 },
          preciodeproveedor: { type: 'number', example: 1000.00, nullable: true },
          Id_categoria: { type: 'string', example: 'e17ef0e6-b1a8-46cf-9f1f-2f75e69b3dcd', nullable: true, description: 'ID de la categoría (opcional)' },
          foto: {
            type: 'string',
            format: 'binary',
            description: 'Archivo de imagen del producto',
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
        this.validacionService.validateDescripcion(dtoproductonormal.descripcion);
        this.validacionService.validateNombre(dtoproductonormal.nombre);
      
        const user = await this.perfilService.obtenerUsuarioPorId(usuario.id);

        if(file){
          this.validacionService.validateImageFormatoTamaño(file);
        }

        if (!user?.Id_tienda) {
          throw new BadRequestException('Debes crear una tienda primero.');
        }
        const almacen = await this.prisma.almacen.findFirst({
          where: { Id_tienda: user.Id_tienda },
        });
        if (!almacen) {
          throw new BadRequestException('No hay almacén registrado para tu tienda.');
        }
        dtoproductonormal.Id_almacen = almacen.Id;
      
        return await this.productoService.normal(dtoproductonormal, file);
      } catch (error) {
        throw new Error(`Error al crear el producto normal: ${error.message}`);
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
          descripcion: { type: 'string', example: 'Azúcar a granel, excelente calidad' },
          codigobarra: { type: 'string', example: 'COD12345' },
          preciokilo: { type: 'number', example: 35.00 },
          unidaddemedida: { type: 'string', example: 'kg' },
          preciodeproveedor: { type: 'number', example: 32.00, nullable: true },
          esgranel: { type: 'boolean', example: true, default: true },
          Id_categoria: { type: 'string', example: 'e17ef0e6-b1a8-46cf-9f1f-2f75e69b3dcd', nullable: true, description: 'ID de la categoría (opcional)' },
          foto: {
            type: 'string',
            format: 'binary',
            description: 'Archivo de imagen del producto',
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
        this.validacionService.validateDescripcion(dtoproductogranel.descripcion);
        this.validacionService.validateNombre(dtoproductogranel.nombre);
      
        if(file){
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
        throw new Error(`Error al crear el producto normal: ${error.message}`);
      }
    }

    @Get('ObtenerTodos')
    @ApiOperation({ summary: 'Obtener todos los productos de la tienda del usuario actual' })
    async obtenerTodosProductos(
      @UsuarioActual() usuario,
    ) {
      // Busca el usuario en la BD con su id
      const user = await this.perfilService.obtenerUsuarioPorId(usuario.id);
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

    @Put('EditarProducto')
    @ApiOperation({ summary: 'Modificar un producto normal' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          //Lo de un producto normal
          nombre: { type: 'string', example: 'Laptop Dell XPS 13', nullable: true },
          descripcion: { type: 'string', example: 'Laptop Dell XPS 13 con Intel i7...', nullable: true },
          codigobarra: { type: 'string', example: 'D4GH5J6K7L8M9N0', nullable: true },
          precioventa: { type: 'number', example: 1200.50, nullable: true, },
          preciodeproveedor: { type: 'number', example: 1000.00, nullable: true },
          Id_categoria: { type: 'string', example: 'e17ef0e6-b1a8-46cf-9f1f-2f75e69b3dcd', nullable: true, description: 'ID de la categoría (opcional)' },
          
          //Lo de un producto granel
          preciokilo: { type: 'number', example: 35.00, nullable: true },
          unidaddemedida: { type: 'string', example: 'kg', nullable: true },
          esgranel: { type: 'boolean', example: true, default: true},

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
    async editarProducto(
      @Param('idProducto') idProducto: string,
      @Body() dtoeditarproducto: DtoEditarProducto,
      @UploadedFile() file: Express.Multer.File,
      @UsuarioActual() usuario,
    ) {
      // Validaciones de seguridad (igual a tu código)
      const user = await this.perfilService.obtenerUsuarioPorId(usuario.id);
      if (!user?.Id_tienda) throw new BadRequestException('Debes crear una tienda primero.');
    
      const producto = await this.prisma.producto.findUnique({ where: { Id: idProducto } });
      if (!producto) throw new BadRequestException('El producto no existe.');
      if (!producto.Id_almacen) throw new BadRequestException('El producto no tiene un almacén asignado.');
    
      const almacen = await this.prisma.almacen.findUnique({ where: { Id: producto.Id_almacen } });
      if (!almacen || almacen.Id_tienda !== user.Id_tienda) {
        throw new BadRequestException('No tienes permiso para modificar este producto.');
      }
    
      let fotoUrl = producto.fotoUrl;
      if (file) {
        const resultado = await this.cloudinaryService.uploadFile(file);
        fotoUrl = resultado.secure_url;
      }
    
      // Solo actualiza campos de producto normal
      const productoActualizado = await this.prisma.producto.update({
        where: { Id: idProducto },
        data: {
          nombre: dtoeditarproducto.nombre,
          descripcion: dtoeditarproducto.descripcion,
          codigobarra: dtoeditarproducto.codigobarra,
          precioventa: dtoeditarproducto.precioventa,
          preciodeproveedor: dtoeditarproducto.preciodeproveedor,
          esgranel: false,
          fotoUrl: fotoUrl
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
      const user = await this.perfilService.obtenerUsuarioPorId(usuario.id);
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
