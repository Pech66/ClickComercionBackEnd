import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';
import { AgregarProductoVentaDto } from './dto/agregar.producto.venta.dto';
import { FinalizarVentaDto } from './dto/finalizar.venta.dto';

@Injectable()
export class VentasService {
    constructor(private prisma: PrismaService) { }

    async iniciarVenta(Id_tienda: string) {
        try {
            const tienda = await this.prisma.tienda.findUnique({
                where: { Id: Id_tienda },
                select: { Id: true, nombre: true }
            });

            if (!tienda) {
                throw new NotFoundException(`Tienda con ID ${Id_tienda} no encontrada`);
            }

            const ventaActiva = await this.prisma.venta.findFirst({
                where: {
                    Id_tienda: Id_tienda,
                    cantidad_recibida: { lte: 0 }
                },
                orderBy: { fechaDeVenta: 'desc' }
            });

            if (ventaActiva) {
                return {
                    venta_existente: true,
                    venta_id: ventaActiva.Id,
                    tienda: tienda,
                    fecha_creacion: ventaActiva.fechaDeVenta?.toISOString(),
                    estado: 'activa_existente',
                    mensaje: `Ya tienes una venta activa en ${tienda.nombre}. Puedes continuar agregando productos.`
                };
            }

            const nuevaVenta = await this.prisma.venta.create({
                data: {
                    Id_tienda: Id_tienda,
                    fechaDeVenta: new Date(),
                    total_venta: 0,
                    cantidad_recibida: 0,
                    cambio_devuelto: 0
                }
            });

            return {
                venta_creada: true,
                venta_id: nuevaVenta.Id,
                tienda: tienda,
                fecha_creacion: nuevaVenta.fechaDeVenta?.toISOString(),
                estado: 'nueva_venta',
                mensaje: `Nueva venta iniciada para ${tienda.nombre}`
            };

        } catch (error) {
            throw new BadRequestException(`Error al iniciar venta: ${error.message}`);
        }
    }

    async buscarProductosDisponibles(ventaId: string, Id_tienda: string, query?: string, categoriaId?: string) {
        const venta = await this.validarVentaActiva(ventaId, Id_tienda);

        const where: any = {
            almacen: { Id_tienda },
            stock: { gt: 0 }
        };
        if (query) {
            where.OR = [
                { nombre: { contains: query } },
                { codigobarra: { equals: query } }
            ];
        }
        if (categoriaId) {
            where.Id_categoria = categoriaId;
        }

        const productos = await this.prisma.producto.findMany({
            where,
            include: this.getProductoInclude(),
            orderBy: [{ nombre: 'asc' }],
            take: 20
        });

        return this.formatearRespuestaBusqueda(ventaId, venta, productos);
    }

    async buscarProductoPorCodigo(ventaId: string, Id_tienda: string, codigo: string) {
        await this.validarVentaActiva(ventaId, Id_tienda);

        const producto = await this.prisma.producto.findFirst({
            where: {
                codigobarra: codigo,
                almacen: { Id_tienda: Id_tienda },
                stock: { gt: 0 }
            },
            include: this.getProductoInclude()
        });

        if (!producto) {
            throw new NotFoundException('Producto no encontrado o sin stock en tu tienda');
        }

        return {
            producto: {
                id: producto.Id,
                nombre: producto.nombre,
                codigo_barra: producto.codigobarra,
                foto_url: producto.fotoUrl,
                stock_disponible: producto.stock,
                es_granel: producto.esgranel,
                unidad_medida: producto.unidaddemedida,
                precio_venta: producto.precioventa,
                tipo_producto: producto.esgranel ? 'granel' : 'normal',
                precio_mostrar: producto.precioventa,
                requiere_cantidad: producto.esgranel,
                instrucciones: producto.esgranel
                    ? `Especificar cantidad en ${producto.unidaddemedida || 'kg'}`
                    : 'Se agrega 1 unidad automáticamente (o especificar cantidad)'
            }
        };
    }

