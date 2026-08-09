ALTER TABLE `products` ADD COLUMN `effectivePrice` DECIMAL(12, 2) NOT NULL DEFAULT 0;

UPDATE `products` SET `effectivePrice` = COALESCE(`salePrice`, `price`);

ALTER TABLE `products` ALTER COLUMN `effectivePrice` DROP DEFAULT;

CREATE INDEX `products_effectivePrice_idx` ON `products`(`effectivePrice`);
