import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors() // <-- Activar cors  globalmente
  
  //Swagger
  const options = new DocumentBuilder()
    .setTitle('ClickComerce API')
    .setDescription('API for ClickComerce')
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('Perfil')
    .addTag('Tienda')
    .addTag('Almacen')
    .addTag('Productos')
    .addTag('Categoria')
    .addTag('Proveedores')
    .addTag('Compras')
    .addTag('Ventas')
    .addTag('Stock')
    .addTag('HistorialVentas')
    .addTag('Dashboard')
    .addTag('Administrador')
    .addBearerAuth({type: 'http', scheme: 'bearer', bearerFormat: 'jwt' },
      'access-token' 
    ) 
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  
  await app.useGlobalPipes(new ValidationPipe({transform: true}));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
