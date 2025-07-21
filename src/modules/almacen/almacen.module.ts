import { Module } from '@nestjs/common';
import { AlmacenController } from './almacen.controller';
import { AlmacenService } from './almacen.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ValidacionService } from 'src/components/validaciondatos/validacionService';
import { PerfilModule } from '../perfil/perfil.module';

@Module({
  imports: [PerfilModule],
  controllers: [AlmacenController],
  providers: [
    AlmacenService,
    PrismaService,
    ValidacionService,
  ],
})
export class AlmacenModule {}
