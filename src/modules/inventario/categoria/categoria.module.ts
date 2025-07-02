import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { ValidacionModule } from 'src/components/validaciondatos/validacion.module';
import { PerfilModule } from 'src/modules/perfil/perfil.module';

@Module({
  imports: [PerfilModule, ValidacionModule],
  providers: [CategoriaService],
  controllers: [CategoriaController],
})
export class CategoriaModule {}
