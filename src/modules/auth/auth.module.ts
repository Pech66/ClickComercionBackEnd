import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../../components/Jwt/jwtStrategy';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ValidacionService } from 'src/components/validaciondatos/validacionService';
import { ResendModule } from 'src/service/mailer/resend.module';
import { MailService } from 'src/service/mailer/mail/mail.service';
import { VerificationService } from 'src/service/mailer/verification.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CloudinaryModule } from 'src/service/cloudinary/cloudinary.module';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRES_IN') || '8h' },
      }),
    }),
    PrismaModule,
    ResendModule,
    CloudinaryModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    ValidacionService,
    MailService,
    VerificationService,
    AuthService,
  ],
  controllers: [AuthController],
  exports: [JwtModule, JwtStrategy, PassportModule, VerificationService,AuthService ],
})
export class AuthModule {}
