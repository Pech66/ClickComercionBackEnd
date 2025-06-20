import { Module } from '@nestjs/common';
import { DetallesVentasController } from './detalles_ventas.controller';
import { DetallesVentasService } from './detalles_ventas.service';

@Module({
  controllers: [DetallesVentasController],
  providers: [DetallesVentasService]
})
export class DetallesVentasModule {}
