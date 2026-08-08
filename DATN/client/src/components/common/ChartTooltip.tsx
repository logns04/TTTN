import type { ReactNode } from 'react';

interface TooltipRow {
  label: string;
  value: ReactNode;
}

/**
 * Tooltip dùng chung cho mọi biểu đồ trong dashboard.
 *
 * Chữ trong tooltip mặc token text (foreground / muted-foreground), không mặc
 * màu của series — màu chỉ nằm ở chấm nhỏ bên cạnh để chỉ danh tính.
 */
export const ChartTooltipCard = ({
  title,
  rows,
  color,
}: {
  title: string;
  rows: TooltipRow[];
  color?: string;
}) => (
  <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
    <p className="mb-1 flex items-center gap-1.5 text-xs font-medium text-foreground">
      {color ? (
        <span className="size-2 rounded-full" style={{ backgroundColor: color }} aria-hidden />
      ) : null}
      {title}
    </p>
    {rows.map((row) => (
      <p key={row.label} className="text-xs text-muted-foreground">
        {row.label}: <span className="font-medium text-foreground">{row.value}</span>
      </p>
    ))}
  </div>
);
