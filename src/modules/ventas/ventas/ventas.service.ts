import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';
import { AgregarProductoVentaDto } from './dto/agregar.producto.venta.dto';
import { FinalizarVentaDto } from './dto/finalizar.venta.dto';

type ServiceStatus = 'success' | 'error' | 'warning' | 'info' | 'need_input';

export interface ServiceResponse<T = any> {
  status: ServiceStatus;
  code: string;
  mensaje: string;
  data: T | null;
}

@Injectable()
export class VentasService {
  constructor(private prisma: PrismaService) { }

  async iniciarVenta(Id_tienda: string): Promise<ServiceResponse> {
    try {
      const tienda = await this.prisma.tienda.findUnique({
        where: { Id: Id_tienda },
        select: { Id: true, nombre: true }
      });

      if (!tienda) {
        return {
          status: 'error',
          code: 'TIENDA_NO_ENCONTRADA',
          mensaje: 'No se encontró la tienda. Por favor revisa tus datos.',
          data: null
        };
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
          status: 'info',
          code: 'VENTA_ACTIVA',
          mensaje: `Ya tienes una venta activa en ${tienda.nombre}. Puedes continuar agregando productos.`,
          data: {
            venta_id: ventaActiva.Id,
            tienda: tienda,
            fecha_creacion: ventaActiva.fechaDeVenta?.toISOString(),
          }
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
        status: 'success',
        code: 'VENTA_CREADA',
        mensaje: `Nueva venta iniciada para ${tienda.nombre}.`,
        data: {
          venta_id: nuevaVenta.Id,
          tienda: tienda,
          fecha_creacion: nuevaVenta.fechaDeVenta?.toISOString(),
        }
      };
    } catch (error) {
      return {
        status: 'error',
        code: 'ERROR_INICIAR_VENTA',
        mensaje: 'Ocurrió un error al iniciar la venta. Intenta de nuevo.',
        data: null
      };
    }
  }

