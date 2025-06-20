import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/Jwt/jwtAuthGuard';
import { DtoProducto } from './dtos/dto.producto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/service/cloudinary/cloudinary.service';
import { ValidacionService } from 'src/components/validaciondatos/validacionService';
import { ProductosService } from './productos.service';

@Controller('Productos')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class ProductosController {
    constructor(
        private cloudinaryService: CloudinaryService,
        private validacionService : ValidacionService,
        private productoService: ProductosService,
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
        @Body() dtoCrearProducto: DtoProducto){
        try {
            // Validar el formato y tamaño de la imagen
            this.validacionService.validateImageFormatoTamaño(file);
            this.validacionService.validateDescripcion(dtoCrearProducto.descripcion);
            this.validacionService.validateNombre(dtoCrearProducto.nombre);
            

            return await this.productoService.crearProducto(dtoCrearProducto, file);

        } catch (error) {
            throw new Error(`Error al crear el producto: ${error.message}`);
        }
    }

    @Post('CrearProductoKilo')
    @ApiOperation({ summary: 'Crear un nuevo producto a granel' })
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
          foto: {
            type: 'string',
            format: 'binary',
            description: 'Archivo de imagen del producto',
          }
        }
      }
    })
    @UseInterceptors(FileInterceptor('foto'))
    async crearProductosUnidad(
        @UploadedFile() file: Express.Multer.File,
        @Body() dtoCrearProducto: DtoProducto){
        try {
            // Validar el formato y tamaño de la imagen
            this.validacionService.validateImageFormatoTamaño(file);
            this.validacionService.validateDescripcion(dtoCrearProducto.descripcion);
            this.validacionService.validateNombre(dtoCrearProducto.nombre);
            

            const productoImagen = await this.cloudinaryService.uploadFile(file);
            const productoCreado = {
                ...dtoCrearProducto,
                fotoUrl: productoImagen.secure_url,
            };

            return productoCreado;

        } catch (error) {
            throw new Error(`Error al crear el producto: ${error.message}`);
        }
    }

}
