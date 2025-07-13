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
      <div style="font-family: Arial, sans-serif; max-width: 420px; margin: 40px auto; background: linear-gradient(135deg, #ede9fe 0%, #f3f4f6 100%); border-radius: 20px; box-shadow: 0 8px 24px rgba(143, 135, 241, 0.13); padding: 0;">
        <div style="background: linear-gradient(135deg, #8F87F1 75%, #c4b5fd 100%); border-top-left-radius: 20px; border-top-right-radius: 20px; padding: 36px 0 20px 0; text-align: center;">
          <h1 style="color: #fff; font-size: 2em; font-weight: 700; margin: 0;">Verificación de Cuenta</h1>
          <p style="color: #ede9fe; font-size: 1.08em; margin: 4px 0 0 0;">ClickComercio</p>
        </div>
        <div style="padding: 28px 32px 18px 32px; text-align: center;">
          <p style="font-size: 1.13em; color: #222; margin-bottom: 18px; margin-top: 4px;">Introduce este código para verificar tu cuenta:</p>
          <div style="display: inline-block; background: #fff; border: 2.5px dashed #8F87F1; padding: 18px 38px; border-radius: 14px; box-shadow: 0 2px 10px rgba(143, 135, 241, 0.12); margin: 0 auto 18px auto;">
            <span style="font-size: 2.1em; letter-spacing: 7px; color: #8F87F1; font-weight: bold; font-family: monospace;">${codigo}</span>
          </div>
          <div style="margin: 18px 0 0 0; padding: 13px 0;">
            <span style="background: #eceffe; color: #8F87F1; border-radius: 8px; font-size: 0.99em; padding: 8px 14px; display: inline-block;">
              Este código vence en 2 minutos
            </span>
          </div>
        </div>
        <div style="padding: 0 0 18px 0;">
          <p style="text-align: center; color: #a3a3a3; font-size: 0.94em; margin: 18px 0 0 0;">
            ¿No fuiste tú? Ignora este correo.<br>
            &copy; ${new Date().getFullYear()} ClickComercio
          </p>
        </div>
      </div>
    `;


    }

    async enviarCodigoRecuperacion(email: string, codigo: string) {
      const html = this.cuerpoMensajeRecuperacion(codigo);
      const subject = 'Recuperación de Contraseña';
      const text = `Tu código de recuperación es: ${codigo}. Este código expirará en 15 minutos.`;
      
      try {
        await this.transporter.sendMail({
          from: this.config.get('MAIL_FROM'),
          to: email,
          subject,
          text,
          html,
        });
        this.logger.log(`Código de recuperación enviado a ${email}`);
      } catch (error) {
        this.logger.error(`Error al enviar código de recuperación a ${email}: ${error.message}`);
        throw error;
      }
    }
    
    private cuerpoMensajeRecuperacion(codigo: string): string {
     return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.07); padding: 32px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #8F87F1; font-size: 2.2em; margin: 0;">Recuperación de Cuenta</h1>
          <p style="color: #8F87F1; margin: 8px 0 0 0; font-size: 1.05em; font-weight: bold;">ClickComercio</p>
        </div>
        <p style="font-size: 1.1em; color: #222;">Has solicitado restablecer tu contraseña. Tu código de recuperación es:</p>
        <div style="background: #f5f3ff; border: 2px solid #8F87F1; padding: 18px; text-align: center; margin: 24px 0; border-radius: 10px;">
          <h2 style="letter-spacing: 5px; color: #8F87F1; font-size: 2.1em; margin: 0;">${codigo}</h2>
        </div>
        <p style="font-weight: bold; color: #222;">Importante:</p>
        <ul style="color: #3b3b3b; font-size: 1em; margin-left: 18px;">
          <li>Este código expirará en <b>2 minutos</b>.</li>
          <li>Solo tienes <b>3 intentos</b> para usarlo.</li>
          <li>Si no solicitaste este cambio, ignora este correo.</li>
        </ul>
        <div style="background: #ede9fe; padding: 14px; border-radius: 8px; border-left: 4px solid #8F87F1; margin-top: 18px;">
          <p style="margin: 0; color: #8F87F1; font-size: 0.96em;"><strong>Por tu seguridad:</strong> nunca compartas este código con nadie.</p>
        </div>
        <p style="text-align: center; color: #bdbdbd; font-size: 0.92em; margin-top: 40px;">&copy; ${new Date().getFullYear()} ClickComercio</p>
      </div>
    `;
    }
}

