/**
 * Tham số màu cho biểu đồ dashboard.
 *
 * Cả bốn biểu đồ đều là MỘT series (doanh thu theo tháng, số đơn theo trạng
 * thái, top sản phẩm, số sản phẩm theo danh mục) nên chỉ cần một hue cho phần
 * mark — không có categorical palette, do đó không có rủi ro hai màu trông
 * giống nhau với người mù màu.
 *
 * Hai giá trị dưới đây được kiểm bằng validator của skill dataviz và PASS cả
 * 5 check (lightness band, chroma floor, contrast >= 3:1) trên đúng surface của
 * từng mode. Dark KHÔNG phải lật màu của light — nó là một bước riêng, vì dải
 * lightness cho dark hẹp hơn (0.48–0.67 so với 0.43–0.77).
 *
 * Cố ý không dùng --primary (màu nhấn admin tự chọn) cho mark biểu đồ: màu đó
 * có thể bị đặt thành giá trị quá nhạt hoặc quá xám, làm biểu đồ mất tương phản.
 * Tính đọc được của biểu đồ không nên phụ thuộc lựa chọn thẩm mỹ của người dùng.
 */
export const CHART_SERIES_COLOR = {
  light: '#A8760C',
  dark: '#B8862A',
} as const;

/** Màu phần trục, lưới và chữ — lấy từ token của theme để tự đổi theo dark/light. */
export const CHART_INK = {
  grid: 'var(--border)',
  axis: 'var(--muted-foreground)',
  surface: 'var(--card)',
} as const;

export const chartColor = (theme: 'light' | 'dark') => CHART_SERIES_COLOR[theme];

/** Cấu hình dùng lại cho trục: chữ nhỏ, mờ, không vẽ đường trục cho đỡ nhiễu. */
export const AXIS_PROPS = {
  tick: { fill: CHART_INK.axis, fontSize: 12 },
  tickLine: false,
  axisLine: false,
} as const;

/** Rút gọn tên dài trên nhãn trục để không chồng chữ. */
export const truncate = (value: string, max = 22) =>
  value.length <= max ? value : `${value.slice(0, max - 1)}…`;
