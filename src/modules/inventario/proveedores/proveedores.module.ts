import { Module } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { ProveedoresController } from './proveedores.controller';
import { ValidacionModule } from 'src/components/validaciondatos/validacion.module';
import { PerfilModule } from 'src/modules/perfil/perfil.module';


@Module({
  providers: [ProveedoresService],
  controllers: [ProveedoresController, ],
  imports: [PerfilModule, ValidacionModule],
})
export class ProveedoresModule {}
