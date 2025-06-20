import { Module } from '@nestjs/common';
import { ValidacionModule } from 'src/components/validaciondatos/validacion.module';
import { ValidacionService } from 'src/components/validaciondatos/validacionService';
import { CloudinaryService } from 'src/service/cloudinary/cloudinary.service';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';

@Module({
    imports: [ValidacionModule, ProductosModule],
    controllers: [ProductosController],
    providers: [CloudinaryService, ValidacionService, ProductosService],
    
})
export class ProductosModule {}
