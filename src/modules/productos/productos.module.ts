import { Module } from '@nestjs/common';
import { ValidacionModule } from 'src/components/validaciondatos/validacion.module';
import { ValidacionService } from 'src/components/validaciondatos/validacionService';
import { CloudinaryService } from 'src/service/cloudinary/cloudinary.service';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [ValidacionModule, AuthModule],
    controllers: [ProductosController],
    providers: [CloudinaryService, ValidacionService, ProductosService, PrismaService],
    
})
export class ProductosModule {}
