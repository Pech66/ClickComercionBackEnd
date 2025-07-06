    import { Injectable } from '@nestjs/common';
  import { randomInt } from 'crypto';
  import { MailService } from './mail/mail.service';
  import { PrismaService } from 'src/prisma/prisma.service';

  @Injectable()
  export class VerificationService {
    private readonly codigos = new Map<string,{ codigo: string; expiracion: number; creado: number; intentos: number }>();
    private readonly codigosReset = new Map<string,{ codigo: string; expiracion: number; creado: number; intentos: number }>();
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

    async enviarCodigoRecuperacion(email: string): Promise<void> {
    //  Verificar que el usuario existe y está activo
      const usuario = await this.prisma.usuarios.findUnique({
        where: { email },
        select: { Id: true, email: true, verificado: true, activo: true }
      });

      if (!usuario) {
        throw new Error('Email no encontrado');
      }

      if (!usuario.verificado) {
        throw new Error('La cuenta debe estar verificada para recuperar contraseña');
      }

      if (!usuario.activo) {
        throw new Error('Cuenta desactivada');
      }

      // Verificar si ya hay un código activo
      const registroActual = this.codigosReset.get(email);
      if (registroActual && Date.now() < registroActual.expiracion) {
        const segundosRestantes = Math.ceil((registroActual.expiracion - Date.now()) / 1000);
        throw new Error(`Debes esperar ${segundosRestantes} segundos antes de solicitar otro código.`);
      }

      // 3. Generar nuevo código (6 dígitos)
      const codigo = randomInt(100000, 999999).toString();

      // 4. Configurar expiración (15 minutos)
      const ahora = Date.now();
      const expiracion = ahora + 15 * 60 * 1000; // 15 minutos

      // 5. Guardar SOLO en memoria (no en BD)
      this.codigosReset.set(email, {
        codigo,
        expiracion,
        creado: ahora,
        intentos: 3, // 3 intentos máximo
      });

      // 6. Enviar código por email
      await this.mailService.enviarCodigoRecuperacion(email, codigo);
    } 

  verificarCodigoRecuperacion(email: string, codigoIngresado: string): boolean {
    const registro = this.codigosReset.get(email);

    // No existe registro
    if (!registro) {
      throw new Error('Código no encontrado o expirado');
    }

    // Ya no quedan intentos
    if (registro.intentos <= 0) {
      this.codigosReset.delete(email);
      throw new Error('Se agotaron los intentos. Solicita un nuevo código');
    }

    // Código expirado
    if (Date.now() > registro.expiracion) {
      this.codigosReset.delete(email);
      throw new Error('Código expirado. Solicita uno nuevo');
    }

    // Verificar código
    if (registro.codigo === codigoIngresado) {
      // Código correcto - eliminar del Map
      this.codigosReset.delete(email);
      return true;
    } else {
      // Código incorrecto - reducir intentos
      registro.intentos--;
      
      if (registro.intentos <= 0) {
        this.codigosReset.delete(email);
        throw new Error('Código incorrecto. Se agotaron los intentos');
      }
      
      throw new Error(`Código incorrecto. Te quedan ${registro.intentos} intentos`);
    }
  }

  async reenviarCodigoRecuperacion(email: string): Promise<void> {
    // Verificar que el usuario existe
    const usuario = await this.prisma.usuarios.findUnique({
      where: { email },
      select: { verificado: true, activo: true }
    });

    if (!usuario?.verificado || !usuario?.activo) {
      throw new Error('Usuario no válido para recuperación');
    }

    // Verificar tiempo de espera
    const registroAnterior = this.codigosReset.get(email);
    if (registroAnterior && Date.now() < registroAnterior.expiracion) {
      const segundosRestantes = Math.ceil((registroAnterior.expiracion - Date.now()) / 1000);
      throw new Error(`Debes esperar ${segundosRestantes} segundos antes de solicitar otro código.`);
    }

    // Generar nuevo código
    const nuevoCodigo = randomInt(100000, 999999).toString();
    const ahora = Date.now();
    const nuevaExpiracion = ahora + 15 * 60 * 1000;

    this.codigosReset.set(email, {
      codigo: nuevoCodigo,
      expiracion: nuevaExpiracion,
      creado: ahora,
      intentos: 3,
    });

    await this.mailService.enviarCodigoRecuperacion(email, nuevoCodigo);
  }

  // Método para limpiar códigos expirados 
  limpiarCodigosExpirados(): void {
    const ahora = Date.now();
    for (const [email, registro] of this.codigosReset.entries()) {
      if (ahora > registro.expiracion) {
        this.codigosReset.delete(email);
      }
    }
  }

    
}