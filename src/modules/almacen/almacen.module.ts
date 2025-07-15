import { Module } from '@nestjs/common';
import { AlmacenController } from './almacen.controller';
import { AlmacenService } from './almacen.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ValidacionService } from 'src/components/validaciondatos/validacionService';

@Module({
  imports: [],
  controllers: [AlmacenController],
  providers: [
    AlmacenService,
    PrismaService,
    ValidacionService,
  ],
})
export class AlmacenModule {}
