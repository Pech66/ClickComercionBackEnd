import { ComprasService } from './compras.service';
import {  ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { DtoProductoCompra } from './dto/dto.compra';
import { DtoEditarProductoCompra } from './dto/editar/dto.editarcompra';

@Controller('compras')
export class ComprasController {
    constructor(
        private readonly comprasService: ComprasService,

    ) {}
    
    @Post('registrar')
    @ApiOperation({ summary: 'Registrar una nueva compra' })
    registrarCompra(@Body() dto: DtoProductoCompra) {
      return this.comprasService.registrarCompra(dto);
    }   

    @Put('editar/:id')
    @ApiOperation({ summary: 'Editar una compra existente' })
    @ApiResponse({ status: 200, description: 'Compra actualizada exitosamente' })
    @ApiResponse({ status: 404, description: 'Compra no encontrada' })
    async editarCompra(
        @Param('id') id: string,
        @Body() dto: DtoEditarProductoCompra
    ) {
        return this.comprasService.editarCompra(id, dto);
    }

    

    @Get('tienda/:Id_tienda')
    @ApiOperation({ summary: 'Obtener todas las compras de una tienda específica' })
    @ApiResponse({ 
        status: 200, 
        description: 'Lista de compras de la tienda (filtradas por proveedor)',
    })
    @ApiParam({ name: 'Id_tienda', description: 'ID de la tienda' })
    async obtenerComprasPorTienda(@Param('Id_tienda') Id_tienda: string) {
        
        return this.comprasService.obtenerComprasPorTienda(Id_tienda);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener una compra por ID' })
    @ApiParam({ name: 'id', description: 'ID de la compra' })
    @ApiQuery({ name: 'Id_tienda', description: 'ID de la tienda (opcional)', required: false })
    async obtenerCompraPorId(
        @Param('id') id: string,
        @Query('Id_tienda') Id_tienda?: string
    ) {
        return this.comprasService.obtenerCompraPorId(id, Id_tienda);
    }

    @Delete('eliminar/:id')
    @ApiOperation({ summary: 'Eliminar una compra' })
    @ApiParam({ name: 'id', description: 'ID de la compra a eliminar' })
    @ApiQuery({ name: 'Id_tienda', description: 'ID de la tienda (opcional)', required: false })
    async eliminarCompra(
        @Param('id') id: string,
        @Query('Id_tienda') Id_tienda?: string
    ) {
        return this.comprasService.eliminarCompra(id, Id_tienda);
    }
    
}