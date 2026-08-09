import { OrderStatus } from '@prisma/client';
import { prisma } from '../../config/prisma';

const LOW_STOCK_THRESHOLD = 5;

export const stats = async () => {
  const [products, categories, orders, users, revenue, pendingOrders, lowStock] =
    await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.order.count(),
      prisma.user.count(),
      prisma.order.aggregate({
        where: { status: OrderStatus.COMPLETED },
        _sum: { total: true },
      }),
      prisma.order.count({ where: { status: OrderStatus.PENDING } }),
      prisma.product.count({ where: { quantity: { lte: LOW_STOCK_THRESHOLD } } }),
    ]);

  return {
    products,
    categories,
    orders,
    users,
    revenue: Number(revenue._sum.total ?? 0),
    pendingOrders,
    lowStock,
  };
};

interface RevenueRow {
  month: number;
  revenue: unknown;
  orders: unknown;
}

export const revenueByMonth = async (year: number) => {
  const rows = await prisma.$queryRaw<RevenueRow[]>`
    SELECT MONTH(createdAt) AS month,
           SUM(total)       AS revenue,
           COUNT(*)         AS orders
    FROM orders
    WHERE status = 'COMPLETED' AND YEAR(createdAt) = ${year}
    GROUP BY MONTH(createdAt)
    ORDER BY month
  `;

  const byMonth = new Map(
    rows.map((row) => [
      Number(row.month),
      { revenue: Number(row.revenue ?? 0), orders: Number(row.orders ?? 0) },
    ]),
  );

  return Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    const found = byMonth.get(month);
    return {
      month,
      label: `T${month}`,
      revenue: found?.revenue ?? 0,
      orders: found?.orders ?? 0,
    };
  });
};

const STATUS_LABELS: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: 'Chờ xác nhận',
  [OrderStatus.CONFIRMED]: 'Đã xác nhận',
  [OrderStatus.SHIPPING]: 'Đang giao',
  [OrderStatus.COMPLETED]: 'Hoàn thành',
  [OrderStatus.CANCELLED]: 'Đã huỷ',
};

export const ordersByStatus = async () => {
  const grouped = await prisma.order.groupBy({
    by: ['status'],
    _count: { _all: true },
  });

  const counts = new Map(grouped.map((row) => [row.status, row._count._all]));

  return (Object.keys(STATUS_LABELS) as OrderStatus[]).map((status) => ({
    status,
    label: STATUS_LABELS[status],
    count: counts.get(status) ?? 0,
  }));
};

export const topProducts = async (take = 5) => {
  const grouped = await prisma.orderItem.groupBy({
    by: ['productName'],
    where: { order: { status: { not: OrderStatus.CANCELLED } } },
    _sum: { quantity: true, subtotal: true },
    orderBy: { _sum: { quantity: 'desc' } },
    take,
  });

  return grouped.map((row) => ({
    name: row.productName,
    quantity: Number(row._sum.quantity ?? 0),
    revenue: Number(row._sum.subtotal ?? 0),
  }));
};

export const productsByCategory = async () => {
  const parents = await prisma.category.findMany({
    where: { parentId: null },
    select: { id: true, name: true, children: { select: { id: true } } },
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
  });

  const counts = await Promise.all(
    parents.map((parent) =>
      prisma.product.count({
        where: { categoryId: { in: [parent.id, ...parent.children.map((c) => c.id)] } },
      }),
    ),
  );

  return parents.map((parent, index) => ({
    name: parent.name,
    count: counts[index] ?? 0,
  }));
};
