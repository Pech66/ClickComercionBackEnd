import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DetallesVentasService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async obtenerHistorialVentas(Id_tienda: string, page = 1, limit = 10) {
        return this.prisma.venta.findMany({
            where: {
                Id_tienda,
                cantidad_recibida: { gt: 0 }, // Solo ventas finalizadas
            },
            orderBy: { fechaDeVenta: 'desc' },
            select: {
                Id: true,
                fechaDeVenta: true,
                total_venta: true,
                totaldeganancias: true,
                detallesventa: false, // solo lista, sin detalles
            },
            skip: (page - 1) * limit,
            take: limit,
        });
    }

    async obtenerDetalleVenta(ventaId: string, Id_tienda: string) {
        const venta = await this.prisma.venta.findFirst({
            where: {
                Id: ventaId,
                Id_tienda: Id_tienda,
                cantidad_recibida: { gt: 0 }
            },
            include: {
                detallesventa: {
                    include: {
                        producto: { select: { nombre: true, descripcion: true, fotoUrl: true } }
                    }
                },
                tienda: { select: { nombre: true } }
            }
        });

        if (!venta) throw new NotFoundException('Venta no encontrada');
        return venta;
    }

}
