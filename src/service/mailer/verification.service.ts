import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import { MailService } from './mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VerificationService {
  private readonly codigos = new Map<
    string,
    { codigo: string; expiracion: number; creado: number; intentos: number }
  >();

  constructor(
    private readonly mailService: MailService,
    private readonly prisma: PrismaService
  ) {}

  async enviarCodigoVerificacion(email: string): Promise<void> {
    const registro = this.codigos.get(email);
    if (registro && Date.now() < registro.expiracion) {
      const segundosRestantes = Math.ceil((registro.expiracion - Date.now()) / 1000);
      throw new Error(`Debes esperar ${segundosRestantes} segundos antes de solicitar otro código.`);
    }

    const codigo = randomInt(100000, 999999).toString();
    // Solo la fecha (sin hora) en la base de datos, ajustada a México
    const zonaHorariaMexico = 'America/Mexico_City';
    const fechaMexico = new Date(
      new Date().toLocaleString('en-US', { timeZone: zonaHorariaMexico })
    );
    

    // Expira en 2 minutos desde ahora
    const ahora = Date.now();
    const expiracion = ahora + 2 * 60 * 1000;

    this.codigos.set(email, {
      codigo,
      expiracion,
      creado: ahora,
      intentos: 3,
    });

    // Guardar solo la fecha en la base de datos
    await this.prisma.usuarios.update({
      where: { email },
      data: {
        codigoVerificacion: codigo,
        codigoVerificacionExp: fechaMexico,
      },
    });

    await this.mailService.envioVerificacion(email, codigo);
  }

  verificarCodigo(email: string, codigoIngresado: string): boolean {
    const registro = this.codigos.get(email);

    if (!registro) return false;

    // Si ya no quedan intentos, eliminar y rechazar
    if (registro.intentos <= 0) {
      this.codigos.delete(email);
      return false;
    }

    // Expiración
    if (Date.now() > registro.expiracion) {
      this.codigos.delete(email);
      return false;
    }

    // Verificación de código
    if (registro.codigo === codigoIngresado) {
      this.codigos.delete(email);
      return true;
    } else {
      registro.intentos--;
      // Si ya no quedan intentos
      if (registro.intentos <= 0) {
        this.codigos.delete(email);
      }
      return false;
    }
  }

    async reenviarCodigo(email: string): Promise<void> {
    // Verificar si el usuario ya está verificado
    const usuario = await this.prisma.usuarios.findUnique({
      where: { email },
      select: { verificado: true }
    });
  
    if (usuario?.verificado) {
      throw new Error('El usuario ya está verificado y no puede solicitar otro código.');
    }
  
    const anterior = this.codigos.get(email);
    if (anterior && Date.now() < anterior.expiracion) {
      const segundosRestantes = Math.ceil((anterior.expiracion - Date.now()) / 1000);
      throw new Error(`Debes esperar ${segundosRestantes} segundos antes de solicitar otro código.`);
    }
  
    const nuevoCodigo = randomInt(100000, 999999).toString();
    const zonaHorariaMexico = 'America/Mexico_City';
    const fechaMexico = new Date(
      new Date().toLocaleString('en-US', { timeZone: zonaHorariaMexico })
    );
  
    const ahora = Date.now();
    const nuevaExpiracion = ahora + 2 * 60 * 1000;
  
    this.codigos.set(email, {
      codigo: nuevoCodigo,
      expiracion: nuevaExpiracion,
      creado: ahora,
      intentos: 3,
    });
  
    await this.prisma.usuarios.update({
      where: { email },
      data: {
        codigoVerificacion: nuevoCodigo,
        codigoVerificacionExp: fechaMexico,
      },
    });
  
    await this.mailService.envioVerificacion(email, nuevoCodigo);
  }
}