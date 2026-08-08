import { PrismaClient } from '@prisma/client';
import { isProduction } from './env';

/**
 * Một PrismaClient duy nhất cho toàn app.
 * Giữ lại trên globalThis để `tsx watch` reload không mở thêm connection pool mới.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: isProduction ? ['error'] : ['warn', 'error'],
  });

if (!isProduction) globalForPrisma.prisma = prisma;
