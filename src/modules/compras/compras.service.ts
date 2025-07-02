import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DtoProductoCompra } from './dto/dto.compra';
import { DtoEditarProductoCompra } from './dto/editar/dto.editarcompra';


@Injectable()
export class ComprasService {
    constructor(
        private prisma: PrismaService
    ){}
    async registrarCompra(dto: DtoProductoCompra) {
        return this.prisma.$transaction(async (tx) => {
            // Convertir fecha de 
            const fechaConvertida = new Date(dto.fecha +'T00:00:00.000Z');
            // 1. Crear la compra
            const compra = await tx.compra.create({
              data: {
                Id_proveedor: dto.Id_proveedor,
                fecha: fechaConvertida,
                total: dto.total,
                sku: dto.sku,
              }
            });

            // 2. Agregar los productos de la compra (detalle)
            for (const prod of dto.productos) {
                const stock =await tx.productocompra.create({
                    data: {
                      Id_compra: compra.Id,
                      Id_producto: prod.Id_producto,
                      cantidad: prod.cantidad,
                    }
                });
            }   

            return {compra, };
        });
    }

    async editarCompra(id: string, dto: DtoEditarProductoCompra) {
        return this.prisma.$transaction(async (tx) => {
            // 1. Verificar que la compra existe
            const compraExistente = await tx.compra.findUnique({
                where: { Id: id },
                include: {
                    productocompra: true
                }
            });
        
            if (!compraExistente) {
                throw new NotFoundException(`Compra con ID ${id} no encontrada`);
            }
        
            // 2. Actualizar datos básicos de la compra
            const compraActualizada = await tx.compra.update({
                where: { Id: id },
                data: {
                    ...(dto.fecha && { fecha: new Date(dto.fecha) }),
                    ...(dto.total !== undefined && { total: dto.total }),
                    ...(dto.sku !== undefined && { sku: dto.sku }),
                    ...(dto.Id_proveedor !== undefined && { Id_proveedor: dto.Id_proveedor }),
                }
            });
        
            // 3. Actualizar productos si se proporcionan
            if (dto.productos && dto.productos.length > 0) {
                for (const prod of dto.productos) {
                    if (prod.Id) {
                        // Actualizar producto existente
                        await tx.productocompra.update({
                            where: { Id: prod.Id },
                            data: {
                                ...(prod.cantidad !== undefined && { cantidad: prod.cantidad }),
                                ...(prod.Id_producto && { Id_producto: prod.Id_producto }),
                            }
                        });
                    } else if (prod.Id_producto && prod.cantidad) {
                        // Crear nuevo producto en la compra
                        await tx.productocompra.create({
                            data: {
                                Id_compra: id,
                                Id_producto: prod.Id_producto,
                                cantidad: prod.cantidad,
                            }
                        });
                    }
                }
            }
        
            return compraActualizada;
        });
    }

    async obtenerComprasPorTienda(Id_tienda: string) {
        return this.prisma.compra.findMany({
            where: {
                proveedor: {
                    Id_tienda: Id_tienda
                }
            },
            include: {
                proveedor: {
                    select: {
                        Id: true,
                        nombre: true,
                        tienda: {
                            select: {
                                Id: true,
                                nombre: true
                            }
                        }
                    }
                },
                productocompra: {
                    include: {
                        producto: {
                            select: {
                                Id: true,
                                nombre: true,
                                descripcion: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                fecha: 'desc'
            }
        });
    }

    async obtenerCompraPorId(id: string, Id_tienda?: string) {
        const whereCondition: any = { Id: id };

        // Si se especifica tienda, filtrar por proveedor de esa tienda
        if (Id_tienda) {
            whereCondition.proveedor = {
                Id_tienda: Id_tienda
            };
        }

        const compra = await this.prisma.compra.findFirst({
            where: whereCondition,
            include: {
                proveedor: {
                    select: {
                        Id: true,
                        nombre: true,
                        tienda: {
                            select: {
                                Id: true,
                                nombre: true
                            }
                        }
                    }
                },
                productocompra: {
                    include: {
                        producto: {
                            select: {
                                Id: true,
                                nombre: true,
                                descripcion: true
                            }
                        }
                    }
                }
            }
        });

        if (!compra) {
            throw new NotFoundException(`Compra con ID ${id} no encontrada en la tienda especificada`);
        }

        return compra;
    }

    async eliminarCompra(id: string, Id_tienda?: string) {
        return this.prisma.$transaction(async (tx) => {
            // Verificar que la compra existe y el proveedor pertenece a la tienda
            const whereCondition: any = { Id: id };
            if (Id_tienda) {
                whereCondition.proveedor = {
                    Id_tienda: Id_tienda
                };
            }

            const compraExistente = await tx.compra.findFirst({
                where: whereCondition,
                include: {
                    productocompra: true,
                    proveedor: {
                        select: {
                            Id: true,
                            nombre: true,
                            Id_tienda: true
                        }
                    }
                }
            });

            if (!compraExistente) {
                throw new NotFoundException(`Compra con ID ${id} no encontrada en la tienda especificada`);
            }

            // Eliminar productos de la compra
            await tx.productocompra.deleteMany({
                where: { Id_compra: id }
            });

            // Eliminar la compra
            const compraEliminada = await tx.compra.delete({
                where: { Id: id }
            });

            return {
                message: `Compra con ID ${id} eliminada exitosamente`,
                compra: compraEliminada
            };
        });
    }

    


}