    async verVentaActual(ventaId: string, Id_tienda: string) {
        const venta = await this.prisma.venta.findFirst({
            where: { Id: ventaId, Id_tienda: Id_tienda },
            include: {
                tienda: { select: { Id: true, nombre: true } },
                detallesventa: {
                    include: {
                        producto: {
                            include: {
                                almacen: { select: { Id: true, nombre: true } }
                            }
                        }
                    }
                }
            }
        });

        if (!venta) {
            throw new NotFoundException(`Venta ${ventaId} no encontrada en tu tienda`);
        }

        const estaFinalizada = Number(venta.cantidad_recibida || 0) > 0;

        return {
            venta: {
                Id: venta.Id,
                fecha_creacion: venta.fechaDeVenta?.toISOString(),
                total_venta: Number(venta.total_venta || 0),
                estado: estaFinalizada ? 'finalizada' : 'activa',
                puede_modificar: !estaFinalizada,
                tienda: venta.tienda
            },
            productos_en_venta: venta.detallesventa.map(detalle => ({
                detalle_id: detalle.Id,
                producto: {
                    Id: detalle.producto?.Id || '',
                    nombre: detalle.producto?.nombre || 'Sin nombre',
                    descripcion: detalle.producto?.descripcion || '',
                    esgranel: detalle.producto?.esgranel || false,
                    unidad: detalle.producto?.unidaddemedida || (detalle.producto?.esgranel ? 'kg' : 'unidades'),
                    stock_disponible: detalle.producto?.stock || 0,
                    almacen: detalle.producto?.almacen?.nombre || 'Sin almacén',
                    fotoUrl: detalle.producto?.fotoUrl
                },
                cantidad_en_venta: Number(detalle.cantidad_recibida || 0),
                precio_unitario: Number(detalle.producto?.precioventa ?? 0),
                subtotal: Number(detalle.subtotal || 0),
                puede_aumentar: !estaFinalizada && (detalle.producto?.stock || 0) > Number(detalle.cantidad_recibida || 0)
            })),
            resumen: {
                total_productos: venta.detallesventa.length,
                total_venta: Number(venta.total_venta || 0),
                puede_finalizar: venta.detallesventa.length > 0 && !estaFinalizada
            }
        };
    }

    async aumentarCantidadProducto(ventaId: string, productoId: string, cantidadAdicional: number, Id_tienda: string) {
        return this.prisma.$transaction(async (tx) => {
            const venta = await this.validarVentaActiva(ventaId, Id_tienda);
            const producto = await this.validarProductoParaVenta(productoId, Id_tienda);

            const detalle = await tx.detallesventa.findFirst({
                where: { Id_venta: ventaId, Id_producto: productoId }
            });

            if (!detalle) {
                throw new BadRequestException('Producto no encontrado en esta venta');
            }

            const nuevaCantidad = Number(detalle.cantidad_recibida || 0) + cantidadAdicional;
            const stockDisponible = Number(producto.stock ?? 0);

            if (stockDisponible < Math.ceil(nuevaCantidad)) {
                throw new BadRequestException(
                    `Stock insuficiente. Disponible: ${stockDisponible}, Necesario: ${Math.ceil(nuevaCantidad)}`
                );
            }

            const precioUnitario = Number(producto.precioventa ?? 0);
            const nuevoSubtotal = nuevaCantidad * precioUnitario;

            const detalleActualizado = await tx.detallesventa.update({
                where: { Id: detalle.Id },
                data: {
                    cantidad_recibida: nuevaCantidad,
                    subtotal: new Decimal(nuevoSubtotal),
                    precio_unitario: precioUnitario
                }
            });

            await this.actualizarTotalesVenta(ventaId, tx);

            return {
                producto_actualizado: {
                    nombre: producto.nombre,
                    cantidad_anterior: Number(detalle.cantidad_recibida),
                    cantidad_nueva: nuevaCantidad,
                    subtotal: nuevoSubtotal,
                    almacen: producto.almacen?.nombre
                },
                venta_actualizada: await this.obtenerResumenVenta(ventaId, tx),
                mensaje: `📈 ${producto.nombre}: ${Number(detalle.cantidad_recibida)} → ${nuevaCantidad}`
            };
        });
    }

