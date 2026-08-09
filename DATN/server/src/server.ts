import { createApp } from './app';
import { env } from './config/env';
import { prisma } from './config/prisma';

const start = async () => {

  await prisma.$connect();

  const app = createApp();

  app.listen(env.PORT, () => {
    console.log(`API nội thất đang chạy: http://localhost:${env.PORT}/api`);
    console.log(`Chế độ lưu ảnh: ${env.STORAGE_DRIVER}`);
  });
};

start().catch((error) => {
  console.error('Không khởi động được server:', error);
  process.exit(1);
});

const shutdown = async (signal: string) => {
  console.log(`\n${signal} — đang đóng kết nối...`);
  await prisma.$disconnect();
  process.exit(0);
};

process.on('SIGINT', () => void shutdown('SIGINT'));
process.on('SIGTERM', () => void shutdown('SIGTERM'));
