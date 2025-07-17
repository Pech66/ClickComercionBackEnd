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


        if (dto.sku && !/^[a-zA-Z0-9\-]+$/.test(dto.sku)) {
            throw new BadRequestException('Sku,Folio inválido, solo permite letras, números y guiones.');
        }
        if (dto.total <= 0) {
            throw new BadRequestException('El total de la compra debe ser mayor a 0.');
        }
        return this.prisma.$transaction(async (tx) => {
            const fechaConvertida = new Date(dto.fecha + 'T00:00:00.000Z');

            // Crear la compra
            const compra = await tx.compra.create({
                data: {
                    Id_proveedor: dto.Id_proveedor,
                    fecha: fechaConvertida,
                    total: dto.total,
                    sku: dto.sku,
                }
            });

            // Procesar productos de la compra
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
            },
            orderBy: { fecha: 'desc' }
        });
    }

    async editarCompraTicket(id: string, dto: DtoEditarProductoCompra, Id_tienda: string) {
        return this.prisma.$transaction(async (tx) => {
            //  Verificar que la compra existe
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



            return compraActualizada;
        });
    }


    async obtenerCompraPorId(id: string, Id_tienda: string) {
        const whereCondition: any = { Id: id };

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

    async editarCompra(id: string, dto: DtoEditarProductoCompra, Id_tienda: string) {
        return this.prisma.$transaction(async (tx) => {
            // 1. Verificar que la compra existe y pertenece a la tienda
            const compraExistente = await tx.compra.findUnique({
                where: { Id: id },
                include: {
                    proveedor: true,
                    productocompra: true,
                }
            });

            if (!compraExistente?.proveedor) {
                throw new BadRequestException('La compra no tiene un proveedor asociado.');
            }
            if (compraExistente.proveedor.Id_tienda !== Id_tienda) {
                throw new NotFoundException('No tienes permiso para editar esta compra');
            }

            // Validaciones especiales para la fecha
            if (dto.fecha && compraExistente.productocompra.length > 0) {
                const nuevaFecha = new Date(dto.fecha);
                const fechaActual = compraExistente.fecha ?? nuevaFecha;

                // 1. No permitir que la compra se "adelante" sobre ventas que ya existen antes de la nueva fecha
                const idsConNull: (string | null)[] = compraExistente.productocompra.map(p => p.Id_producto);
                const ids: string[] = idsConNull.filter((id): id is string => id !== null);

                // Ahora puedes usar 'ids' en el filtro 'in'
                const ventasPrevias = await tx.detallesventa.findFirst({
                    where: {
                        Id_producto: { in: ids },
                        venta: {
                            fechaDeVenta: {
                                lte: nuevaFecha // Venta previa o igual a la nueva fecha de compra
                            }
                        }
                    }
                });
                if (ventasPrevias) {
                    throw new BadRequestException(
                        'No puedes poner la fecha de la compra igual o posterior a ventas existentes de sus productos.'
                    );
                }

                // 2. No permitir "atrasar" la compra si hay ventas de ese producto entre la nueva fecha y la fecha original
                if (fechaActual > nuevaFecha) {
                    for (const detalle of compraExistente.productocompra) {
                        const ventaExistente = await tx.detallesventa.findFirst({
                            where: {
                                Id_producto: detalle.Id_producto,
                                venta: {
                                    fechaDeVenta: {
                                        gt: nuevaFecha,
                                        lt: fechaActual
                                    }
                                }
                            }
                        });
                        if (ventaExistente) {
                            throw new BadRequestException(
                                `No puedes mover la compra a una fecha anterior (${dto.fecha}) porque existen ventas del producto ${detalle.Id_producto} después de esa fecha.`
                            );
                        }
                    }
                }
            }

            // Actualizar datos básicos
            const compraActualizada = await tx.compra.update({
                where: { Id: id },
                data: {
                    ...(dto.fecha && { fecha: new Date(dto.fecha) }),
                    ...(dto.total !== undefined && { total: dto.total }),
                    ...(dto.sku !== undefined && { sku: dto.sku }),
                    ...(dto.Id_proveedor !== undefined && { Id_proveedor: dto.Id_proveedor }),
                }
            });

            return compraActualizada;
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
                // Validar cantidad
                if (!prod.cantidad || prod.cantidad <= 0) {
                    throw new BadRequestException(
                        `La cantidad para el producto ${prod.Id_producto} debe ser mayor que cero`
                    );
                }
                // Validar que el producto exista y pertenezca a la tienda
                const producto = await tx.producto.findUnique({
                    where: { Id: prod.Id_producto },
                    include: { almacen: true }
                });
                if (!producto) {
                    throw new BadRequestException(`Producto ${prod.Id_producto} no existe`);
                }
                if (!producto.almacen || producto.almacen.Id_tienda !== Id_tienda) {
                    throw new ForbiddenException(`No tienes permiso para usar el producto ${prod.Id_producto}`);
                }
                // Revisar si ya existe el producto en esa compra
                const detalleExistente = await tx.productocompra.findFirst({
                    where: { Id_compra: id, Id_producto: prod.Id_producto }
                });
                if (detalleExistente) {
                    // Sumar cantidad al detalle existente
                    await tx.productocompra.update({
                        where: { Id: detalleExistente.Id },
                        data: { cantidad: { increment: prod.cantidad } }
                    });
                } else {
                    // Crear nuevo detalle de compra
                    await tx.productocompra.create({
                        data: {
                            Id_compra: id,
                            Id_producto: prod.Id_producto,
                            cantidad: prod.cantidad,
                        }
                    });
                }
                // Actualizar stock del producto
                await tx.producto.update({
                    where: { Id: prod.Id_producto },
                    data: { stock: { increment: prod.cantidad } }
                });
            }
            return { message: 'Productos agregados correctamente' };
        });
    }

    async editarProductoDeCompra(
        id: string,
        productoCompraId: string,
        dto: DtoEditarProductoCompraUnitario,
        Id_tienda: string
    ) {
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
        if (!compra.fecha) {
            throw new BadRequestException('La compra no tiene fecha registrada.');
        }

        return this.prisma.$transaction(async (tx) => {
            const detalle = await tx.productocompra.findUnique({
                where: { Id: productoCompraId }
            });
            if (!detalle) throw new NotFoundException('Detalle de producto no encontrado');
            if (!detalle.Id_producto || detalle.cantidad == null) {
                throw new Error('Detalle de compra con datos incompletos');
            }

            // Validar nueva cantidad
            if (dto.cantidad == null || dto.cantidad <= 0) {
                throw new BadRequestException('La cantidad debe ser mayor que cero. Si deseas eliminar el producto, usa el endpoint correspondiente.');
            }

            // Validar que el producto siga existiendo y pertenezca a la tienda
            const producto = await tx.producto.findUnique({
                where: { Id: detalle.Id_producto },
                include: { almacen: true }
            });
            if (!producto) {
                throw new BadRequestException(`Producto ${detalle.Id_producto} no existe`);
            }
            if (!producto.almacen || producto.almacen.Id_tienda !== Id_tienda) {
                throw new ForbiddenException(`No tienes permiso para usar el producto ${detalle.Id_producto}`);
            }

            // PROTECCIÓN: No permitir editar si hay ventas posteriores
            const ventasPosteriores = await tx.detallesventa.findFirst({
                where: {
                    Id_producto: detalle.Id_producto,
                    venta: {
                        // PRÁCTICO Y SEGURO: sabemos que compra.fecha NO es null porque lo validamos arriba
                        fechaDeVenta: { gt: compra.fecha as Date }
                    }
                }
            });
            if (ventasPosteriores) {
                throw new BadRequestException(
                    `No puedes editar la cantidad porque ya existen ventas de este producto después de la compra.`
                );
            }

            const diferencia = dto.cantidad - detalle.cantidad;
            const stockActual = Number(producto.stock ?? 0);

            if (diferencia < 0 && stockActual < Math.abs(diferencia)) {
                throw new BadRequestException(
                    `No hay suficiente stock del producto ${producto.nombre || detalle.Id_producto} para disminuir la cantidad`
                );
            }

            // Actualizar el stock
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





}