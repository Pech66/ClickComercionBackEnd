import { Injectable } from '@nestjs/common';
import { DtoProducto } from './dtos/dto.producto';
import { CloudinaryService } from 'src/service/cloudinary/cloudinary.service';
import { ValidacionService } from 'src/components/validaciondatos/validacionService';
import { PrismaService } from 'src/prisma/prisma.service';
import { DtoProductoKilo } from './dtos/dto.productoKilo';
import { DtoProductoActualizar } from './dtos/dto.editarproductos';

@Injectable()
export class ProductosService {
    constructor(
        private cloudinaryService: CloudinaryService,
        private prisma: PrismaService
    ){}

    async crearProducto(dtoCrearProducto:DtoProducto, file?: Express.Multer.File) {
        try {
            let fotoUrl: string | undefined;
            if(file){
                const resultado = await this.cloudinaryService.uploadFile(file);
                fotoUrl = resultado.secure_url;
            }

            if(!dtoCrearProducto.codigobarra){
                throw new Error('El producto ya esta registrado');     
            }

           
            const productoCreado = await this.prisma.producto.create({
              data: {
                nombre: dtoCrearProducto.nombre,
                descripcion: dtoCrearProducto.descripcion,
                codigobarra: dtoCrearProducto.codigobarra,
                precioventa: dtoCrearProducto.precioventa,
                preciodeproveedor: dtoCrearProducto.precioporveedor,
                fotoUrl,
              },
            });
            return productoCreado;
        }
        catch (error) {
            throw new Error(`Error al crear el producto: ${error.message}`);
        }
    }


    async crearProductosUnidad(dtoProductoKilo: DtoProductoKilo, file?: Express.Multer.File) {
        try {
            let fotoUrl: string | undefined;
            if(file){
                const resultado = await this.cloudinaryService.uploadFile(file);
                fotoUrl = resultado.secure_url;
            }

            if(!dtoProductoKilo.codigobarra){
                throw new Error('El producto ya esta registrado');     
            }
            
            const productoCreado = await this.prisma.producto.create({
              data: {
                nombre: dtoProductoKilo.nombre,
                descripcion: dtoProductoKilo.descripcion,
                codigobarra: dtoProductoKilo.codigobarra,
                preciokilo: dtoProductoKilo.precioKilo,
                preciodeproveedor: dtoProductoKilo.precioporveedor,
                fotoUrl,
              },
            });
            return productoCreado;
        }
        catch (error) {
            throw new Error(`Error al crear el producto: ${error.message}`);
        }
    }

    async editarProducto(dtoProductoActualizar: DtoProductoActualizar, id: number){

    }


}

