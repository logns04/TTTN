interface Row {
  label: string;
  value: string;
}

export const ChartValueTable = ({ rows, columns = 2 }: { rows: Row[]; columns?: 1 | 2 }) => {
  if (rows.length === 0) return null;

  return (
    <dl
      className={`mt-3 grid gap-x-6 gap-y-1 border-t border-border pt-3 text-xs ${
        columns === 2 ? 'sm:grid-cols-2' : ''
      }`}
    >
      {rows.map((row) => (
        <div key={row.label} className="flex items-baseline justify-between gap-3">
          <dt className="min-w-0 truncate text-muted-foreground">{row.label}</dt>
          <dd className="shrink-0 font-medium tabular-nums">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
};