  async buscarProductoPorCodigo(
    ventaId: string,
    Id_tienda: string,
    codigo: string
  ): Promise<ServiceResponse> {
    const venta = await this.validarVentaActivaAccesible(ventaId, Id_tienda);
    if (venta.status && venta.status !== 'success') return venta;

    const producto = await this.prisma.producto.findFirst({
      where: {
        codigobarra: codigo,
        almacen: { Id_tienda: Id_tienda },
        stock: { gt: 0 }
      },
      include: this.getProductoInclude()
    });

    if (!producto) {
      return {
        status: 'warning',
        code: 'PRODUCTO_NO_ENCONTRADO',
        mensaje: 'Producto no encontrado o sin stock. Verifica el código o intenta con otro producto.',
        data: null
      };
    }

    return {
      status: 'success',
      code: 'PRODUCTO_ENCONTRADO',
      mensaje: `Producto encontrado: "${producto.nombre}".`,
      data: {
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
            ? `Especifica la cantidad en ${producto.unidaddemedida || 'kg'}.`
            : 'Se agrega 1 unidad automáticamente (o puedes especificar la cantidad).'
        }
      }
    };
  }

  async verVentaActual(
    ventaId: string,
    Id_tienda: string
  ): Promise<ServiceResponse> {
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
      return {
        status: 'error',
        code: 'VENTA_NO_ENCONTRADA',
        mensaje: `No se encontró la venta seleccionada.`,
        data: null
      };
    }

    const estaFinalizada = Number(venta.cantidad_recibida || 0) > 0;

    return {
      status: 'success',
      code: estaFinalizada ? 'VENTA_FINALIZADA' : 'VENTA_ACTIVA',
      mensaje: estaFinalizada
        ? 'Esta venta ya fue finalizada. No se pueden hacer cambios.'
        : 'Venta activa. Puedes seguir agregando/modificando productos.',
      data: {
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
      }
    };
  }

  async aumentarCantidadProducto(
    ventaId: string,
    productoId: string,
    cantidadAdicional: number,
    Id_tienda: string
  ): Promise<ServiceResponse> {
    return this.prisma.$transaction(async (tx) => {
      const venta = await this.validarVentaActivaAccesible(ventaId, Id_tienda);
      if (venta.status && venta.status !== 'success') return venta;

      const producto = await this.validarProductoParaVentaAccesible(productoId, Id_tienda);
      if (producto.status && producto.status !== 'success') return producto;

      const detalle = await tx.detallesventa.findFirst({
        where: { Id_venta: ventaId, Id_producto: productoId }
      });

      if (!detalle) {
        return {
          status: 'warning',
          code: 'PRODUCTO_NO_EN_VENTA',
          mensaje: 'El producto no está en esta venta.',
          data: null
        };
      }

      // Aquí la validación extra para tipo de producto
      if (producto.data.esGranel) {
        // Granel: cantidad puede ser decimal (mayor a 0)
        if (isNaN(cantidadAdicional) || cantidadAdicional <= 0) {
          return {
            status: 'warning',
            code: 'CANTIDAD_INVALIDA',
            mensaje: 'Para productos a granel la cantidad debe ser un número decimal mayor a 0.',
            data: null
          };
        }
      } else {
        // No granel: solo enteros
        if (!Number.isInteger(cantidadAdicional) || cantidadAdicional <= 0) {
          return {
            status: 'warning',
            code: 'CANTIDAD_INVALIDA',
            mensaje: 'Solo puedes vender cantidades enteras para este producto.',
            data: null
          };
        }
      }

      const nuevaCantidad = Number(detalle.cantidad_recibida || 0) + cantidadAdicional;
      const stockDisponible = Number(producto.data.stock ?? 0);

      if (nuevaCantidad > stockDisponible) {
        return {
          status: 'warning',
          code: 'STOCK_INSUFICIENTE',
          mensaje: `No hay suficiente stock. Disponible: ${stockDisponible}, Necesario: ${nuevaCantidad}.`,
          data: null
        };
      }

      const precioUnitario = Number(producto.data.precioventa ?? 0);
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
        status: 'success',
        code: 'CANTIDAD_AUMENTADA',
        mensaje: `La cantidad de "${producto.data.nombre}" se aumentó correctamente.`,
        data: {
          producto_actualizado: {
            nombre: producto.data.nombre,
            cantidad_anterior: Number(detalle.cantidad_recibida),
            cantidad_nueva: nuevaCantidad,
            subtotal: nuevoSubtotal,
            almacen: producto.data.almacen?.nombre
          },
          venta_actualizada: await this.obtenerResumenVenta(ventaId, tx)
        }
      };
    });
  }

  async agregarProductoInteligente(
    ventaId: string,
    data: AgregarProductoVentaDto,
    Id_tienda: string
  ): Promise<ServiceResponse> {
    return this.prisma.$transaction(async (tx) => {
      const venta = await this.validarVentaActivaAccesible(ventaId, Id_tienda);
      if (venta.status && venta.status !== 'success') return venta;

      const producto = await this.validarProductoParaVentaAccesible(data.Id_producto, Id_tienda);
      if (producto.status && producto.status !== 'success') return producto;

      const stockActual = producto.data.stock ?? 0;
      let cantidad: number;
      if (producto.data.esgranel) {
        if (!data.cantidad || data.cantidad <= 0) {
          return {
            status: 'need_input',
            code: 'CANTIDAD_GRANEL_FALTANTE',
            mensaje: `El producto "${producto.data.nombre}" es a granel. Especifica la cantidad a vender.`,
            data: {
              instrucciones: `Indica la cantidad en ${producto.data.unidaddemedida || 'kg'}.`
            }
          };
        }
        cantidad = data.cantidad;
      } else {
        cantidad = data.cantidad || 1;
      }

      if (stockActual < cantidad) {
        return {
          status: 'warning',
          code: 'STOCK_INSUFICIENTE',
          mensaje: `No hay suficiente stock. Disponible: ${stockActual} ${producto.data.unidaddemedida || (producto.data.esgranel ? 'kg' : 'unidades')}, Requerido: ${cantidad} ${producto.data.unidaddemedida || (producto.data.esgranel ? 'kg' : 'unidades')}.`,
          data: null
        };
      }

      const detalleExistente = await tx.detallesventa.findFirst({
        where: {
          Id_venta: ventaId,
          Id_producto: data.Id_producto
        }
      });

      const precioUnitario = Number(producto.data.precioventa ?? 0);

      if (detalleExistente) {
        const cantidadExistente = detalleExistente.cantidad_recibida ? Number(detalleExistente.cantidad_recibida) : 0;
        const nuevaCantidad = cantidadExistente + cantidad;

        if (nuevaCantidad > stockActual) {
          return {
            status: 'warning',
            code: 'STOCK_INSUFICIENTE',
            mensaje: `La cantidad total (${nuevaCantidad}) excede el stock disponible (${stockActual}).`,
            data: null
          };
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

        const unidad = producto.data.unidaddemedida || (producto.data.esgranel ? 'kg' : 'unidades');
        return {
          status: 'success',
          code: 'CANTIDAD_INCREMENTADA',
          mensaje: `Se incrementó la cantidad del producto "${producto.data.nombre}" (+${cantidad} ${unidad}).`,
          data: {
            detalle: this.formatearDetalleVenta(detalleActualizado, producto.data),
            accion: 'incrementado',
            resumen_venta: await this.obtenerResumenVenta(ventaId, tx)
          }
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

        const unidad = producto.data.unidaddemedida || (producto.data.esgranel ? 'kg' : 'unidades');
        return {
          status: 'success',
          code: 'PRODUCTO_AGREGADO',
          mensaje: `Producto "${producto.data.nombre}" agregado (${cantidad} ${unidad}).`,
          data: {
            detalle: this.formatearDetalleVenta(nuevoDetalle, producto.data),
            accion: 'agregado',
            resumen_venta: await this.obtenerResumenVenta(ventaId, tx)
          }
        };
      }
    });
  }

  async modificarCantidadOEliminarProducto(
    ventaId: string,
    productoId: string,
    nuevaCantidad: number,
    Id_tienda: string
  ): Promise<ServiceResponse> {
    return this.prisma.$transaction(async (tx) => {
      const venta = await this.validarVentaActivaAccesible(ventaId, Id_tienda);
      if (venta.status && venta.status !== 'success') return venta;

      const producto = await this.validarProductoParaVentaAccesible(productoId, Id_tienda);
      if (producto.status && producto.status !== 'success') return producto;

      const detalle = await tx.detallesventa.findFirst({
        where: { Id_venta: ventaId, Id_producto: productoId }
      });

      if (!detalle) {
        return {
          status: 'warning',
          code: 'PRODUCTO_NO_EN_VENTA',
          mensaje: 'El producto no está en esta venta.',
          data: null
        };
      }

      if (nuevaCantidad < 0) {
        return {
          status: 'warning',
          code: 'CANTIDAD_INVALIDA',
          mensaje: 'La cantidad debe ser mayor o igual a cero.',
          data: null
        };
      }

      // === Validación tipo de producto ===
      if (producto.data.esGranel) {
        // Granel: permitir decimales > 0 (o 0 para eliminar)
        if (isNaN(nuevaCantidad) || nuevaCantidad < 0) {
          return {
            status: 'warning',
            code: 'CANTIDAD_INVALIDA',
            mensaje: 'Para productos a granel la cantidad debe ser un número decimal mayor o igual a 0.',
            data: null
          };
        }
      } else {
        // Normal: solo enteros >= 0
        if (!Number.isInteger(nuevaCantidad) || nuevaCantidad < 0) {
          return {
            status: 'warning',
            code: 'CANTIDAD_INVALIDA',
            mensaje: 'Solo puedes vender cantidades enteras para este producto.',
            data: null
          };
        }
      }
      // === Fin validación tipo de producto ===

      if (nuevaCantidad === 0) {
        await tx.detallesventa.delete({ where: { Id: detalle.Id } });
        await this.actualizarTotalesVenta(ventaId, tx);

        return {
          status: 'success',
          code: 'PRODUCTO_ELIMINADO',
          mensaje: 'Producto eliminado de la venta.',
          data: {
            resumen_venta: await this.obtenerResumenVenta(ventaId, tx)
          }
        };
      } else {
        if (producto.data.stock! < nuevaCantidad) {
          return {
            status: 'warning',
            code: 'STOCK_INSUFICIENTE',
            mensaje: `No hay suficiente stock. Disponible: ${producto.data.stock}, requerido: ${nuevaCantidad}.`,
            data: null
          };
        }

        const precioUnitario = Number(producto.data.precioventa ?? 0);
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
          status: 'success',
          code: 'CANTIDAD_MODIFICADA',
          mensaje: `Cantidad modificada (${nuevaCantidad}) para ${producto.data.nombre}.`,
          data: {
            detalle: this.formatearDetalleVenta(detalleActualizado, producto.data),
            resumen_venta: await this.obtenerResumenVenta(ventaId, tx)
          }
        };
      }
    });
  }

  async procesarPago(
    ventaId: string,
    datos: FinalizarVentaDto,
    Id_tienda: string
  ): Promise<ServiceResponse> {
    return this.prisma.$transaction(async (tx) => {
      const venta = await tx.venta.findFirst({
        where: { Id: ventaId, Id_tienda: Id_tienda },
        include: {
          tienda: { select: { Id: true, nombre: true } },
          detallesventa: { include: { producto: true } }
        }
      });

      if (!venta) {
        return {
          status: 'error',
          code: 'VENTA_NO_ENCONTRADA',
          mensaje: 'No se encontró la venta seleccionada.',
          data: null
        };
      }

      if (venta.detallesventa.length === 0) {
        return {
          status: 'warning',
          code: 'VENTA_SIN_PRODUCTOS',
          mensaje: 'No se puede finalizar una venta sin productos.',
          data: null
        };
      }

      if (Number(venta.cantidad_recibida || 0) > 0) {
        return {
          status: 'warning',
          code: 'VENTA_YA_FINALIZADA',
          mensaje: 'Esta venta ya fue finalizada.',
          data: null
        };
      }

      const totalVenta = Number(venta.total_venta || 0);
      const cambio = datos.cantidadRecibida - totalVenta;

      if (cambio < 0) {
        return {
          status: 'warning',
          code: 'DINERO_INSUFICIENTE',
          mensaje: `Dinero insuficiente. Faltan $${Math.abs(cambio).toLocaleString()}.`,
          data: null
        };
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
        status: 'success',
        code: 'VENTA_FINALIZADA',
        mensaje: `¡Venta finalizada! Entrega el cambio al cliente si corresponde.`,
        data: {
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
          stock_actualizado: `Stock actualizado en ${venta.detallesventa.length} productos.`
        }
      };
    });
  }

  async cancelarVenta(
    ventaId: string,
    Id_tienda: string
  ): Promise<ServiceResponse> {
    return this.prisma.$transaction(async (tx) => {
      const venta = await tx.venta.findFirst({
        where: { Id: ventaId, Id_tienda: Id_tienda },
        include: {
          tienda: { select: { Id: true, nombre: true } },
          detallesventa: true
        }
      });

      if (!venta) {
        return {
          status: 'error',
          code: 'VENTA_NO_ENCONTRADA',
          mensaje: 'No se encontró la venta seleccionada.',
          data: null
        };
      }

      if (Number(venta.cantidad_recibida || 0) > 0) {
        return {
          status: 'warning',
          code: 'VENTA_YA_FINALIZADA',
          mensaje: 'No se puede cancelar una venta finalizada.',
          data: null
        };
      }

      await tx.venta.delete({ where: { Id: ventaId } });

      return {
        status: 'success',
        code: 'VENTA_CANCELADA',
        mensaje: 'La venta fue cancelada correctamente.',
        data: {
          venta_cancelada: {
            Id: ventaId,
            productos_que_tenia: venta.detallesventa.length,
            fecha_cancelacion: new Date().toISOString(),
            tienda: venta.tienda
          },
          nota: 'El stock no fue afectado porque la venta no estaba finalizada.'
        }
      };
    });
  }

  // PRIVADOS

  private async validarVentaActivaAccesible(
    ventaId: string,
    Id_tienda: string
  ): Promise<ServiceResponse | any> {
    const venta = await this.prisma.venta.findFirst({
      where: { Id: ventaId, Id_tienda: Id_tienda },
      include: { tienda: { select: { Id: true, nombre: true } } }
    });

    if (!venta) {
      return {
        status: 'error',
        code: 'VENTA_NO_ENCONTRADA',
        mensaje: 'No se encontró la venta seleccionada.',
        data: null
      };
    }
    if (Number(venta.cantidad_recibida || 0) > 0) {
      return {
        status: 'warning',
        code: 'VENTA_YA_FINALIZADA',
        mensaje: 'Esta venta ya fue finalizada.',
        data: null
      };
    }
    return { status: 'success', data: venta };
  }

  private async validarProductoParaVentaAccesible(
    productoId: string,
    Id_tienda: string
  ): Promise<ServiceResponse | any> {
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
      return {
        status: 'error',
        code: 'PRODUCTO_NO_ENCONTRADO',
        mensaje: 'No se encontró el producto en tu tienda.',
        data: null
      };
    }
    return { status: 'success', data: producto };
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
}