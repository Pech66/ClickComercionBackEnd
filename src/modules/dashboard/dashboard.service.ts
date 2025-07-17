import { Injectable } from '@nestjs/common';
import { endOfDay, startOfDay } from 'date-fns';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
    constructor(private prisma: PrismaService) { }

    async resumenTienda(idTienda: string) {
        // 1. Suma total de stock de productos en la tienda
        const productos = await this.prisma.producto.findMany({
            where: {
                almacen: {
                    tienda: {
                        Id: idTienda,
                    },
                },
            },
            select: { stock: true },
        });
        const cantidadProductoActual = productos.reduce((suma, p) => suma + (p.stock ?? 0), 0);

        // 2. Cantidad de ventas del día (en UTC)
        const hoyUTC = new Date();
        const ventasHoy = await this.prisma.venta.count({
            where: {
                Id_tienda: idTienda,
                fechaDeVenta: {
                    gte: startOfDay(hoyUTC),
                    lt: endOfDay(hoyUTC),
                },
            },
        });

        // 3. Cantidad de productos con stock bajo (≤ 5 unidades/kilos)
        const stockBajo = await this.prisma.producto.count({
            where: {
                almacen: {
                    tienda: {
                        Id: idTienda,
                    },
                },
                stock: { lte: 5 },
            },
        });

        // 4. Cantidad de categorías
        const cantidadCategorias = await this.prisma.categoria.count({
            where: { Id_tienda: idTienda },
        });

        // 5. Cantidad de proveedores
        const cantidadProveedores = await this.prisma.proveedor.count({
            where: { Id_tienda: idTienda },
        });

        return {
            cantidadProductoActual,
            ventasHoy,
            stockBajo,
            cantidadCategorias,
            cantidadProveedores,
        };
    }
    
    // 2. Ventas
    async datosVentas(idTienda: string) {
        const totalVentas = await this.prisma.venta.count({
            where: { Id_tienda: idTienda },
        });

        // Producto más vendido
        const productoMasVendido = await this.prisma.detallesventa.groupBy({
            by: ['Id_producto'],
            where: { venta: { Id_tienda: idTienda } },
            _sum: { cantidad_recibida: true },
            orderBy: { _sum: { cantidad_recibida: 'desc' } },
            take: 1,
        });
        let producto: { nombre: string | null; descripcion: string | null; codigobarra: string | null } | null = null;
        if (productoMasVendido.length > 0 && productoMasVendido[0].Id_producto) {
            producto = await this.prisma.producto.findUnique({
                where: { Id: productoMasVendido[0].Id_producto },
                select: { nombre: true, descripcion: true, codigobarra: true },
            });
        }
        return {
            totalVentas,
            productoMasVendido:
                producto && productoMasVendido[0]._sum.cantidad_recibida
                    ? { ...producto, cantidad: productoMasVendido[0]._sum.cantidad_recibida }
                    : null,
        };
    }

    // 3. Compras
    async datosCompras(idTienda: string) {
        const compras = await this.prisma.compra.findMany({
            where: { proveedor: { Id_tienda: idTienda } },
            select: { total: true },
        });
        const totalGastado = compras.reduce((sum, c) => sum + Number(c.total ?? 0), 0);
        return { totalGastado };
    }

    // 4. Productos con stock bajo
    async productosStockBajo(idTienda: string) {
        // Suponiendo que el mínimo de stock bajo es 10
        const productos = await this.prisma.producto.findMany({
            where: {
                almacen: { Id_tienda: idTienda },
                stock: { lt: 10 },
            },
            select: {
                nombre: true,
                stock: true,
                codigobarra: true,
                descripcion: true,
            },
        });
        return { productosStockBajo: productos };
    }

    //  Gráficas

    // Ventas por mes
    async graficaVentasPorMes(idTienda: string) {
        // Agrupa ventas por mes y suma total
        const ventas = await this.prisma.venta.findMany({
            where: { Id_tienda: idTienda },
            select: { fechaDeVenta: true, total_venta: true },
        });
        const agrupadas: Record<string, { mes: string, totalVentas: number, totalIngresos: number }> = {};
        ventas.forEach((v) => {
            if (!v.fechaDeVenta) return;
            const mes = v.fechaDeVenta.toISOString().slice(0, 7); // YYYY-MM
            if (!agrupadas[mes]) agrupadas[mes] = { mes, totalVentas: 0, totalIngresos: 0 };
            agrupadas[mes].totalVentas += 1;
            agrupadas[mes].totalIngresos += Number(v.total_venta ?? 0);
        });
        return Object.values(agrupadas);
    }

    // Compras por mes
    async graficaComprasPorMes(idTienda: string) {
        const compras = await this.prisma.compra.findMany({
            where: { proveedor: { Id_tienda: idTienda } },
            select: { fecha: true, total: true },
        });
        const agrupadas: Record<string, { mes: string, totalCompras: number, totalGastado: number }> = {};
        compras.forEach((c) => {
            if (!c.fecha) return;
            const mes = c.fecha.toISOString().slice(0, 7);
            if (!agrupadas[mes]) agrupadas[mes] = { mes, totalCompras: 0, totalGastado: 0 };
            agrupadas[mes].totalCompras += 1;
            agrupadas[mes].totalGastado += Number(c.total ?? 0);
        });
        return Object.values(agrupadas);
    }

    // Productos en stock por categoría
    async graficaStockPorCategoria(idTienda: string) {
        const categorias = await this.prisma.categoria.findMany({
            where: { Id_tienda: idTienda },
            select: { Id: true, nombre: true },
        });
        const resultado = [];
        for (const cat of categorias) {
            const productos = await this.prisma.producto.findMany({
                where: { Id_categoria: cat.Id, almacen: { Id_tienda: idTienda } },
                select: { stock: true },
            });
            const cantidadStock = productos.reduce((sum, p) => sum + (p.stock ?? 0), 0);
            const resultado: { categoria: string | null; cantidadProductosEnStock: number }[] = [];
        }
        return resultado;
    }

    // Ingresos vs egresos por mes
    async graficaIngresosVsEgresos(idTienda: string) {
        // Ventas por mes
        const ventas = await this.graficaVentasPorMes(idTienda);
        // Compras por mes
        const compras = await this.graficaComprasPorMes(idTienda);

        // Merge por mes
        const meses = new Set([
            ...ventas.map((v) => v.mes),
            ...compras.map((c) => c.mes),
        ]);
        // Ingresos vs egresos por mes
        const resultado: { mes: string; ingresos: number; egresos: number }[] = [];
        for (const mes of meses) {
            const ingreso = ventas.find((v) => v.mes === mes)?.totalIngresos ?? 0;
            const egreso = compras.find((c) => c.mes === mes)?.totalGastado ?? 0;
            resultado.push({ mes, ingresos: ingreso, egresos: egreso });
        }
        return resultado;
    }
}