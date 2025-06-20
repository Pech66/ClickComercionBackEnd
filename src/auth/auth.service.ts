import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { DtoRegistraUsuario } from "./dtos/dto.registra.usuario";
import * as bcrypt from 'bcrypt';
import { DtoVerificacion } from "./dtos/dto.verificacion";
import { DtoLoginUsuario } from "./dtos/dto.login.usuario";
import { DtoEditarUsuario } from "./dtos/dto.editar.usuario";
import { VerificationService } from "src/service/mailer/verification.service";
import { ValidacionService } from "src/components/validaciondatos/validacionService";
import { DtoCrearTienda } from "src/modules/tienda/dtos/dto.creartienda";



@Injectable()
export class AuthService{
    constructor( 
        private prisma: PrismaService,
        private validationService: ValidacionService,
        private jwtService: JwtService,
        private verificationService: VerificationService,
    ){}
    
    async registrarUsuarioAdminTienda( registrarUsuarioDto: DtoRegistraUsuario){

        try {
            //Validaciones del formato de los datos
            this.validationService.validatePassword(registrarUsuarioDto.contrasena);
            this.validationService.validateEmailFormat(registrarUsuarioDto.email);
            
            // Asigna el emial a usuarioExistente el email es unico
            const usuarioExistente = await this.prisma.usuarios.findUnique({
                where: {
                    email: registrarUsuarioDto.email
                }
            })
            
            //Verificar si el usuario ya existe
            if(usuarioExistente){
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


    async verificarCuenta(dtoVerificacion : DtoVerificacion) {
        try {
            const esValido = await this.verificationService.verificarCodigo(
            dtoVerificacion.email,
            dtoVerificacion.code,
            );


        if(!esValido){
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

    
    async login(dtoLoginUsuario : DtoLoginUsuario) {
        try {

            //Validaciones del formato de los datos
            this.validationService.validateEmailFormat(dtoLoginUsuario.email);
            this.validationService.validatePassword(dtoLoginUsuario.contrasena);

            //Consultar el usuario por email
            const usuario = await this.prisma.usuarios.findUnique({
                where: {
                    email: dtoLoginUsuario.email
                }
            });

            //Verificar las credenciales 
            if(!usuario || !(await bcrypt.compare(dtoLoginUsuario.contrasena, usuario.contrasena))){
                throw new UnauthorizedException("credendiales invalidad");
            }

            //Verificar si el usuario esta verificado
            if (usuario.rol === 'ADMIN_TIENDA' && !usuario.verificado) {
              throw new UnauthorizedException('Debes verificar tu email primero');
            }

            //Generar el token JWT
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
                    tiendaId: usuario.Id_tienda,
                    verificado: usuario.verificado,
                    activo: usuario.activo,
                }
            };

        } catch (error) {
            // Manejo específico de errores de validación
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

    async obtenerDatosUsuario(id: string) {
     const usuario = await this.prisma.usuarios.findUnique({
       where: { Id: id },
       select: {
         Id: true,
         nombre: true,
         email: true,
         rol: true,
         Id_tienda: true,
         verificado: true,
         activo: true,
       },
     });
     if (!usuario) throw new UnauthorizedException('Usuario no encontrado');
     return usuario;
    }

    async vincularUsuarioConTienda(usuarioId: string, tiendaId: string) {
        return this.prisma.usuarios.update({
          where: { Id: usuarioId },         
          data: { Id_tienda: tiendaId },    
        });
    } 

    async obtenerUsuarioPorId(id: string) {
        // Validar el formato del ID
        try {
            const usuario = await this.prisma.usuarios.findUnique({
                where: { Id: id },
            });

            if (!usuario) {
                throw new UnauthorizedException("Usuario no encontrado");
            }

            return {
                id: usuario.Id,
                email: usuario.email,
                rol: usuario.rol,
                tiendaId: usuario.Id_tienda,
                verificado: usuario.verificado,
                activo: usuario.activo,
            };
        } catch (error) {
            throw new UnauthorizedException("Error al obtener el usuario: " + error.message);
        }
    }


    async obtenerTodosUsuarios() {
        try {
            const usuarios = await this.prisma.usuarios.findMany({
                select: {
                    Id: true,
                    email: true,
                    rol: true,
                    Id_tienda: true,
                    verificado: true,
                    activo: true,
                },
            });

            return usuarios;
        } catch (error) {
            throw new UnauthorizedException("Error al obtener los usuarios: " + error.message);
        }
    }


    async editarUsuario(id: string, dtoEditarUsuario: DtoEditarUsuario) {
        try {
            // Validaciones del formato de los datos
            if (dtoEditarUsuario.contrasena) {
                this.validationService.validatePassword(dtoEditarUsuario.contrasena);
            }

            const usuarioExistente = await this.prisma.usuarios.findUnique({
                where: { Id: id },
            });

            if (!usuarioExistente) {
                throw new UnauthorizedException("Usuario no encontrado");
            }

            const datosActualizados = {
                ...dtoEditarUsuario,
                contrasena: dtoEditarUsuario.contrasena ? await bcrypt.hash(dtoEditarUsuario.contrasena, 10) : usuarioExistente.contrasena,
            };

            const usuarioActualizado = await this.prisma.usuarios.update({
                where: { Id: id },
                data: datosActualizados,
            });

            return {
                id: usuarioActualizado.Id,
                email: usuarioActualizado.email,
                rol: usuarioActualizado.rol,
                tiendaId: usuarioActualizado.Id_tienda,
                verificado: usuarioActualizado.verificado,
                activo: usuarioActualizado.activo,
            };
        } catch (error) {
            throw new UnauthorizedException("Error al editar el usuario: " + error.message);
        }
    }

    async eliminarUsuario(id: string) {
        try {
            const usuarioExistente = await this.prisma.usuarios.findUnique({
                where: { Id: id },
            });

            if (!usuarioExistente) {
                throw new UnauthorizedException("Usuario no encontrado");
            }

            await this.prisma.usuarios.delete({
                where: { Id: id },
            });

            return { message: "Usuario eliminado exitosamente" };
        } catch (error) {
            throw new UnauthorizedException("Error al eliminar el usuario: " + error.message);
        }
    }










}