    async agregarProductoInteligente(ventaId: string, data: AgregarProductoVentaDto, Id_tienda: string) {
        return this.prisma.$transaction(async (tx) => {
            const venta = await this.validarVentaActiva(ventaId, Id_tienda);
            const producto = await this.validarProductoParaVenta(data.Id_producto, Id_tienda);

            const stockActual = producto.stock ?? 0;

            let cantidad: number;
            if (producto.esgranel) {
                if (!data.cantidad || data.cantidad <= 0) {
                    throw new BadRequestException(
                        `El producto "${producto.nombre}" es a granel. Debe especificar la cantidad en ${producto.unidaddemedida || 'kg'}`
                    );
                }
                cantidad = data.cantidad;
            } else {
                cantidad = data.cantidad || 1;
            }

            if (stockActual < cantidad) {
                throw new BadRequestException(
                    `Stock insuficiente. Disponible: ${stockActual} ${producto.unidaddemedida || (producto.esgranel ? 'kg' : 'unidades')}, Requerido: ${cantidad} ${producto.unidaddemedida || (producto.esgranel ? 'kg' : 'unidades')}`
                );
            }

            const detalleExistente = await tx.detallesventa.findFirst({
                where: {
                    Id_venta: ventaId,
                    Id_producto: data.Id_producto
                }
            });

            const precioUnitario = Number(producto.precioventa ?? 0);

            if (detalleExistente) {
                const cantidadExistente = detalleExistente.cantidad_recibida ? Number(detalleExistente.cantidad_recibida) : 0;
                const nuevaCantidad = cantidadExistente + cantidad;

                if (nuevaCantidad > stockActual) {
                    throw new BadRequestException(
                        `La cantidad total (${nuevaCantidad}) excedería el stock disponible (${stockActual})`
                    );
                }

                const nuevoSubtotal = nuevaCantidad * precioUnitario;

                const detalleActualizado = await tx.detallesventa.update({
                    where: { Id: detalleExistente.Id },
                    data: {
                        cantidad_recibida: new Decimal(nuevaCantidad),
                        subtotal: new Decimal(nuevoSubtotal),
                        precio_unitario: precioUnitario
                    }
                });

                await this.actualizarTotalesVenta(ventaId, tx);

                const unidad = producto.unidaddemedida || (producto.esgranel ? 'kg' : 'unidades');
                return {
                    mensaje: `Cantidad incrementada del producto "${producto.nombre}" (+${cantidad} ${unidad})`,
                    detalle: this.formatearDetalleVenta(detalleActualizado, producto),
                    accion: 'incrementado',
                    resumen_venta: await this.obtenerResumenVenta(ventaId, tx)
                };
            } else {
                const subtotal = cantidad * precioUnitario;

                const nuevoDetalle = await tx.detallesventa.create({
                    data: {
                        Id_venta: ventaId,
                        Id_producto: data.Id_producto,
                        cantidad_recibida: new Decimal(cantidad),
                        devuelto: new Decimal(0),
                        subtotal: new Decimal(subtotal),
                        precio_unitario: precioUnitario
                    }
                });

                await this.actualizarTotalesVenta(ventaId, tx);

                const unidad = producto.unidaddemedida || (producto.esgranel ? 'kg' : 'unidades');
                return {
                    mensaje: `Producto "${producto.nombre}" agregado (${cantidad} ${unidad})`,
                    detalle: this.formatearDetalleVenta(nuevoDetalle, producto),
                    accion: 'agregado',
                    resumen_venta: await this.obtenerResumenVenta(ventaId, tx)
                };
            }
        });
    }

