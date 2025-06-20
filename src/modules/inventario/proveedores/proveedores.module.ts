import { Module } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { ProveedoresController } from './proveedores.controller';

@Module({
  providers: [ProveedoresService],
  controllers: [ProveedoresController]
})
export class ProveedoresModule {}
