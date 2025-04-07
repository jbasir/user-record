-- CreateTable
CREATE TABLE `registros` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `mensaje` TEXT NOT NULL,
    `tipo_comprobante` ENUM('Factura', 'CFF', 'Ticket') NOT NULL DEFAULT 'Factura',
    `metodo_pago` ENUM('Efectivo', 'Transferencia', 'Tarjeta') NOT NULL DEFAULT 'Efectivo',
    `comprobante_pago` VARCHAR(255) NULL,
    `fecha_creacion` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
