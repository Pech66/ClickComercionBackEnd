import { Module } from '@nestjs/common';
import { TiendaService } from './tienda.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ValidacionService } from 'src/components/validaciondatos/validacionService';
import { TiendaController } from './tienda.controller'; 
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [TiendaService,ValidacionService],
  controllers: [TiendaController]
})
export class TiendaModule {}
