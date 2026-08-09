import { Prisma } from '@prisma/client';
import type { Response } from 'express';

export interface PageMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const normalize = (value: unknown): unknown => {
  if (value === null || value === undefined) return value;
  if (typeof value === 'bigint') return Number(value);
  if (Prisma.Decimal.isDecimal(value)) return Number(value.toString());
  if (value instanceof Date) return value;
  if (Array.isArray(value)) return value.map(normalize);

  if (typeof value === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) {
      result[key] = normalize(item);
    }
    return result;
  }

  return value;
};

export const ok = <T>(res: Response, data: T, message = '', meta?: PageMeta) =>
  res.json({ success: true, data: normalize(data), message, ...(meta ? { meta } : {}) });

export const created = <T>(res: Response, data: T, message = '') =>
  res.status(201).json({ success: true, data: normalize(data), message });
