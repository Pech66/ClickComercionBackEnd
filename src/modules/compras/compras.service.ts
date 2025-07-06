import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DtoProductoCompra } from './dto/dto.compra';
import { DtoEditarProductoCompra } from './dto/editar/dto.editarcompra';
import { DtoAgregarProductosCompra } from './dto/dto.agregarproducto';
import { DtoEditarProductoCompraUnitario } from './dto/editar/dto.editarproductocompraUni';


@Injectable()
export class ComprasService {
    constructor(
        private prisma: PrismaService
    ) { }

    private async validarProveedor(Id_proveedor: string, Id_tienda: string) {
        if (!Id_proveedor) {
            throw new BadRequestException('Debes seleccionar un proveedor para registrar una compra.');
        }

        const proveedor = await this.prisma.proveedor.findUnique({
            where: { Id: Id_proveedor }
        });

        if (!proveedor) {
            throw new BadRequestException('El proveedor seleccionado no existe.');
        }

        if (proveedor.Id_tienda !== Id_tienda) {
            throw new BadRequestException('El proveedor seleccionado no pertenece a tu tienda.');
        }

        return proveedor;
    }

    private async validarProducto(Id_producto: string, Id_tienda: string) {
        const producto = await this.prisma.producto.findUnique({
            where: { Id: Id_producto },
            include: { almacen: true }
        });

        if (!producto) {
            throw new BadRequestException(`Producto ${Id_producto} no existe`);
        }

        if (!producto.almacen) {
            throw new BadRequestException(`Producto ${Id_producto} no tiene almacén asignado`);
        }

        if (producto.almacen.Id_tienda !== Id_tienda) {
            throw new BadRequestException(`No tienes permiso para usar el producto ${Id_producto}`);
        }

        return producto;
    }

    async registrarCompra(dto: DtoProductoCompra, Id_tienda: string) {
        // 1. Validar proveedor
        await this.validarProveedor(dto.Id_proveedor, Id_tienda);

        return this.prisma.$transaction(async (tx) => {
            const fechaConvertida = new Date(dto.fecha + 'T00:00:00.000Z');

            // 2. Crear la compra
            const compra = await tx.compra.create({
                data: {
                    Id_proveedor: dto.Id_proveedor,
                    fecha: fechaConvertida,
                    total: dto.total,
                    sku: dto.sku,
                }
            });

            // 3. Procesar productos de la compra
            for (const prod of dto.productos) {
                // ✅ Validación mejorada de producto
                const producto = await this.validarProducto(prod.Id_producto, Id_tienda);

                if (prod.cantidad <= 0) {
                    throw new BadRequestException(`Cantidad inválida para producto ${producto.nombre || prod.Id_producto}`);
                }

                // Crear detalle de compra
                await tx.productocompra.create({
                    data: {
                        Id_compra: compra.Id,
                        Id_producto: prod.Id_producto,
                        cantidad: prod.cantidad,
                    }
                });

                // Actualizar el stock
                await tx.producto.update({
                    where: { Id: prod.Id_producto },
                    data: {
                        stock: { increment: prod.cantidad }
                    }
                });
            }

            return {
                compra,
                mensaje: 'Compra registrada exitosamente'
            };
        });
    }
    async obtenerTodasLasCompras(Id_tienda: string) {
        return this.prisma.compra.findMany({
            where: {
                proveedor: { Id_tienda: Id_tienda }
            },
            include: {
                proveedor: true,
                productocompra: {
                    include: {
                        producto: true
                    }
                }
            }
        });
    }