    async modificarCantidadOEliminarProducto(ventaId: string, productoId: string, nuevaCantidad: number, Id_tienda: string) {
        return this.prisma.$transaction(async (tx) => {
            const venta = await this.validarVentaActiva(ventaId, Id_tienda);
            const producto = await this.validarProductoParaVenta(productoId, Id_tienda);

            const detalle = await tx.detallesventa.findFirst({
                where: { Id_venta: ventaId, Id_producto: productoId }
            });

            if (!detalle) {
                throw new NotFoundException('El producto no está en esta venta');
            }

            if (nuevaCantidad < 0) {
                throw new BadRequestException('La cantidad debe ser mayor o igual a cero');
            }

            if (nuevaCantidad === 0) {
                await tx.detallesventa.delete({ where: { Id: detalle.Id } });
                await this.actualizarTotalesVenta(ventaId, tx);

                return {
                    mensaje: `Producto eliminado de la venta`,
                    accion: 'eliminado',
                    resumen_venta: await this.obtenerResumenVenta(ventaId, tx)
                };
            } else {
                if (producto.stock! < nuevaCantidad) {
                    throw new BadRequestException(
                        `Stock insuficiente. Disponible: ${producto.stock}, requerido: ${nuevaCantidad}`
                    );
                }

                const precioUnitario = Number(producto.precioventa ?? 0);

                const nuevoSubtotal = nuevaCantidad * precioUnitario;

                const detalleActualizado = await tx.detallesventa.update({
                    where: { Id: detalle.Id },
                    data: {
                        cantidad_recibida: nuevaCantidad,
                        subtotal: nuevoSubtotal,
                        precio_unitario: precioUnitario
                    }
                });

                await this.actualizarTotalesVenta(ventaId, tx);

                return {
                    mensaje: `Cantidad modificada (${nuevaCantidad}) para ${producto.nombre}`,
                    accion: 'modificado',
                    detalle: this.formatearDetalleVenta(detalleActualizado, producto),
                    resumen_venta: await this.obtenerResumenVenta(ventaId, tx)
                };
            }
        });
    }

    async procesarPago(ventaId: string, datos: FinalizarVentaDto, Id_tienda: string) {
        return this.prisma.$transaction(async (tx) => {
            const venta = await tx.venta.findFirst({
                where: { Id: ventaId, Id_tienda: Id_tienda },
                include: {
                    tienda: { select: { Id: true, nombre: true } },
                    detallesventa: { include: { producto: true } }
                }
            });

            if (!venta) {
                throw new NotFoundException(`Venta ${ventaId} no encontrada en tu tienda`);
            }

            if (venta.detallesventa.length === 0) {
                throw new BadRequestException('No se puede finalizar una venta sin productos');
            }

            if (Number(venta.cantidad_recibida || 0) > 0) {
                throw new BadRequestException('Esta venta ya fue finalizada');
            }

            const totalVenta = Number(venta.total_venta || 0);
            const cambio = datos.cantidadRecibida - totalVenta;

            if (cambio < 0) {
                throw new BadRequestException(
                    `Faltan $${Math.abs(cambio).toLocaleString()}. Total: $${totalVenta.toLocaleString()}, Recibido: $${datos.cantidadRecibida.toLocaleString()}`
                );
            }

            const gananciaTotal = venta.detallesventa.reduce((total, detalle) => {
                const costo = Number(detalle.producto?.preciodeproveedor || 0) * Number(detalle.cantidad_recibida || 0);
                const ventaTotal = Number(detalle.subtotal || 0);
                return total + (ventaTotal - costo);
            }, 0);

            const ventaFinalizada = await tx.venta.update({
                where: { Id: ventaId },
                data: {
                    cantidad_recibida: new Decimal(datos.cantidadRecibida),
                    cambio_devuelto: new Decimal(cambio),
                    totaldeganancias: new Decimal(gananciaTotal)
                }
            });

            for (const detalle of venta.detallesventa) {
                await tx.producto.update({
                    where: { Id: detalle.Id_producto! },
                    data: { stock: { decrement: Math.ceil(Number(detalle.cantidad_recibida || 0)) } }
                });
            }

            return {
                venta_finalizada: {
                    Id: ventaFinalizada.Id,
                    total_venta: Number(ventaFinalizada.total_venta),
                    cantidad_recibida: Number(ventaFinalizada.cantidad_recibida),
                    cambio_devuelto: Number(ventaFinalizada.cambio_devuelto),
                    ganancia: Number(ventaFinalizada.totaldeganancias),
                    tienda: venta.tienda
                },
                resumen: {
                    productos_vendidos: venta.detallesventa.length,
                    total_cobrado: Number(ventaFinalizada.total_venta),
                    dinero_recibido: datos.cantidadRecibida,
                    cambio: cambio,
                    ganancia: gananciaTotal
                },
                mensaje: `¡VENTA FINALIZADA! Tienda: ${venta.tienda?.nombre}`,
                stock_actualizado: `Stock actualizado en ${venta.detallesventa.length} productos`
            };
        });
    }

