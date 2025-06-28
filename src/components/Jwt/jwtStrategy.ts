import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // Importa ConfigService

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService
  ) {
    const jwtSecreto = configService.get<string>('JWT_SECRET'); // Obtiene el secreto de JWT de forma segura
    if (!jwtSecreto) {
      throw new Error('JWT_SECRET no está definido en la configuración');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecreto ,
    });
  }
  
  async validate(payload: any) {
      return {
        id: payload.sub,
        email: payload.email,
        rol: payload.rol,
        verificado: payload.verificado,
        activo: payload.activo,
        tiendaId: payload.tiendaId,
      };
  }
  
}