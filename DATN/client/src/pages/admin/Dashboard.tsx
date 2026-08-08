import {
  AlertTriangle,
  Clock,
  FolderTree,
  Package,
  ShoppingBag,
  Users,
  Wallet,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { toast } from 'sonner';
import { ChartTooltipCard } from '@/components/common/ChartTooltip';
import { ChartValueTable } from '@/components/common/ChartValueTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingBlock, Skeleton } from '@/components/ui/feedback';
import { Select } from '@/components/ui/input';
import { AXIS_PROPS, CHART_INK, chartColor, truncate } from '@/lib/chart';
import { formatCompact, formatCurrency, formatNumber } from '@/lib/format';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { getErrorMessage } from '@/services/axios';
import { dashboardApi } from '@/services/shop.api';
import { useAppSelector } from '@/store';
import type {
  CategoryCountPoint,
  DashboardStats,
  OrderStatusPoint,
  RevenuePoint,
  TopProductPoint,
} from '@/types';

const StatCard = ({
  label,
  value,
  icon: Icon,
  hint,
  emphasis,
}: {
  label: string;
  value: string;
  icon: typeof Package;
  hint?: string;
  emphasis?: 'warning' | 'destructive';
}) => (
  <Card>
    <CardContent className="flex items-start gap-3">
      <div
        className={
          emphasis === 'warning'
            ? 'rounded-lg bg-warning/15 p-2 text-warning'
            : emphasis === 'destructive'
              ? 'rounded-lg bg-destructive/15 p-2 text-destructive'
              : 'rounded-lg bg-primary/10 p-2 text-primary'
        }
      >
        <Icon className="size-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        {/* Số lớn là hero number: đọc được ngay mà không cần nhìn biểu đồ */}
        <p className="truncate text-xl font-bold">{value}</p>
        {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      </div>
    </CardContent>
  </Card>
);

const ChartCard = ({
  title,
  description,
  action,
  children,
  loading,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  loading: boolean;
}) => (
  <Card>
    <CardHeader className="flex-row items-start justify-between gap-3">
      <div>
        <CardTitle>{title}</CardTitle>
        {description ? (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action}
    </CardHeader>
    <CardContent>{loading ? <Skeleton className="h-64 w-full" /> : children}</CardContent>
  </Card>
);

export const AdminDashboardPage = () => {
  useDocumentTitle('Tổng quan');

  const theme = useAppSelector((state) => state.theme.theme);
  const series = chartColor(theme);

  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [revenue, setRevenue] = useState<RevenuePoint[]>([]);
  const [statusPoints, setStatusPoints] = useState<OrderStatusPoint[]>([]);
  const [topProducts, setTopProducts] = useState<TopProductPoint[]>([]);
  const [byCategory, setByCategory] = useState<CategoryCountPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingRevenue, setLoadingRevenue] = useState(true);

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      dashboardApi.stats(),
      dashboardApi.orderStatus(),
      dashboardApi.topProducts(),
      dashboardApi.productsByCategory(),
    ])
      .then(([statsData, statusData, topData, categoryData]) => {
        if (cancelled) return;
        setStats(statsData);
        setStatusPoints(statusData);
        setTopProducts(topData);
        setByCategory(categoryData);
      })
      .catch((error) => {
        if (!cancelled) toast.error(getErrorMessage(error, 'Không tải được số liệu'));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoadingRevenue(true);

    dashboardApi
      .revenue(year)
      .then((data) => {
        if (!cancelled) setRevenue(data.months);
      })
      .catch((error) => {
        if (!cancelled) toast.error(getErrorMessage(error, 'Không tải được doanh thu'));
      })
      .finally(() => {
        if (!cancelled) setLoadingRevenue(false);
      });

    return () => {
      cancelled = true;
    };
  }, [year]);

  if (loading && !stats) return <LoadingBlock label="Đang tải số liệu..." />;

  const totalOrders = statusPoints.reduce((sum, point) => sum + point.count, 0);

  return (
    <div className="space-y-5">
      {/* Bốn số tổng theo yêu cầu đề bài */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Tổng sản phẩm"
          value={formatNumber(stats?.products ?? 0)}
          icon={Package}
        />
        <StatCard
          label="Tổng danh mục"
          value={formatNumber(stats?.categories ?? 0)}
          icon={FolderTree}
        />
        <StatCard
          label="Tổng đơn hàng"
          value={formatNumber(stats?.orders ?? 0)}
          icon={ShoppingBag}
        />
        <StatCard label="Tổng người dùng" value={formatNumber(stats?.users ?? 0)} icon={Users} />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard
          label="Doanh thu (đơn hoàn thành)"
          value={formatCurrency(stats?.revenue ?? 0)}
          icon={Wallet}
          hint="Tính trên toàn bộ thời gian"
        />
        <StatCard
          label="Đơn chờ xác nhận"
          value={formatNumber(stats?.pendingOrders ?? 0)}
          icon={Clock}
          hint="Cần xử lý"
          emphasis="warning"
        />
        <StatCard
          label="Sản phẩm sắp hết"
          value={formatNumber(stats?.lowStock ?? 0)}
          icon={AlertTriangle}
          hint="Còn 5 sản phẩm hoặc ít hơn"
          emphasis="destructive"
        />
      </div>

      <ChartCard
        title="Doanh thu 12 tháng"
        description="Chỉ tính đơn ở trạng thái Hoàn thành"
        loading={loadingRevenue}
        action={
          <div className="w-28">
            <Select
              value={year}
              onChange={(event) => setYear(Number(event.target.value))}
              aria-label="Chọn năm"
              className="h-9"
            >
              {[currentYear, currentYear - 1, currentYear - 2].map((option) => (
                <option key={option} value={option}>
                  Năm {option}
                </option>
              ))}
            </Select>
          </div>
        }
      >
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={revenue} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={series} stopOpacity={0.28} />
                <stop offset="100%" stopColor={series} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={CHART_INK.grid} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="label" {...AXIS_PROPS} />
            <YAxis {...AXIS_PROPS} width={54} tickFormatter={(value) => formatCompact(Number(value))} />
            <Tooltip
              cursor={{ stroke: CHART_INK.axis, strokeWidth: 1, strokeDasharray: '3 3' }}
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                const point = payload[0]!.payload as RevenuePoint;
                return (
                  <ChartTooltipCard
                    title={`Tháng ${String(label).replace('T', '')}`}
                    color={series}
                    rows={[
                      { label: 'Doanh thu', value: formatCurrency(point.revenue) },
                      { label: 'Số đơn', value: formatNumber(point.orders) },
                    ]}
                  />
                );
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke={series}
              strokeWidth={2}
              fill="url(#revenueFill)"
              dot={{ r: 4, fill: series, stroke: CHART_INK.surface, strokeWidth: 2 }}
              activeDot={{ r: 5, fill: series, stroke: CHART_INK.surface, strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid gap-4 xl:grid-cols-2">
        <ChartCard
          title="Đơn hàng theo trạng thái"
          description={`Tổng ${formatNumber(totalOrders)} đơn`}
          loading={loading}
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={statusPoints}
              layout="vertical"
              margin={{ top: 4, right: 44, left: 4, bottom: 4 }}
              barCategoryGap={10}
            >
              <CartesianGrid stroke={CHART_INK.grid} strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" {...AXIS_PROPS} allowDecimals={false} />
              {/* Nhãn trục là chữ, nên danh tính trạng thái không phụ thuộc màu */}
              <YAxis type="category" dataKey="label" {...AXIS_PROPS} width={104} />
              <Tooltip
                cursor={{ fill: CHART_INK.grid, fillOpacity: 0.3 }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const point = payload[0]!.payload as OrderStatusPoint;
                  return (
                    <ChartTooltipCard
                      title={point.label}
                      color={series}
                      rows={[
                        { label: 'Số đơn', value: formatNumber(point.count) },
                        {
                          label: 'Tỷ lệ',
                          value: `${totalOrders > 0 ? Math.round((point.count / totalOrders) * 100) : 0}%`,
                        },
                      ]}
                    />
                  );
                }}
              />
              <Bar dataKey="count" fill={series} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <ChartValueTable
            rows={statusPoints.map((point) => ({
              label: point.label,
              value: `${formatNumber(point.count)} đơn`,
            }))}
          />
        </ChartCard>

        <ChartCard
          title="Top 5 sản phẩm bán chạy"
          description="Không tính đơn đã huỷ"
          loading={loading}
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={topProducts}
              layout="vertical"
              margin={{ top: 4, right: 44, left: 4, bottom: 4 }}
              barCategoryGap={10}
            >
              <CartesianGrid stroke={CHART_INK.grid} strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" {...AXIS_PROPS} allowDecimals={false} />
              <YAxis
                type="category"
                dataKey="name"
                {...AXIS_PROPS}
                width={150}
                tickFormatter={(value: string) => truncate(value, 20)}
              />
              <Tooltip
                cursor={{ fill: CHART_INK.grid, fillOpacity: 0.3 }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const point = payload[0]!.payload as TopProductPoint;
                  return (
                    <ChartTooltipCard
                      title={point.name}
                      color={series}
                      rows={[
                        { label: 'Đã bán', value: `${formatNumber(point.quantity)} sản phẩm` },
                        { label: 'Doanh thu', value: formatCurrency(point.revenue) },
                      ]}
                    />
                  );
                }}
              />
              <Bar dataKey="quantity" fill={series} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <ChartValueTable
            columns={1}
            rows={topProducts.map((point) => ({
              label: point.name,
              value: `${formatNumber(point.quantity)} cái · ${formatCurrency(point.revenue)}`,
            }))}
          />
        </ChartCard>
      </div>

      <ChartCard
        title="Sản phẩm theo danh mục"
        description="Đã gộp sản phẩm của các danh mục con vào danh mục cha"
        loading={loading}
      >
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={byCategory}
            margin={{ top: 20, right: 8, left: 0, bottom: 4 }}
            barCategoryGap={12}
          >
            <CartesianGrid stroke={CHART_INK.grid} strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              {...AXIS_PROPS}
              interval={0}
              tickFormatter={(value: string) => truncate(value, 12)}
            />
            <YAxis {...AXIS_PROPS} width={36} allowDecimals={false} />
            <Tooltip
              cursor={{ fill: CHART_INK.grid, fillOpacity: 0.3 }}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const point = payload[0]!.payload as CategoryCountPoint;
                return (
                  <ChartTooltipCard
                    title={point.name}
                    color={series}
                    rows={[{ label: 'Số sản phẩm', value: formatNumber(point.count) }]}
                  />
                );
              }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {byCategory.map((point) => (
                <Cell key={point.name} fill={series} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <ChartValueTable
          rows={byCategory.map((point) => ({
            label: point.name,
            value: `${formatNumber(point.count)} sản phẩm`,
          }))}
        />
      </ChartCard>
    </div>
  );
};
