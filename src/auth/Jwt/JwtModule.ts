import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwtStrategy';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ResendModule } from 'src/service/mailer/resend.module';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { ValidacionService } from 'src/components/validaciondatos/validacionService';
import { MailService } from 'src/service/mailer/mail/mail.service';
import { VerificationService } from 'src/service/mailer/verification.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '8h' },
      }),
    }),
    //PrismaModule,
    ResendModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    ValidacionService,
    MailService,
    VerificationService,
  ],
  exports: [JwtStrategy, PassportModule, JwtModule, VerificationService],
})
export class AuthModule {}
