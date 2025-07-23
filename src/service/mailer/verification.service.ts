import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import { MailService } from './mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';

type ServiceStatus = 'success' | 'error' | 'warning' | 'info';
interface ServiceResponse<T = any> {
  status: ServiceStatus;
  code: string;
  mensaje: string;
  data: T | null;
}

// --- Limite de reenvíos de activación por usuario (email) ---
const REENVIO_LIMITES = new Map<string, { veces: number; primerIntento: number }>();
const LIMITE_REENVIOS = 3; // veces permitidas
const VENTANA_TIEMPO = 24 * 60 * 60 * 1000; // 24 horas en ms

@Injectable()
export class VerificationService {
  private readonly codigos = new Map<string, { codigo: string; expiracion: number; creado: number; intentos: number }>();
  private readonly codigosReset = new Map<string, { codigo: string; expiracion: number; creado: number; intentos: number }>();

  constructor(
    private readonly mailService: MailService,
    private readonly prisma: PrismaService
  ) { }

  async enviarCodigoVerificacion(email: string): Promise<ServiceResponse> {
    const registro = this.codigos.get(email);
    if (registro && Date.now() < registro.expiracion) {
      const segundosRestantes = Math.ceil((registro.expiracion - Date.now()) / 1000);
      return {
        status: 'warning',
        code: 'CODIGO_RECICLADO',
        mensaje: `Debes esperar ${segundosRestantes} segundos antes de solicitar otro código.`,
        data: null
      };
    }

    const codigo = randomInt(100000, 999999).toString();
    const zonaHorariaMexico = 'America/Mexico_City';
    const fechaMexico = new Date(
      new Date().toLocaleString('en-US', { timeZone: zonaHorariaMexico })
    );
    const ahora = Date.now();
    const expiracion = ahora + 2 * 60 * 1000;

    this.codigos.set(email, {
      codigo,
      expiracion,
      creado: ahora,
      intentos: 3,
    });

    await this.prisma.usuarios.update({
      where: { email },
      data: {
        codigoVerificacion: codigo,
        codigoVerificacionExp: fechaMexico,
      },
    });

    await this.mailService.envioVerificacion(email, codigo);

    return {
      status: 'success',
      code: 'CODIGO_ENVIADO',
      mensaje: 'Código de verificación enviado correctamente.',
      data: null
    };
  }

  verificarCodigo(email: string, codigoIngresado: string): ServiceResponse {
    const registro = this.codigos.get(email);

    if (!registro) {
      return {
        status: 'error',
        code: 'CODIGO_NO_SOLICITADO',
        mensaje: 'No se ha solicitado un código para este correo.',
        data: null
      };
    }

    if (registro.intentos <= 0) {
      this.codigos.delete(email);
      return {
        status: 'error',
        code: 'INTENTOS_AGOTADOS',
        mensaje: 'Se agotaron los intentos. Solicita un nuevo código.',
        data: null
      };
    }

    if (Date.now() > registro.expiracion) {
      this.codigos.delete(email);
      return {
        status: 'warning',
        code: 'CODIGO_EXPIRADO',
        mensaje: 'El código ha expirado. Solicita uno nuevo.',
        data: null
      };
    }

    if (registro.codigo === codigoIngresado) {
      this.codigos.delete(email);
      return {
        status: 'success',
        code: 'CODIGO_VALIDO',
        mensaje: 'Código verificado correctamente.',
        data: null
      };
    } else {
      registro.intentos--;
      if (registro.intentos <= 0) {
        this.codigos.delete(email);
      }
      return {
        status: 'error',
        code: 'CODIGO_INCORRECTO',
        mensaje: `Código incorrecto. Te quedan ${registro.intentos} intentos.`,
        data: null
      };
    }
  }

