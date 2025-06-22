import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private readonly config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get('MAIL_HOST'),
      port: Number(this.config.get('MAIL_PORT')),
      secure: false, 
      auth: {
        user: this.config.get('MAIL_USER'),
        pass: this.config.get('MAIL_PASS'),
      },
    });
  }

  async envioVerificacion(email: string, codigo: string) {
    const html = this.cuerpoDelMensaje(codigo);
    const subject = 'Verificación de Cuenta';
    const text = `Tu código de verificación es: ${codigo}. Este código expirará en 15 minutos.`;
    
    try {
      await this.transporter.sendMail({
        from: this.config.get('MAIL_FROM'),
        to: email,
        subject,
        text,
        html,
      });
      this.logger.log(`Correo enviado a ${email}`);
    } catch (error) {
      this.logger.error(`Error al enviar correo a ${email}: ${error.message}`);
      throw error; // Re-lanzar el error para manejarlo en otro lugar si es necesario
    }
  }

  

    private cuerpoDelMensaje(codigo: string): string {
        return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Verificación de Cuenta</h1>
        <p>Tu código de verificación es:</p>
        <div style="background: #f3f4f6; padding: 10px; text-align: center; margin: 20px 0;">
          <h2 style="letter-spacing: 3px; color:rgb(3, 138, 95);">${codigo}</h2>
        </div>
        <p><small>Este código expirará en 2 minutos</small></p>
      </div>
    `;
    }
}

