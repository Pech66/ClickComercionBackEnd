-- CreateTable
CREATE TABLE `almacen` (
    `Id` CHAR(36) NOT NULL,
    `nombre` VARCHAR(100) NULL,
    `Id_tienda` CHAR(36) NULL,

    INDEX `Id_tienda`(`Id_tienda`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoria` (
    `Id` CHAR(36) NOT NULL,
    `nombre` VARCHAR(100) NULL,
    `descripcion` VARCHAR(255) NULL,
    `Id_tienda` CHAR(36) NULL,

    INDEX `Id_tienda`(`Id_tienda`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `compra` (
    `Id` CHAR(36) NOT NULL,
    `fecha` DATETIME(0) NULL,
    `total` DECIMAL(10, 2) NULL,
    `sku` VARCHAR(255) NULL,
    `Id_proveedor` CHAR(36) NULL,

    INDEX `Id_proveedor`(`Id_proveedor`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detallesventa` (
    `Id` CHAR(36) NOT NULL,
    `cantidad_recibida` DECIMAL(10, 2) NULL,
    `devuelto` DECIMAL(10, 2) NULL,
    `cantidad` DECIMAL(10, 3) NULL DEFAULT 0.000,
    `precio_unitario` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `subtotal` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `Id_venta` CHAR(36) NULL,
    `Id_producto` CHAR(36) NULL,

    INDEX `Id_producto`(`Id_producto`),
    INDEX `Id_venta`(`Id_venta`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `producto` (
    `Id` CHAR(36) NOT NULL,
    `nombre` VARCHAR(100) NULL,
    `descripcion` VARCHAR(255) NULL,
    `codigobarra` VARCHAR(255) NULL,
    `fotoUrl` VARCHAR(255) NULL,
    `precioventa` DECIMAL(10, 2) NULL,
    `preciodeproveedor` DECIMAL(10, 2) NULL,
    `preciokilo` DECIMAL(10, 2) NULL,
    `unidaddemedida` VARCHAR(100) NULL,
    `esgranel` BOOLEAN NULL,
    `Id_almacen` CHAR(36) NULL,
    `Id_categoria` CHAR(36) NULL,
    `stock` INTEGER NULL DEFAULT 0,

    INDEX `Id_almacen`(`Id_almacen`),
    INDEX `Id_categoria`(`Id_categoria`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productocompra` (
    `Id` CHAR(36) NOT NULL,
    `cantidad` INTEGER NULL,
    `Id_producto` CHAR(36) NULL,
    `Id_compra` CHAR(36) NULL,

    INDEX `Id_compra`(`Id_compra`),
    INDEX `Id_producto`(`Id_producto`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proveedor` (
    `Id` CHAR(36) NOT NULL,
    `nombre` VARCHAR(100) NULL,
    `telefono` VARCHAR(15) NULL,
    `empresa` VARCHAR(100) NULL,
    `Id_tienda` CHAR(36) NULL,

    INDEX `Id_tienda`(`Id_tienda`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tienda` (
    `Id` CHAR(36) NOT NULL,
    `nombre` VARCHAR(100) NULL,
    `ubicacion` VARCHAR(255) NULL,
    `telefono` VARCHAR(15) NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `Id` CHAR(36) NOT NULL,
    `nombre` VARCHAR(100) NULL,
    `email` VARCHAR(100) NULL,
    `contrasena` VARCHAR(255) NULL,
    `fotoUrl` VARCHAR(255) NULL,
    `codigoVerificacion` VARCHAR(6) NULL,
    `codigoVerificacionExp` DATETIME(0) NULL,
    `activo` BOOLEAN NULL DEFAULT true,
    `verificado` BOOLEAN NULL DEFAULT false,
    `rol` ENUM('SUPERADMIN', 'ADMIN_TIENDA', 'TRABAJADOR') NULL,
    `Id_tienda` CHAR(36) NULL,

    UNIQUE INDEX `email`(`email`),
    INDEX `Id_tienda`(`Id_tienda`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `venta` (
    `Id` CHAR(36) NOT NULL,
    `totaldeganancias` DECIMAL(10, 2) NULL,
    `total_venta` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `cantidad_recibida` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `cambio_devuelto` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `fechaDeVenta` DATETIME(0) NULL,
    `Id_tienda` CHAR(36) NULL,

    INDEX `Id_tienda`(`Id_tienda`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `almacen` ADD CONSTRAINT `almacen_ibfk_1` FOREIGN KEY (`Id_tienda`) REFERENCES `tienda`(`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `categoria` ADD CONSTRAINT `categoria_ibfk_1` FOREIGN KEY (`Id_tienda`) REFERENCES `tienda`(`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `compra` ADD CONSTRAINT `compra_ibfk_1` FOREIGN KEY (`Id_proveedor`) REFERENCES `proveedor`(`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `detallesventa` ADD CONSTRAINT `detallesventa_ibfk_1` FOREIGN KEY (`Id_venta`) REFERENCES `venta`(`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `detallesventa` ADD CONSTRAINT `detallesventa_ibfk_2` FOREIGN KEY (`Id_producto`) REFERENCES `producto`(`Id`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `producto` ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`Id_almacen`) REFERENCES `almacen`(`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `producto` ADD CONSTRAINT `producto_ibfk_2` FOREIGN KEY (`Id_categoria`) REFERENCES `categoria`(`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `productocompra` ADD CONSTRAINT `productocompra_ibfk_1` FOREIGN KEY (`Id_producto`) REFERENCES `producto`(`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `productocompra` ADD CONSTRAINT `productocompra_ibfk_2` FOREIGN KEY (`Id_compra`) REFERENCES `compra`(`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `proveedor` ADD CONSTRAINT `proveedor_ibfk_1` FOREIGN KEY (`Id_tienda`) REFERENCES `tienda`(`Id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`Id_tienda`) REFERENCES `tienda`(`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `venta` ADD CONSTRAINT `venta_ibfk_1` FOREIGN KEY (`Id_tienda`) REFERENCES `tienda`(`Id`) ON DELETE RESTRICT ON UPDATE NO ACTION;