  async reenviarCodigo(email: string): Promise<ServiceResponse> {
    const usuario = await this.prisma.usuarios.findUnique({
      where: { email },
      select: { verificado: true }
    });

    if (usuario?.verificado) {
      return {
        status: 'warning',
        code: 'USUARIO_YA_VERIFICADO',
        mensaje: 'El usuario ya está verificado y no puede solicitar otro código.',
        data: null
      };
    }

    const anterior = this.codigos.get(email);
    if (anterior && Date.now() < anterior.expiracion) {
      const segundosRestantes = Math.ceil((anterior.expiracion - Date.now()) / 1000);
      return {
        status: 'warning',
        code: 'CODIGO_RECICLADO',
        mensaje: `Debes esperar ${segundosRestantes} segundos antes de solicitar otro código.`,
        data: null
      };
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

    return {
      status: 'success',
      code: 'CODIGO_REENVIADO',
      mensaje: 'Código de verificación reenviado correctamente.',
      data: null
    };
  }

  // --- NUEVO: Solicitud limitada de reenvío de activación ---
  async solicitarReenvio(email: string) {
    const ahora = Date.now();
    let registro = REENVIO_LIMITES.get(email);

    // Si no hay registro, lo creamos
    if (!registro) {
      registro = { veces: 0, primerIntento: ahora };
      REENVIO_LIMITES.set(email, registro);
    }

    // Si la ventana de 24h ya pasó, reiniciamos contador
    if (ahora - registro.primerIntento > VENTANA_TIEMPO) {
      registro.veces = 0;
      registro.primerIntento = ahora;
    }

    // Si supera el límite, rechaza
    if (registro.veces >= LIMITE_REENVIOS) {
      const espera = ((registro.primerIntento + VENTANA_TIEMPO - ahora) / 1000 / 60).toFixed(0);
      return {
        status: 'warning',
        code: 'LIMITE_REENVIOS',
        mensaje: `Has alcanzado el límite de reenvíos de código. Intenta de nuevo en ${espera} minutos.`,
        data: null
      }
    }

    // Suma una solicitud y actualiza registro
    registro.veces += 1;
    REENVIO_LIMITES.set(email, registro);

    // Reutiliza el propio método para reenviar código
    return this.reenviarCodigo(email);
  }

  // --- Recuperación de contraseña y otros métodos (igual) ---
  async enviarCodigoRecuperacion(email: string): Promise<ServiceResponse> {
    const usuario = await this.prisma.usuarios.findUnique({
      where: { email },
      select: { Id: true, email: true, verificado: true, activo: true }
    });

    if (!usuario) {
      return {
        status: 'error',
        code: 'EMAIL_NO_ENCONTRADO',
        mensaje: 'Email no encontrado.',
        data: null
      };
    }

    if (!usuario.verificado) {
      return {
        status: 'warning',
        code: 'CUENTA_NO_VERIFICADA',
        mensaje: 'La cuenta debe estar verificada para recuperar contraseña.',
        data: null
      };
    }

    if (!usuario.activo) {
      return {
        status: 'warning',
        code: 'CUENTA_DESACTIVADA',
        mensaje: 'Cuenta desactivada.',
        data: null
      };
    }

    const registroActual = this.codigosReset.get(email);
    if (registroActual && Date.now() < registroActual.expiracion) {
      const segundosRestantes = Math.ceil((registroActual.expiracion - Date.now()) / 1000);
      return {
        status: 'warning',
        code: 'CODIGO_RECICLADO',
        mensaje: `Debes esperar ${segundosRestantes} segundos antes de solicitar otro código.`,
        data: null
      };
    }

    const codigo = randomInt(100000, 999999).toString();
    const ahora = Date.now();
    const expiracion = ahora + 15 * 60 * 1000;

    this.codigosReset.set(email, {
      codigo,
      expiracion,
      creado: ahora,
      intentos: 3,
    });

    await this.mailService.enviarCodigoRecuperacion(email, codigo);

    return {
      status: 'success',
      code: 'CODIGO_RECUPERACION_ENVIADO',
      mensaje: 'Código de recuperación enviado correctamente.',
      data: null
    };
  }

  verificarCodigoRecuperacion(email: string, codigoIngresado: string): ServiceResponse {
    const registro = this.codigosReset.get(email);

    if (!registro) {
      return {
        status: 'error',
        code: 'CODIGO_NO_ENCONTRADO',
        mensaje: 'Código no encontrado o expirado.',
        data: null
      };
    }

    if (registro.intentos <= 0) {
      this.codigosReset.delete(email);
      return {
        status: 'error',
        code: 'INTENTOS_AGOTADOS',
        mensaje: 'Se agotaron los intentos. Solicita un nuevo código.',
        data: null
      };
    }

    if (Date.now() > registro.expiracion) {
      this.codigosReset.delete(email);
      return {
        status: 'warning',
        code: 'CODIGO_EXPIRADO',
        mensaje: 'Código expirado. Solicita uno nuevo.',
        data: null
      };
    }

    if (registro.codigo === codigoIngresado) {
      this.codigosReset.delete(email);
      return {
        status: 'success',
        code: 'CODIGO_VALIDO',
        mensaje: 'Código verificado correctamente.',
        data: null
      };
    } else {
      registro.intentos--;
      if (registro.intentos <= 0) {
        this.codigosReset.delete(email);
        return {
          status: 'error',
          code: 'CODIGO_INCORRECTO',
          mensaje: 'Código incorrecto. Se agotaron los intentos.',
          data: null
        };
      }
      return {
        status: 'error',
        code: 'CODIGO_INCORRECTO',
        mensaje: `Código incorrecto. Te quedan ${registro.intentos} intentos.`,
        data: null
      };
    }
  }

  async reenviarCodigoRecuperacion(email: string): Promise<ServiceResponse> {
    const usuario = await this.prisma.usuarios.findUnique({
      where: { email },
      select: { verificado: true, activo: true }
    });

    if (!usuario?.verificado || !usuario?.activo) {
      return {
        status: 'error',
        code: 'USUARIO_NO_VALIDO',
        mensaje: 'Usuario no válido para recuperación.',
        data: null
      };
    }

    const registroAnterior = this.codigosReset.get(email);
    if (registroAnterior && Date.now() < registroAnterior.expiracion) {
      const segundosRestantes = Math.ceil((registroAnterior.expiracion - Date.now()) / 1000);
      return {
        status: 'warning',
        code: 'CODIGO_RECICLADO',
        mensaje: `Debes esperar ${segundosRestantes} segundos antes de solicitar otro código.`,
        data: null
      };
    }

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

    return {
      status: 'success',
      code: 'CODIGO_RECUPERACION_REENVIADO',
      mensaje: 'Código de recuperación reenviado correctamente.',
      data: null
    };
  }

  async verificarCodigoRecup(email: string, codigo: string, opts?: { borrar?: boolean }): Promise<boolean> {
    const registro = this.codigosReset.get(email);
    if (
      !registro ||
      registro.codigo !== codigo ||
      registro.expiracion < Date.now()
    ) {
      if (registro) {
        registro.intentos -= 1;
        if (registro.intentos <= 0) {
          this.codigosReset.delete(email);
        } else {
          this.codigosReset.set(email, registro);
        }
      }
      return false;
    }
    if (opts?.borrar) {
      this.codigosReset.delete(email);
    }
    return true;
  }

  limpiarRegistrosViejos() {
    const ahora = Date.now();
    for (const [email, registro] of REENVIO_LIMITES.entries()) {
      if (ahora - registro.primerIntento > VENTANA_TIEMPO) {
        REENVIO_LIMITES.delete(email);
      }
    }
  }

  limpiarCodigosExpirados(): void {
    const ahora = Date.now();
    for (const [email, registro] of this.codigos.entries()) {
      if (ahora > registro.expiracion) {
        this.codigos.delete(email);
      }
    }
    for (const [email, registro] of this.codigosReset.entries()) {
      if (ahora > registro.expiracion) {
        this.codigosReset.delete(email);
      }
    }
  }
}