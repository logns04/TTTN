export const CHART_SERIES_COLOR = {
  light: '#A8760C',
  dark: '#B8862A',
} as const;

export const CHART_INK = {
  grid: 'var(--border)',
  axis: 'var(--muted-foreground)',
  surface: 'var(--card)',
} as const;

export const chartColor = (theme: 'light' | 'dark') => CHART_SERIES_COLOR[theme];

export const AXIS_PROPS = {
  tick: { fill: CHART_INK.axis, fontSize: 12 },
  tickLine: false,
  axisLine: false,
} as const;

export const truncate = (value: string, max = 22) =>
  value.length <= max ? value : `${value.slice(0, max - 1)}…`;
