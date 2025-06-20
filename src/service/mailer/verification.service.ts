
import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import { MailService } from './mail/mail.service'; 

@Injectable()
export class VerificationService {
  private readonly codigos = new Map<string,
   { codigo: string; expiracion: Date ; intentos: number }>();

  constructor(private readonly mailService: MailService) {}

  async enviarCodigoVerificacion(email: string ): Promise<void> {
    const codigo = randomInt(100000, 999999).toString(); // Código de 6 dígitos
    const expiracion = new Date(Date.now() + 1 * 60 * 1000); // Expira en 1 minutos

    this.codigos.set(email,
      {
        codigo,
        expiracion,
        intentos: 3 // Intentos permitidos
      });

      await this.mailService.envioVerificacion(email, codigo);
  }

  verificarCodigo(email: string, codigoIngresado: string): boolean {
    const registro = this.codigos.get(email);
    
    // Verificar si el registro existe
    if (!registro){
      return false; // No se encontró el registro
    }

    
    // Validar el código ingresado maximo 3 intentos
    if (registro.intentos > 3) {
      registro.intentos++;
      this.codigos.delete(email); // Eliminar después de 3 intentos fallidos
      return false; // Demasiados intentos
    }

    // Verificar si el código es correcto y no ha expirado
    const isValid = registro.codigo === codigoIngresado &&
        new Date() < registro.expiracion;

    //Elimina si es valido o si ya espiró
    if (isValid || new Date() >= registro.expiracion) {
        this.codigos.delete(email)
    }    
    
    return isValid;
  }


    async reenviarCodigo(email: string): Promise<void> {
    const anterior = this.codigos.get(email);

    // Si aún tiene un código válido, no reenviar
    if (anterior && new Date() < anterior.expiracion) {
      throw new Error('Ya tienes un código activo. Espera que expire.');
    }

    // Generar nuevo código
    const nuevoCodigo = randomInt(100000, 999999).toString();
    const nuevaExpiracion = new Date(Date.now() + 2 * 60 * 1000);

    // Guardar en memoria
    this.codigos.set(email, {
      codigo: nuevoCodigo,
      expiracion: nuevaExpiracion,
      intentos: 0 // Reiniciar intentos,
    });

    // Enviar nuevo código
    await this.mailService.envioVerificacion(email, nuevoCodigo);
  }

}