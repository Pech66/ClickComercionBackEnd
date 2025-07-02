import { Module } from '@nestjs/common';
import { ComprasService } from './compras.service';

@Module({
  providers: [ComprasService],
  exports: [ComprasService],
})
export class ComprasModule {}