    async cancelarVenta(ventaId: string, Id_tienda: string) {
        return this.prisma.$transaction(async (tx) => {
            const venta = await tx.venta.findFirst({
                where: { Id: ventaId, Id_tienda: Id_tienda },
                include: {
                    tienda: { select: { Id: true, nombre: true } },
                    detallesventa: true
                }
            });

            if (!venta) {
                throw new NotFoundException(`Venta ${ventaId} no encontrada en tu tienda`);
            }

            if (Number(venta.cantidad_recibida || 0) > 0) {
                throw new BadRequestException('No se puede cancelar una venta finalizada');
            }

            await tx.venta.delete({ where: { Id: ventaId } });

            return {
                venta_cancelada: {
                    Id: ventaId,
                    productos_que_tenia: venta.detallesventa.length,
                    fecha_cancelacion: new Date().toISOString(),
                    tienda: venta.tienda
                },
                mensaje: `Venta cancelada en ${venta.tienda?.nombre}`,
                nota: 'Stock no fue afectado porque la venta no estaba finalizada'
            };
        });
    }

    // PRIVADOS

    private async validarVentaActiva(ventaId: string, Id_tienda: string) {
        const venta = await this.prisma.venta.findFirst({
            where: { Id: ventaId, Id_tienda: Id_tienda },
            include: { tienda: { select: { Id: true, nombre: true } } }
        });

        if (!venta) {
            throw new NotFoundException(`Venta ${ventaId} no encontrada en tu tienda`);
        }

        if (Number(venta.cantidad_recibida || 0) > 0) {
            throw new BadRequestException('Esta venta ya fue finalizada');
        }

        return venta;
    }

    private async validarProductoParaVenta(productoId: string, Id_tienda: string) {
        const producto = await this.prisma.producto.findFirst({
            where: {
                Id: productoId,
                almacen: { Id_tienda: Id_tienda }
            },
            include: {
                categoria: { select: { Id: true, nombre: true } },
                almacen: { select: { Id: true, nombre: true } }
            }
        });

        if (!producto) {
            throw new NotFoundException('Producto no encontrado en tu tienda');
        }

        return producto;
    }

    private getProductoInclude() {
        return {
            almacen: {
                include: {
                    tienda: { select: { Id: true, nombre: true } }
                }
            },
            categoria: { select: { Id: true, nombre: true } }
        };
    }

