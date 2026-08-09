import type { PageMeta } from './apiResponse';

export interface Pagination {
  page: number;
  limit: number;
  skip: number;
  take: number;
}

const MAX_LIMIT = 100;

export const parsePagination = (
  query: { page?: unknown; limit?: unknown },
  defaultLimit = 12,
): Pagination => {
  const rawPage = Number(query.page);
  const rawLimit = Number(query.limit);

  const page = Number.isFinite(rawPage) && rawPage >= 1 ? Math.floor(rawPage) : 1;
  const limit =
    Number.isFinite(rawLimit) && rawLimit >= 1
      ? Math.min(Math.floor(rawLimit), MAX_LIMIT)
      : defaultLimit;

  return { page, limit, skip: (page - 1) * limit, take: limit };
};

export const buildMeta = (total: number, page: number, limit: number): PageMeta => ({
  page,
  limit,
  total,
  totalPages: Math.max(1, Math.ceil(total / limit)),
});
