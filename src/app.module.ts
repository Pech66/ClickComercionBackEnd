import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdministracionModule } from './modules/administracion/administracion.module';
import { DevolucionesModule } from './modules/devoluciones/devoluciones.module';
import { CategoriaModule } from './modules/inventario/categoria/categoria.module';
import { ProveedoresModule } from './modules/inventario/proveedores/proveedores.module';
import { DetallesVentasModule } from './modules/ventas/detalles_ventas/detalles_ventas.module';
import { HistorialService } from './modules/ventas/historial/historial.service';
import { HistorialController } from './modules/ventas/historial/historial.controller';
import { HistorialModule } from './modules/ventas/historial/historial.module';
import { VentasModule } from './modules/ventas/ventas/ventas.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TiendaController } from './modules/tienda/tienda.controller';
import { TiendaModule } from './modules/tienda/tienda.module';
import { TiendaService } from './modules/tienda/tienda.service';
import { AlmacenController } from './modules/almacen/almacen.controller';
import { AlmacenService } from './modules/almacen/almacen.service';
import { AlmacenModule } from './modules/almacen/almacen.module';
import { ProductosController } from './modules/productos/productos.controller';
import { ProductosService } from './modules/productos/productos.service';
import { ProductosModule } from './modules/productos/productos.module';
import { CloudinaryModule } from './service/cloudinary/cloudinary.module';
import { ValidacionModule } from './components/validaciondatos/validacion.module';
import { ValidacionService } from './components/validaciondatos/validacionService';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env', 
    }),

    AdministracionModule, VentasModule, VentasModule, CloudinaryModule,
    CategoriaModule, ProductosModule, ProveedoresModule, ValidacionModule,
    DetallesVentasModule, HistorialModule, AppModule, AuthModule, TiendaModule, AlmacenModule ],
  controllers: [AppController, ProductosController, HistorialController, TiendaController, AlmacenController],
  providers: [AppService, ProductosService, HistorialService, HistorialService, TiendaService, AlmacenService],
})
export class AppModule {}
