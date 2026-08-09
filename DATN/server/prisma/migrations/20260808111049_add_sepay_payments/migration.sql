-- AlterTable
ALTER TABLE `orders` ADD COLUMN `paidAt` DATETIME(3) NULL;

CREATE TABLE `payments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sepayId` INTEGER NOT NULL,
    `orderId` INTEGER NULL,
    `gateway` VARCHAR(80) NOT NULL,
    `transactionDate` DATETIME(3) NOT NULL,
    `accountNumber` VARCHAR(60) NULL,
    `code` VARCHAR(60) NULL,
    `content` VARCHAR(500) NOT NULL,
    `transferType` VARCHAR(10) NOT NULL,
    `amount` DECIMAL(12, 2) NOT NULL,
    `referenceCode` VARCHAR(120) NULL,
    `raw` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `payments_sepayId_key`(`sepayId`),
    INDEX `payments_orderId_idx`(`orderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `payments` ADD CONSTRAINT `payments_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
