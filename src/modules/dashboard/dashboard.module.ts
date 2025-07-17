import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TiendaModule } from '../tienda/tienda.module';
import { PerfilModule } from '../perfil/perfil.module';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService, PrismaService],
  imports: [TiendaModule, PerfilModule],
})
export class DashboardModule {}