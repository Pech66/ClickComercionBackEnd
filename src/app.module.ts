import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriaModule } from './modules/inventario/categoria/categoria.module';
import { ProveedoresModule } from './modules/inventario/proveedores/proveedores.module';
import { DetallesVentasModule } from './modules/ventas/detalles_ventas/detalles_ventas.module';
import { VentasModule } from './modules/ventas/ventas/ventas.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TiendaController } from './modules/tienda/tienda.controller';
import { TiendaModule } from './modules/tienda/tienda.module';
import { TiendaService } from './modules/tienda/tienda.service';
import { AlmacenService } from './modules/almacen/almacen.service';
import { AlmacenModule } from './modules/almacen/almacen.module';
import { ProductosController } from './modules/productos/productos.controller';
import { ProductosService } from './modules/productos/productos.service';
import { ProductosModule } from './modules/productos/productos.module';
import { CloudinaryModule } from './service/cloudinary/cloudinary.module';
import { ValidacionModule } from './components/validaciondatos/validacion.module';
import { ComprasController } from './modules/compras/compras.controller';
import { ComprasModule } from './modules/compras/compras.module';
import { StockController } from './modules/inventario/stock/stock.controller';
import { StockService } from './modules/inventario/stock/stock.service';
import { StockModule } from './modules/inventario/stock/stock.module';
import { PerfilModule } from './modules/perfil/perfil.module';
import { AdministradorController } from './modules/administrador/administrador.controller';
import { AdministradorService } from './modules/administrador/administrador.service';
import { AdministradorModule } from './modules/administrador/administrador.module';
import { DashboardService } from './modules/dashboard/dashboard.service';
import { DashboardModule } from './modules/dashboard/dashboard.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env', 
    }),
    AuthModule,
    TiendaModule,
    AlmacenModule,
    ProductosModule,
    VentasModule,
    CloudinaryModule,
    CategoriaModule,
    ProveedoresModule,
    ValidacionModule,
    DetallesVentasModule,
    ComprasModule,
    StockModule,
    PerfilModule,
    AdministradorModule,
    DashboardModule,
  ],
  controllers: [AppController,TiendaController,ProductosController,ComprasController, StockController, AdministradorController,],
  providers: [AppService, ProductosService, TiendaService, AlmacenService, StockService, AdministradorService, DashboardService],
})
export class AppModule {}
