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
            // Verificar que la tienda existe
            const tienda = await this.prisma.tienda.findUnique({
                where: { Id: Id_tienda },
                select: { Id: true, nombre: true }
            });

            if (!tienda) {
                throw new NotFoundException(`Tienda con ID ${Id_tienda} no encontrada`);
            }

            // Verificar si hay una venta activa
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

            // Crear nueva venta
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

    async buscarProductosDisponibles(ventaId: string, Id_tienda: string) {
        // Verificar que la venta existe y pertenece a la tienda
        const venta = await this.validarVentaActiva(ventaId, Id_tienda);

        // Construir condiciones de búsqueda
        const baseWhere = {
            almacen: { Id_tienda: Id_tienda },
            stock: { gt: 0 }
        };

        const productos = await this.prisma.producto.findMany({
            include: this.getProductoInclude(),
            orderBy: [{ nombre: 'asc' }],
            take: 15
        });

    }

  

    async verVentaActual(ventaId: string, Id_tienda: string) {
        const venta = await this.prisma.venta.findFirst({
            where: {
                Id: ventaId,
                Id_tienda: Id_tienda
            },
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
                    unidad: detalle.producto?.unidaddemedida || 'unidades',
                    stock_disponible: detalle.producto?.stock || 0,
                    almacen: detalle.producto?.almacen?.nombre || 'Sin almacén',
                    fotoUrl: detalle.producto?.fotoUrl
                },
                cantidad_en_venta: Number(detalle.cantidad_recibida || 0),
                precio_unitario: detalle.producto?.esgranel
                    ? Number(detalle.producto?.preciokilo || 0)
                    : Number(detalle.producto?.precioventa || 0),
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
            // Verificar que la venta pertenece a esta tienda
            const venta = await this.validarVentaActiva(ventaId, Id_tienda);

            // Verificar que el producto pertenece a un almacén de esta tienda
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

            const precioUnitario = producto.esgranel
                ? Number(producto.preciokilo || 0)
                : Number(producto.precioventa || 0);
            const nuevoSubtotal = nuevaCantidad * precioUnitario;

            const detalleActualizado = await tx.detallesventa.update({
                where: { Id: detalle.Id },
                data: {
                    cantidad_recibida: nuevaCantidad,
                    subtotal: new Decimal(nuevoSubtotal)
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

    async procesarPago(ventaId: string, datos: FinalizarVentaDto, Id_tienda: string) {
        return this.prisma.$transaction(async (tx) => {
            const venta = await tx.venta.findFirst({
                where: {
                    Id: ventaId,
                    Id_tienda: Id_tienda
                },
                include: {
                    tienda: { select: { Id: true, nombre: true } },
                    detallesventa: {
                        include: {
                            producto: true
                        }
                    }
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

            // Calcular ganancia
            const gananciaTotal = venta.detallesventa.reduce((total, detalle) => {
                const costo = Number(detalle.producto?.preciodeproveedor || 0) * Number(detalle.cantidad_recibida || 0);
                const ventaTotal = Number(detalle.subtotal || 0);
                return total + (ventaTotal - costo);
            }, 0);

            // Finalizar venta
            const ventaFinalizada = await tx.venta.update({
                where: { Id: ventaId },
                data: {
                    cantidad_recibida: new Decimal(datos.cantidadRecibida),
                    cambio_devuelto: new Decimal(cambio),
                    totaldeganancias: new Decimal(gananciaTotal)
                }
            });

            // Actualizar stock de productos
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
                where: {
                    Id: ventaId,
                    Id_tienda: Id_tienda
                },
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
    // Métodos auxiliares privados
    private async validarVentaActiva(ventaId: string, Id_tienda: string) {
        const venta = await this.prisma.venta.findFirst({
            where: {
                Id: ventaId,
                Id_tienda: Id_tienda
            },
            include: {
                tienda: { select: { Id: true, nombre: true } }
            }
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
                precio_kilo: p.preciokilo,
                tipo_producto: p.esgranel ? 'granel' : 'normal',
                precio_mostrar: p.esgranel ? p.preciokilo : p.precioventa,
                requiere_cantidad: p.esgranel,
                instrucciones: p.esgranel
                    ? `Especificar cantidad en ${p.unidaddemedida}`
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
            cantidad: detalle.cantidad_recibida,
            unidad: producto.unidaddemedida || (producto.esgranel ? 'kg' : 'unidades'),
            precio_unitario: producto.esgranel ? producto.preciokilo : producto.precioventa,
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

      // MÉTODO UNIFICADO: Agregar producto inteligente
    async agregarProductoInteligente(ventaId: string, data: AgregarProductoVentaDto, Id_tienda: string) {
        return this.prisma.$transaction(async (tx) => {
            // Validar venta activa
            const venta = await this.validarVentaActiva(ventaId, Id_tienda);

            // Obtener y validar producto
            const producto = await this.validarProductoParaVenta(data.Id_producto, Id_tienda);

            // Validar stock no nulo y convertir a número
            const stockActual = producto.stock ?? 0;

            // Determinar cantidad según tipo de producto
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

            // Validar stock suficiente
            if (stockActual < cantidad) {
                throw new BadRequestException(
                    `Stock insuficiente. Disponible: ${stockActual} ${producto.unidaddemedida || 'unidades'}, Requerido: ${cantidad} ${producto.unidaddemedida || 'unidades'}`
                );
            }

            // Verificar si ya existe en la venta
            const detalleExistente = await tx.detallesventa.findFirst({
                where: {
                    Id_venta: ventaId,
                    Id_producto: data.Id_producto
                }
            });

            const precioUnitario = producto.esgranel
                ? Number(producto.preciokilo ?? 0)
                : Number(producto.precioventa ?? 0);

            if (detalleExistente) {
                // Convertir cantidad_recibida a number (por si es Decimal o null)
                const cantidadExistente = detalleExistente.cantidad_recibida ? Number(detalleExistente.cantidad_recibida) : 0;
                const nuevaCantidad = cantidadExistente + cantidad;

                // Validar que la nueva cantidad no exceda el stock
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
                        subtotal: new Decimal(nuevoSubtotal)
                    }
                });

                await this.actualizarTotalesVenta(ventaId, tx);

                return {
                    mensaje: `Cantidad incrementada del producto "${producto.nombre}" (+${cantidad} ${producto.unidaddemedida || 'unidades'})`,
                    detalle: this.formatearDetalleVenta(detalleActualizado, producto),
                    accion: 'incrementado',
                    resumen_venta: await this.obtenerResumenVenta(ventaId, tx)
                };
            } else {
                // Crear nuevo detalle
                const subtotal = cantidad * precioUnitario;

                const nuevoDetalle = await tx.detallesventa.create({
                    data: {
                        Id_venta: ventaId,
                        Id_producto: data.Id_producto,
                        cantidad_recibida: new Decimal(cantidad),
                        devuelto: new Decimal(0),
                        subtotal: new Decimal(subtotal)
                    }
                });

                await this.actualizarTotalesVenta(ventaId, tx);

                return {
                    mensaje: `Producto "${producto.nombre}" agregado ${producto.esgranel ? `(${cantidad} ${producto.unidaddemedida})` : `(${cantidad} unidades)`}`,
                    detalle: this.formatearDetalleVenta(nuevoDetalle, producto),
                    accion: 'agregado',
                    resumen_venta: await this.obtenerResumenVenta(ventaId, tx)
                };
            }
        });
    }
}