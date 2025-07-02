import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1h' }, 
        })
    ],
    controllers: [StockController],
    providers: [StockService,PrismaService],
})
export class StockModule {}