    async editarCompra(id: string, dto: DtoEditarProductoCompra, Id_tienda: string) {
        return this.prisma.$transaction(async (tx) => {
            // 1. Verificar que la compra existe
            const compraExistente = await tx.compra.findUnique({
                where: { Id: id },
                include: {
                    proveedor: true,
                    productocompra: true
                }
            });

            if (!compraExistente?.proveedor) {
                throw new BadRequestException('La compra no tiene un proveedor asociado.');
            }

            if (!compraExistente || compraExistente.proveedor.Id_tienda !== Id_tienda) {
                throw new NotFoundException('No tienes permiso para editar esta compra');
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

    async eliminarCompra(id: string, Id_tienda: string, opciones: {
        ajustarStock?: boolean
    } = {}) {
        return this.prisma.$transaction(async (tx) => {
            // 1. VALIDACIÓN CRÍTICA: Verificar que la compra pertenece a la tienda del usuario
            const compraExistente = await tx.compra.findFirst({
                where: {
                    Id: id,
                    proveedor: {
                        Id_tienda: Id_tienda  // ← ESTO ASEGURA QUE SOLO VEA SUS COMPRAS
                    }
                },
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

            // Si no encuentra la compra, significa que no pertenece a su tienda
            if (!compraExistente) {
                throw new NotFoundException(
                    `❌ Compra no encontrada o no tienes permiso para eliminarla. ` +
                    `Solo puedes eliminar compras de tu propia tienda.`
                );
            }
            if (!compraExistente.proveedor) {
                throw new BadRequestException('La compra no tiene un proveedor asociado.');
            }

            // 2. Validación adicional por seguridad
            if (compraExistente.proveedor.Id_tienda !== Id_tienda) {
                throw new ForbiddenException(
                    `🚫 No tienes permiso para eliminar esta compra. ` +
                    `Esta compra pertenece a otra tienda.`
                );
            }

            // 3. Solo ajustar stock si el usuario lo solicita explícitamente
            if (opciones.ajustarStock) {
                // Validar que hay suficiente stock antes de restar
                for (const detalle of compraExistente.productocompra) {
                    if (!detalle.Id_producto || detalle.cantidad == null) continue;

                    // IMPORTANTE: También validar que el producto pertenece a la tienda
                    const producto = await tx.producto.findFirst({
                        where: {
                            Id: detalle.Id_producto,
                            almacen: {
                                Id_tienda: Id_tienda  // ← VALIDAR PRODUCTO DE LA TIENDA
                            }
                        },
                        include: {
                            almacen: true
                        }
                    });

                    if (!producto) {
                        throw new BadRequestException(
                            `❌ Producto ${detalle.Id_producto} no encontrado en tu tienda`
                        );
                    }

                    if (producto.stock) {
                        // Validar que el stock es suficiente
                        if (producto.stock < detalle.cantidad) {
                            throw new BadRequestException(
                                `⚠️ No hay suficiente stock del producto ${producto.nombre || detalle.Id_producto} ` +
                                `(actual: ${producto.stock}, necesario: ${detalle.cantidad}). ` +
                                `¿Quieres eliminar solo el ticket sin afectar el stock?`
                            );
                        }
                    }

                }

                // Restar stock (solo de productos de la tienda)
                for (const detalle of compraExistente.productocompra) {
                    if (detalle.Id_producto && detalle.cantidad != null) {
                        await tx.producto.updateMany({
                            where: {
                                Id: detalle.Id_producto,
                                almacen: {
                                    Id_tienda: Id_tienda  // ← SOLO ACTUALIZAR PRODUCTOS DE SU TIENDA
                                }
                            },
                            data: { stock: { decrement: detalle.cantidad } }
                        });
                    }
                }
            }

            // 4. Eliminar registros
            await tx.productocompra.deleteMany({
                where: { Id_compra: id }
            });

            await tx.compra.delete({
                where: { Id: id }
            });

            return {
                message: opciones.ajustarStock
                    ? `✅ Compra eliminada y stock ajustado`
                    : `✅ Ticket eliminado sin afectar el stock actual`,
                compra_eliminada: {
                    id: compraExistente.Id,
                    proveedor: compraExistente.proveedor.nombre,
                    tienda: Id_tienda
                }
            };
        });
    }

    async obtenerCompraPorId(id: string, Id_tienda: string) {
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

    async obtenerComprasPorMes(ano: number, mes: number, Id_tienda: string) {
        const fechaInicio = new Date(ano, mes - 1, 1);
        const fechaFin = new Date(ano, mes, 1);

        return this.prisma.compra.findMany({
            where: {
                fecha: { gte: fechaInicio, lt: fechaFin, },
                proveedor: { Id_tienda: Id_tienda }
            },
            include: {
                proveedor: true,
                productocompra: {
                    include: { producto: true }
                },
            }
        });
    }


    async agregarProductosACompra(id: string, dto: DtoAgregarProductosCompra, Id_tienda: string) {
        const compra = await this.prisma.compra.findUnique({
            where: { Id: id },
            include: { proveedor: true }
        });
        if (!compra?.proveedor) {
            throw new BadRequestException('La compra no tiene un proveedor asociado.');
        }

        if (!compra || compra.proveedor.Id_tienda !== Id_tienda) {
            throw new NotFoundException('No tienes permiso para modificar esta compra');
        }
        return this.prisma.$transaction(async (tx) => {
            for (const prod of dto.productos) {
                // Crear detalle
                await tx.productocompra.create({
                    data: {
                        Id_compra: id,
                        Id_producto: prod.Id_producto,
                        cantidad: prod.cantidad,

                    }
                });
                // Actualizar stock
                await tx.producto.update({
                    where: { Id: prod.Id_producto },
                    data: { stock: { increment: prod.cantidad } }
                });
            }
            return { message: 'Productos agregados correctamente' };
        });
    }

    async editarProductoDeCompra(id: string, productoCompraId: string, dto: DtoEditarProductoCompraUnitario, Id_tienda: string) {
        const compra = await this.prisma.compra.findUnique({
            where: { Id: id },
            include: { proveedor: true }
        });

        if (!compra?.proveedor) {
            throw new BadRequestException('La compra no tiene un proveedor asociado.');
        }
        if (!compra || compra.proveedor.Id_tienda !== Id_tienda) {
            throw new NotFoundException('No tienes permiso para modificar esta compra');
        }
        return this.prisma.$transaction(async (tx) => {
            // Buscar el detalle actual
            const detalle = await tx.productocompra.findUnique({
                where: { Id: productoCompraId }
            });
            if (!detalle) throw new NotFoundException('Detalle de producto no encontrado');

            // Validar que Id_producto y cantidad no sean null
            if (!detalle.Id_producto || detalle.cantidad == null) {
                throw new Error('Detalle de compra con datos incompletos');
            }

            // Ajustar stock
            const diferencia = dto.cantidad - detalle.cantidad;
            await tx.producto.update({
                where: { Id: detalle.Id_producto },
                data: { stock: { increment: diferencia } }
            });

            // Actualizar el detalle
            await tx.productocompra.update({
                where: { Id: productoCompraId },
                data: { cantidad: dto.cantidad }
            });

            return { message: 'Producto de compra actualizado' };
        });
    }


    async eliminarProductoDeCompra(id: string, productoCompraId: string, Id_Tienda: string) {

        const compra = await this.prisma.compra.findUnique({
            where: { Id: id },
            include: { proveedor: true }
        });
        if (!compra?.proveedor) {
            throw new BadRequestException('La compra no tiene un proveedor asociado.');
        }
        if (!compra || compra.proveedor.Id_tienda !== Id_Tienda) {
            throw new NotFoundException('No tienes permiso para modificar esta compra');
        }
        return this.prisma.$transaction(async (tx) => {
            // Buscar detalle
            const detalle = await tx.productocompra.findUnique({
                where: { Id: productoCompraId }
            });
            if (!detalle) throw new NotFoundException('Detalle no encontrado');

            // Validar que Id_producto y cantidad no sean null
            if (!detalle.Id_producto || detalle.cantidad == null) {
                throw new Error('Detalle de compra con datos incompletos');
            }

            // Revertir stock
            await tx.producto.update({
                where: { Id: detalle.Id_producto },
                data: { stock: { decrement: detalle.cantidad } }
            });

            // Eliminar el detalle
            await tx.productocompra.delete({
                where: { Id: productoCompraId }
            });

            return { message: 'Producto eliminado de la compra' };
        });
    }


}
