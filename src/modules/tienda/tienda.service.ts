import { Injectable } from '@nestjs/common';
import { DtoCrearTienda } from './dtos/dto.creartienda';
import { PrismaService } from 'src/prisma/prisma.service';
import { ValidacionService } from 'src/components/validaciondatos/validacionService';
import { DtoEditarTienda } from './dtos/dto.editartienda';



@Injectable()
export class TiendaService {
    constructor(
        private prisma: PrismaService,
        private validacionService: ValidacionService
    ){}

    async registrarTienda(dtoCrearTienda: DtoCrearTienda) {
        try {
          // Validar los datos de la tienda
          const numero = this.validacionService.validateNumeroTelefono(dtoCrearTienda.telefono);
          if(!numero){
            throw new Error('El número de teléfono no es válido');
          } 
          const nombre = this.validacionService.validateNombre(dtoCrearTienda.nombre);
          if(!nombre){
            throw new Error('El nombre de la tienda debe ser válido');
          }

          
          const tienda = await this.prisma.tienda.create({
            data: {
              nombre: dtoCrearTienda.nombre,
              ubicacion: dtoCrearTienda.ubicacion,
              telefono: dtoCrearTienda.telefono,
            },
          });
          return tienda;
        } catch (error) {
          throw new Error(`Error al registrar la tienda: ${error.message}`);
        }
    }

    async obtenerMiTienda(usuarioId: string) {
      try {
        // 1. Obtener el usuario con su tienda actual desde la BD
        const usuario = await this.prisma.usuarios.findUnique({
          where: { Id: usuarioId },
          select: { 
            Id_tienda: true,
            tienda: {
              select: {
                Id: true,
                nombre: true,
                ubicacion: true,
                telefono: true
              }
            }
          }
        });
      
        if (!usuario) {
          throw new Error('Usuario no encontrado');
        }
      
        if (!usuario.Id_tienda || !usuario.tienda) {
          throw new Error('El usuario no tiene tienda asignada');
        }
      
        return usuario.tienda;
      } catch (error) {
        throw new Error(`Error al obtener la tienda: ${error.message}`);
      }
    }

    async obtenerTiendaPorId(id: string) {
      return this.prisma.tienda.findUnique({
        where: { Id: id }, 
      });
    }

    async editarMiTienda(tiendaId: string, dtoEditarTienda: DtoEditarTienda) {
      try {
        // Vaidacion de datos
        const numero = dtoEditarTienda.telefono !== undefined ? this.validacionService.validateNumeroTelefono(dtoEditarTienda.telefono) : true;
          if(dtoEditarTienda.telefono !== undefined && !numero){
            throw new Error('El número de teléfono no es válido');
          } 
          const nombre = dtoEditarTienda.nombre !== undefined ? 
            this.validacionService.validateNombre(dtoEditarTienda.nombre) : false;
          if(!nombre){
            throw new Error('El nombre de la tienda debe ser válido');
          }


        const tiendaExistente = await this.prisma.tienda.findUnique({
          where: { Id: tiendaId }
        });
      
        if (!tiendaExistente) {
          throw new Error('Tienda no encontrada');
        }
      
        // Construir objeto dinámico solo con campos válidos
        const updateData: any = {};

        // Solo agregar campos que tienen valor 
        if (dtoEditarTienda.nombre !== undefined && dtoEditarTienda.nombre.trim() !== '') {
          updateData.nombre = dtoEditarTienda.nombre.trim();
        }

        if (dtoEditarTienda.ubicacion !== undefined && dtoEditarTienda.ubicacion.trim() !== '') {
          updateData.ubicacion = dtoEditarTienda.ubicacion.trim();
        }

        if (dtoEditarTienda.telefono !== undefined && dtoEditarTienda.telefono.trim() !== '') {
          updateData.telefono = dtoEditarTienda.telefono.trim();
        }
      
        // Verificar para actualizar
        if (Object.keys(updateData).length === 0) {
          throw new Error('No se proporcionaron campos válidos para actualizar');
        }
      
        return await this.prisma.tienda.update({
          where: { Id: tiendaId },
          data: updateData,
        });
      } catch (error) {
        throw new Error(`Error al editar la tienda: ${error.message}`);
      }
    }

    async eliminarMiTienda(usuarioId: string, tiendaId: string) {
      try {
        // transaciones para la consistencia
        const resultado = await this.prisma.$transaction(async (prisma) => {

          // Verificar que la tienda existe y le pertenece al usuario
          const tienda = await prisma.tienda.findUnique({
            where: { Id: tiendaId },
            include: {
              usuarios: true,
              almacen: true 
            }
          });
        
          if (!tienda) {
            throw new Error('Tienda no encontrada');
          }
        
          // Verificar que el usuario sea dueño de la tienda
          const usuarioEsDueno = tienda.usuarios.some(u => u.Id === usuarioId);
          if (!usuarioEsDueno) {
            throw new Error('Esta tienda no te pertenece');
          }
        
          // Desasignar todos los usuarios de la tienda
          await prisma.usuarios.updateMany({
            where: { Id_tienda: tiendaId },
            data: { Id_tienda: null }
          });
        
          // Eliminar todos los almacenes de la tienda
          await prisma.almacen.deleteMany({
            where: { Id_tienda: tiendaId }
          });
        
          //  Ahora sí eliminar la tienda
          await prisma.tienda.delete({
            where: { Id: tiendaId }
          });
        
          return { 
            mensaje: 'Tienda eliminada correctamente',
            usuariosDesasignados: tienda.usuarios.length,
            almacenesEliminados: tienda.almacen.length
          };
        });
      
        return resultado;
      } catch (error) {
        throw new Error(`Error al eliminar la tienda: ${error.message}`);
      }
    }

    //Obtener todas la tienda por el superAdministrador
      async obtenerTodasLasTiendas() {
        try {
          return await this.prisma.tienda.findMany({
            select: {
              Id: true,
              nombre: true,
              ubicacion: true,
              telefono: true,
              usuarios: {
                select: {
                  Id: true,
                  nombre: true,
                  email: true,
                  rol: true,
                  activo: true
                }
              }
            },
            orderBy: {
              nombre: 'asc'
            }
          });
        } catch (error) {
          throw new Error(`Error al obtener todas las tiendas: ${error.message}`);
        }
      }      





}