    private formatearRespuestaBusqueda(ventaId: string, venta: any, productos: any[]) {
        return {
            venta_id: ventaId,
            tienda: venta.tienda,
            productos_disponibles: productos.map(p => ({
                id: p.Id,
                nombre: p.nombre,
                codigo_barra: p.codigobarra,
                foto_url: p.fotoUrl,
                stock_disponible: p.stock,
                es_granel: p.esgranel,
                unidad_medida: p.unidaddemedida,
                precio_venta: p.precioventa,
                tipo_producto: p.esgranel ? 'granel' : 'normal',
                precio_mostrar: p.precioventa,
                requiere_cantidad: p.esgranel,
                instrucciones: p.esgranel
                    ? `Especificar cantidad en ${p.unidaddemedida || 'kg'}`
                    : 'Se agrega 1 unidad automáticamente (o especificar cantidad)'
            })),
            total_disponibles: productos.length,
            mensaje: productos.length > 0
                ? `${productos.length} producto(s) encontrado(s)`
                : 'No se encontraron productos disponibles'
        };
    }

    private formatearDetalleVenta(detalle: any, producto: any) {
        return {
            id: detalle.Id,
            producto_id: producto.Id,
            producto_nombre: producto.nombre,
            cantidad: Number(detalle.cantidad_recibida || 0),
            unidad: producto.unidaddemedida || (producto.esgranel ? 'kg' : 'unidades'),
            precio_unitario: Number(producto.precioventa ?? 0),
            subtotal: Number(detalle.subtotal || 0),
            tipo: producto.esgranel ? 'granel' : 'normal'
        };
    }

    private async actualizarTotalesVenta(ventaId: string, tx: any) {
        const detalles = await tx.detallesventa.findMany({
            where: { Id_venta: ventaId }
        });

        const totalVenta = detalles.reduce(
            (total, detalle) => total + Number(detalle.subtotal || 0),
            0
        );

        await tx.venta.update({
            where: { Id: ventaId },
            data: { total_venta: new Decimal(totalVenta) }
        });
    }

    private async obtenerResumenVenta(ventaId: string, tx: any) {
        const venta = await tx.venta.findUnique({
            where: { Id: ventaId },
            include: { detallesventa: true }
        });

        return {
            total_productos: venta.detallesventa.length,
            total_venta: Number(venta.total_venta || 0)
        };
    }

    async historialDetallesVenta(
        Id_tienda: string,
        opciones: { desde?: string, hasta?: string, pagina?: number, limite?: number, producto?: string }
    ) {
        const { desde, hasta, pagina = 1, limite = 20, producto } = opciones;
        const where: any = {
            venta: { Id_tienda }
        };
        if (desde) {
            where.venta = { ...where.venta, fechaDeVenta: { gte: new Date(desde) } };
        }
        if (hasta) {
            where.venta = {
                ...where.venta,
                fechaDeVenta: {
                    ...(where.venta?.fechaDeVenta || {}),
                    lte: new Date(hasta)
                }
            };
        }
        if (producto) {
            where.producto = {
                OR: [
                    { nombre: { contains: producto } },
                    { codigobarra: { contains: producto } }
                ]
            };
        }
        const [detalles, total] = await this.prisma.$transaction([
            this.prisma.detallesventa.findMany({
                where,
                orderBy: [{ venta: { fechaDeVenta: 'desc' } }],
                skip: (pagina - 1) * limite,
                take: limite,
                include: {
                    producto: true,
                    venta: true
                }
            }),
            this.prisma.detallesventa.count({ where })
        ]);
        return {
            pagina,
            limite,
            total,
            historial: detalles.map(d => ({
                id_detalle: d.Id,
                id_producto: d.Id_producto,
                nombre_producto: d.producto?.nombre,
                codigobarra: d.producto?.codigobarra,
                cantidad: Number(d.cantidad_recibida || 0),
                subtotal: Number(d.subtotal || 0),
                precio_unitario: Number(d.producto?.precioventa ?? 0),
                fecha_venta: d.venta?.fechaDeVenta,
                id_venta: d.venta?.Id,
                total_venta: Number(d.venta?.total_venta || 0)
            }))
        };
    }
}