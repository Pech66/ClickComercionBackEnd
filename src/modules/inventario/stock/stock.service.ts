import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StockService {
    constructor(
        private prisma: PrismaService
    ) { }

    async obtenerCantidadTotalProductos(Id_tienda: string) {
        try {
            // Verificar que la tienda existe
            const tienda = await this.prisma.tienda.findUnique({
                where: { Id: Id_tienda }
            });

            if (!tienda) {
                throw new BadRequestException('Tienda no encontrada');
            }

            // Obtener almacenes de la tienda
            const almacenes = await this.prisma.almacen.findMany({
                where: { Id_tienda: Id_tienda },
                select: { Id: true }
            });

            if (almacenes.length === 0) {
                return {
                    total_productos: 0,
                    mensaje: 'No tienes almacenes registrados. Crea un almacén primero.'
                };
            }

            const almacenIds = almacenes.map(a => a.Id);

            // Contar productos en los almacenes de la tienda
            const totalProductos = await this.prisma.producto.count({
                where: {
                    Id_almacen: { in: almacenIds }
                }
            });

            return {
                total_productos: totalProductos,
                mensaje: totalProductos > 0
                    ? `Tienes ${totalProductos} productos registrados en tu tienda`
                    : 'No tienes productos registrados. Agrega productos a tu inventario.'
            };
        } catch (error) {
            throw new BadRequestException(`Error al obtener total de productos: ${error.message}`);
        }
    }

    // Usa la columna stock real de cada producto
    async obtenerStockPorProducto(Id_tienda: string) {
        try {
            // Obtener almacenes de la tienda
            const almacenes = await this.prisma.almacen.findMany({
                where: { Id_tienda: Id_tienda },
                select: { Id: true }
            });

            if (almacenes.length === 0) {
                throw new BadRequestException('No tienes almacenes registrados. Crea un almacén primero.');
            }

            const almacenIds = almacenes.map(a => a.Id);

            // Obtener productos con su stock actual
            const productos = await this.prisma.producto.findMany({
                where: {
                    Id_almacen: { in: almacenIds }
                },
                select: {
                    Id: true,
                    nombre: true,
                    descripcion: true,
                    stock: true,
                    precioventa: true,
                    categoria: {
                        select: {
                            Id: true,
                            nombre: true
                        }
                    },
                    almacen: {
                        select: {
                            Id: true,
                            nombre: true
                        }
                    }
                },
                orderBy: {
                    nombre: 'asc'
                }
            });

            if (productos.length === 0) {
                return {
                    productos: [],
                    resumen: {
                        total_productos: 0,
                        con_stock: 0,
                        sin_stock: 0
                    },
                    mensaje: 'No tienes productos registrados en tu tienda.'
                };
            }

            // Procesar datos y agregar estado
            const productosConEstado = productos.map(producto => {
                const stock = producto.stock || 0;
                let estado: string;

                if (stock === 0) {
                    estado = 'Agotado';
                } else if (stock <= 10) {
                    estado = 'Stock Bajo';
                } else {
                    estado = 'Disponible';
                }

                return {
                    Id: producto.Id,
                    nombre: producto.nombre,
                    descripcion: producto.descripcion,
                    stock_actual: stock,
                    estado: estado,
                    precio_venta: producto.precioventa,
                    categoria: producto.categoria?.nombre || 'Sin categoría',
                    almacen: producto.almacen?.nombre || 'Sin almacén'
                };
            });

            // Calcular resumen
            const conStock = productosConEstado.filter(p => p.stock_actual > 0).length;
            const sinStock = productosConEstado.filter(p => p.stock_actual === 0).length;

            return {
                productos: productosConEstado,
                resumen: {
                    total_productos: productos.length,
                    con_stock: conStock,
                    sin_stock: sinStock
                }
            };
        } catch (error) {
            throw new BadRequestException(`Error al obtener stock por producto: ${error.message}`);
        }
    }

    // Resumen completo del inventario
    async obtenerResumenCompleto(Id_tienda: string) {
        try {
            // Obtener almacenes de la tienda
            const almacenes = await this.prisma.almacen.findMany({
                where: { Id_tienda: Id_tienda },
                select: { Id: true }
            });

            if (almacenes.length === 0) {
                return {
                    stock_total: 0,
                    valor_total_inventario: 0,
                    productos_con_stock: 0,
                    productos_sin_stock: 0,
                    productos_stock_bajo: 0,
                    mensaje: 'No tienes almacenes registrados.'
                };
            }

            const almacenIds = almacenes.map(a => a.Id);

            // Obtener productos con stock y precios
            const productos = await this.prisma.producto.findMany({
                where: {
                    Id_almacen: { in: almacenIds }
                },
                select: {
                    stock: true,
                    precioventa: true
                }
            });

            if (productos.length === 0) {
                return {
                    stock_total: 0,
                    valor_total_inventario: 0,
                    productos_con_stock: 0,
                    productos_sin_stock: 0,
                    productos_stock_bajo: 0,
                    mensaje: 'No tienes productos registrados.'
                };
            }

            // Calcular métricas
            let stockTotal = 0;
            let valorTotal = 0;
            let productosConStock = 0;
            let productosSinStock = 0;
            let productosStockBajo = 0;

            productos.forEach(producto => {
                const stock = producto.stock || 0;
                const precio = producto.precioventa || 0;

                stockTotal += stock;
                valorTotal += stock * Number(precio);

                if (stock === 0) {
                    productosSinStock++;
                } else {
                    productosConStock++;
                    if (stock <= 10) {
                        productosStockBajo++;
                    }
                }
            });

            return {
                stock_total: stockTotal,
                valor_total_inventario: Number(valorTotal.toFixed(2)),
                productos_con_stock: productosConStock,
                productos_sin_stock: productosSinStock,
                productos_stock_bajo: productosStockBajo,
                total_productos: productos.length
            };
        } catch (error) {
            throw new BadRequestException(`Error al obtener resumen de stock: ${error.message}`);
        }
    }

    //  Obtener productos agotados
    async obtenerProductosAgotados(Id_tienda: string) {
        try {
            const almacenes = await this.prisma.almacen.findMany({
                where: { Id_tienda: Id_tienda },
                select: { Id: true }
            });

            if (almacenes.length === 0) {
                return {
                    productos_agotados: [],
                    total_agotados: 0,
                    mensaje: 'No tienes almacenes registrados.'
                };
            }

            const almacenIds = almacenes.map(a => a.Id);

            const productosAgotados = await this.prisma.producto.findMany({
                where: {
                    Id_almacen: { in: almacenIds },
                    OR: [
                        { stock: 0 },
                        { stock: null }
                    ]
                },
                select: {
                    Id: true,
                    nombre: true,
                    descripcion: true,
                    codigobarra: true,
                    categoria: {
                        select: {
                            nombre: true
                        }
                    }
                },
                orderBy: {
                    nombre: 'asc'
                }
            });

            return {
                productos_agotados: productosAgotados.map(p => ({
                    Id: p.Id,
                    nombre: p.nombre,
                    descripcion: p.descripcion,
                    codigo_barra: p.codigobarra,
                    categoria: p.categoria?.nombre || 'Sin categoría'
                })),
                total_agotados: productosAgotados.length,
                mensaje: productosAgotados.length === 0
                    ? '¡Excelente! No tienes productos agotados.'
                    : `Tienes ${productosAgotados.length} productos agotados que necesitan restock.`
            };
        } catch (error) {
            throw new BadRequestException(`Error al obtener productos agotados: ${error.message}`);
        }
    }

    // ✅ NUEVO: Obtener productos con stock bajo
    async obtenerProductosStockBajo(Id_tienda: string, limite: number = 10) {
        try {
            const almacenes = await this.prisma.almacen.findMany({
                where: { Id_tienda: Id_tienda },
                select: { Id: true }
            });

            if (almacenes.length === 0) {
                return {
                    productos_stock_bajo: [],
                    total_stock_bajo: 0,
                    mensaje: 'No tienes almacenes registrados.'
                };
            }

            const almacenIds = almacenes.map(a => a.Id);

            const productosStockBajo = await this.prisma.producto.findMany({
                where: {
                    Id_almacen: { in: almacenIds },
                    stock: {
                        gt: 0,
                        lte: limite
                    }
                },
                select: {
                    Id: true,
                    nombre: true,
                    stock: true,
                    descripcion: true,
                    categoria: {
                        select: {
                            nombre: true
                        }
                    }
                },
                orderBy: {
                    stock: 'asc'
                }
            });

            return {
                productos_stock_bajo: productosStockBajo.map(p => ({
                    Id: p.Id,
                    nombre: p.nombre,
                    stock_actual: p.stock,
                    descripcion: p.descripcion,
                    categoria: p.categoria?.nombre || 'Sin categoría'
                })),
                total_stock_bajo: productosStockBajo.length,
                limite_considerado: limite,
                mensaje: productosStockBajo.length === 0
                    ? `No tienes productos con stock bajo (menos de ${limite} unidades).`
                    : `Tienes ${productosStockBajo.length} productos con stock bajo que necesitan reposición.`
            };
        } catch (error) {
            throw new BadRequestException(`Error al obtener productos con stock bajo: ${error.message}`);
        }
    }
}
