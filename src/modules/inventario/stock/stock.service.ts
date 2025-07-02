import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StockService {
    constructor(
        private prisma: PrismaService
    ){}

     async obtenerCantidadTotalProductos(Id_tienda: string) {
        const productosConCompras = await this.prisma.productocompra.findMany({
            where: {
                compra: {
                    proveedor: {
                        Id_tienda: Id_tienda
                    }
                }
            },
            select: {
                Id_producto: true
            },
            distinct: ['Id_producto']
        });

        return { total_productos: productosConCompras.length };
    }

    // Stock por producto basado solo en productoCompra
    async obtenerStockPorProducto(Id_tienda: string) {
        const stockPorProducto = await this.prisma.productocompra.groupBy({
            by: ['Id_producto'],
            where: {
                compra: {
                    proveedor: {
                        Id_tienda: Id_tienda
                    }
                }
            },
            _sum: {
                cantidad: true
            }
        });

        // Obtener nombres de productos
        const productosIds = stockPorProducto
            .map(item => item.Id_producto)
            .filter((id): id is string => id !== null);

        const productos = await this.prisma.producto.findMany({
            where: {
                Id: {
                    in: productosIds
                }
            },
            select: {
                Id: true,
                nombre: true
            }
        });


        return stockPorProducto.map(stock => {
            const producto = productos.find(p => p.Id === stock.Id_producto);
            return {
                Id_producto: stock.Id_producto,
                nombre_producto: producto?.nombre || 'Producto no encontrado',
                stock_total: stock._sum.cantidad || 0
            };
        });
    }

    // Stock total sumando todas las cantidades de productoCompra
    async obtenerStockTotal(Id_tienda: string) {
        const stockTotal = await this.prisma.productocompra.aggregate({
            where: {
                compra: {
                    proveedor: {
                        Id_tienda: Id_tienda
                    }
                }
            },
            _sum: {
                cantidad: true
            }
        });

        return { stock_total: stockTotal._sum.cantidad || 0 };
    }
}
