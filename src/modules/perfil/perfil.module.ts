import { Module } from '@nestjs/common';
import { PerfilService } from './perfil.service';
import { PerfilController } from './perfil.controller';
import { CloudinaryModule } from 'src/service/cloudinary/cloudinary.module';
import { ValidacionModule } from 'src/components/validaciondatos/validacion.module';

@Module({
  providers: [PerfilService],
  controllers: [PerfilController],
  imports: [CloudinaryModule, ValidacionModule],
  exports: [PerfilService],
})
export class PerfilModule {}
