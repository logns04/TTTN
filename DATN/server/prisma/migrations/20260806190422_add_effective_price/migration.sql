-- Giá bán thực tế = salePrice ?? price. Cần cột riêng vì "lọc theo khoảng giá"
-- và "sắp xếp theo giá" phải chạy trên giá khách thực trả, còn Prisma không
-- sắp xếp được theo biểu thức tính.
--
-- Thêm cột với DEFAULT 0 rồi backfill rồi bỏ DEFAULT, để migration chạy được
-- cả trên bảng đã có dữ liệu chứ không chỉ trên DB rỗng.

-- AlterTable
ALTER TABLE `products` ADD COLUMN `effectivePrice` DECIMAL(12, 2) NOT NULL DEFAULT 0;

-- Backfill từ dữ liệu sẵn có
UPDATE `products` SET `effectivePrice` = COALESCE(`salePrice`, `price`);

-- Bỏ DEFAULT: từ giờ mọi lần ghi đều phải truyền giá trị tường minh
ALTER TABLE `products` ALTER COLUMN `effectivePrice` DROP DEFAULT;

-- CreateIndex
CREATE INDEX `products_effectivePrice_idx` ON `products`(`effectivePrice`);
