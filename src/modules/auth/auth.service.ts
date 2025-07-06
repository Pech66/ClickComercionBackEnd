import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { DtoRegistraUsuario } from "./dtos/dto.registra.usuario";
import * as bcrypt from 'bcrypt';
import { DtoVerificacion } from "./dtos/dto.verificacion";
import { DtoLoginUsuario } from "./dtos/dto.login.usuario";
import { VerificationService } from "src/service/mailer/verification.service";
import { ValidacionService } from "src/components/validaciondatos/validacionService";




@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private validationService: ValidacionService,
        private jwtService: JwtService,
        private verificationService: VerificationService,

    ) { }

    async registrarUsuarioAdminTienda(registrarUsuarioDto: DtoRegistraUsuario) {

        try {
            //Validaciones del formato de los datos
            const validarContrasena = this.validationService.validatePassword(registrarUsuarioDto.contrasena);
            const validaEmail = this.validationService.validateEmailFormat(registrarUsuarioDto.email);
            const validaNombre = this.validationService.validateNombreUsuario(registrarUsuarioDto.nombre);

            if (!validaNombre) {
                throw new BadRequestException("La contraseña no cumple con los requisitos");
            }
            if (!validarContrasena) {
                throw new BadRequestException("El nombre de usuario no cumple con los requisitos");
            }

            if (!validaEmail) {
                throw new BadRequestException("El formato del email es incorrecto");
            }

            // Asigna el emial a usuarioExistente el email es unico
            const usuarioExistente = await this.prisma.usuarios.findUnique({
                where: {
                    email: registrarUsuarioDto.email
                }
            })

            //Verificar si el usuario ya existe
            if (usuarioExistente) {
                throw new ConflictException("El usuario ya existe");
            }

            //Encriptar la contraseña
            const contasenaEncrptada = await bcrypt.hash(registrarUsuarioDto.contrasena, 10)

            //Crear el usuario
            const usuarioCreado = await this.prisma.usuarios.create({
                data: {
                    nombre: registrarUsuarioDto.nombre,
                    email: registrarUsuarioDto.email,
                    contrasena: contasenaEncrptada,
                    rol: 'ADMIN_TIENDA',
                    verificado: false,
                    activo: true,
                }
            })

            await this.verificationService.enviarCodigoVerificacion(usuarioCreado.email);
            return usuarioCreado
        } catch (error) {
            if (error instanceof ConflictException) {
                throw error; // Re-lanzar la excepción de conflicto
            }
            // Manejo de errores genérico
            throw new ConflictException("Error al registrar el usuario: " + error.message);
        }
    }


    async verificarCuenta(dtoVerificacion: DtoVerificacion) {
        try {
            const esValido = await this.verificationService.verificarCodigo(
                dtoVerificacion.email,
                dtoVerificacion.code,
            );


            if (!esValido) {
                throw new ConflictException("El codigo de verificacion es invalido o ha expirado");
            }

            // Actualizar el usuario a verificado
            await this.prisma.usuarios.update({
                where: { email: dtoVerificacion.email },
                data: { verificado: true }
            })

            return { message: "Cuenta verificada exitosamente" };

        } catch (error) {
            if (error instanceof ConflictException) {
                throw error; // Re-lanzar la excepción de conflicto
            }
            // Manejo de errores genérico
            throw new ConflictException("Error al verificar la cuenta: " + error.message);
        }

    }


    async login(dtoLoginUsuario: DtoLoginUsuario) {
        try {
            // Validaciones del formato de los datos
            const validarEmail = this.validationService.validateEmailFormat(dtoLoginUsuario.email);
            const validarContrasena = this.validationService.validatePassword(dtoLoginUsuario.contrasena);

            if (!validarEmail) {
                throw new BadRequestException("El formato del email es incorrecto");
            }

            if (!validarContrasena) {
                throw new BadRequestException("La contraseña no cumple con los requisitos");
            }
            // Consultar el usuario por email
            const usuario = await this.prisma.usuarios.findUnique({
                where: { email: dtoLoginUsuario.email }
            });

            // Si el usuario no existe
            if (!usuario) {
                throw new UnauthorizedException("Usuario no encontrado");
            }

            // Verificar la contraseña
            const passwordValida = await bcrypt.compare(dtoLoginUsuario.contrasena, usuario.contrasena);
            if (!passwordValida) {
                throw new UnauthorizedException("Credenciales inválidas");
            }

            // Verificar si el usuario esta verificado
            if (usuario.rol === 'ADMIN_TIENDA' && !usuario.verificado) {
                throw new UnauthorizedException('Debes verificar tu email primero');
            }

            const payload = {
                sub: usuario.Id,
                email: usuario.email,
                rol: usuario.rol,
                tiendaId: usuario.Id_tienda,
                verificado: usuario.verificado,
                activo: usuario.activo,
            };

            return {
                access_token: this.jwtService.sign(payload),
                usuario: {
                    id: usuario.Id,
                    email: usuario.email,
                    rol: usuario.rol,
                }
            };
        } catch (error) {
            if (error instanceof Error && error.message.includes('El formato del email')) {
                throw new UnauthorizedException('Formato de email inválido');
            }
            if (error instanceof Error && error.message.includes('La contraseña')) {
                throw new UnauthorizedException('Contraseña no cumple con los requisitos');
            }
            throw error;
        }
    }

    async reenviarCodigo(email: string): Promise<void> {
        return await this.verificationService.reenviarCodigo(email);
    }

    async logout(usuarioId: string) {
        // Verificamos que el usuario existe (opcional)
        const usuario = await this.prisma.usuarios.findUnique({
            where: { Id: usuarioId },
            select: { Id: true, nombre: true }
        });

        if (!usuario) {
            throw new NotFoundException('Usuario no encontrado');
        }

        return {
            message: 'Sesión cerrada exitosamente',
            usuario: usuario.nombre,
            timestamp: new Date().toISOString()
        };
    }

    async forgotPassword(email: string) {

        await this.verificationService.enviarCodigoRecuperacion(email);

        return {
            message: 'Si el email existe, recibirás un código de recuperación',
            expiresIn: '15 minutos'
        };
    }

    // RESET PASSWORD
    async resetPassword(email: string, codigo: string, newPassword: string) {
        // 1. Verificar código
        const codigoValido = this.verificationService.verificarCodigoRecuperacion(email, codigo);

        if (!codigoValido) {
            throw new BadRequestException('Código inválido');
        }

        // 2. Buscar usuario
        const usuario = await this.prisma.usuarios.findUnique({
            where: { email },
            select: { Id: true, contrasena: true }
        });

        if (!usuario) {
            throw new BadRequestException('Usuario no encontrado');
        }

        // 3. Validar que no sea la misma contraseña
        const isSamePassword = await bcrypt.compare(newPassword, usuario.contrasena);
        if (isSamePassword) {
            throw new BadRequestException('La nueva contraseña debe ser diferente a la actual');
        }

        // 4. Encriptar y actualizar
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await this.prisma.usuarios.update({
            where: { Id: usuario.Id },
            data: { contrasena: hashedPassword }
        });

        return {
            message: 'Contraseña actualizada exitosamente',
            timestamp: new Date().toISOString()
        };
    }

    // Vincular usuario con tienda
    async vincularUsuarioConTienda(usuarioId: string, tiendaId: string) {
        return this.prisma.usuarios.update({
            where: { Id: usuarioId },
            data: { Id_tienda: tiendaId },
        });
    }

}