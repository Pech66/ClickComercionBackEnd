import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryProvider, CloudinaryService],
})

// Este es el módulo de Cloudinary que se encarga de la configuración y la inyección de dependencias para el servicio de Cloudinary.
export class CloudinaryModule {}
