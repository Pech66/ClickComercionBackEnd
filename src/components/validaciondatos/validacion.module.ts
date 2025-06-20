import { Module } from '@nestjs/common';
import { ValidacionService } from './validacionService';


@Module({
  providers: [ValidacionService],
  exports: [ValidacionService], 
})
export class ValidacionModule {}