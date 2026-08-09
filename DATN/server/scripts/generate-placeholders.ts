/**
 * Sinh ảnh placeholder nội thất dạng SVG vào server/public/uploads/seed/.
 *
 * Vì sao tự sinh chứ không lấy ảnh từ Unsplash: demo phải luôn có hình, kể cả
 * khi máy không có mạng hoặc link ảnh ngoài đổi/chết. SVG lại nhẹ (vài KB) và
 * nét ở mọi kích thước. Muốn thay ảnh thật thì chỉ cần upload đè ở trang admin.
 *
 * Chạy: npm run placeholders
 */
import fs from 'node:fs';
import path from 'node:path';

import { BANNERS } from '../prisma/data/banners';
import { CATEGORIES } from '../prisma/data/categories';
import { ICONS, type IconName } from '../prisma/data/icons';
import {
  PRODUCT_IMAGE_COUNT,
  SEED_IMAGE_DIR,
  bannerImageFile,
  categoryImageFile,
  logoImageFile,
  newsImageFile,
  productImageFile,
} from '../prisma/data/imageNames';
import { NEWS } from '../prisma/data/news';
import { PRODUCTS } from '../prisma/data/products';

const OUT_DIR = path.join(__dirname, '..', 'public', 'uploads', SEED_IMAGE_DIR);

interface Palette {
  from: string;
  to: string;
  ink: string;
  text: string;
}

// Tông trung tính ấm — be, nâu nhạt, xám xanh. Cố ý không dùng màu rực để ảnh
// placeholder trông như một phần của thiết kế chứ không như ảnh lỗi.
const PALETTES: Palette[] = [
  { from: '#F4ECE2', to: '#DCC9B2', ink: '#7A6350', text: '#6B5646' },
  { from: '#EFEAE4', to: '#CFC4B6', ink: '#6E6257', text: '#5F554B' },
  { from: '#EAEFEB', to: '#C4D2C8', ink: '#5C6E62', text: '#4F6155' },
  { from: '#F2ECE7', to: '#D8C4B8', ink: '#7C6157', text: '#6A524A' },
  { from: '#EBECF0', to: '#C7CCD6', ink: '#5F6675', text: '#535A68' },
  { from: '#F5EFE5', to: '#E0CDAF', ink: '#806B4A', text: '#6E5B3F' },
];

/** Hash ổn định để cùng một tên luôn ra cùng một màu giữa các lần chạy. */
const hash = (input: string): number => {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) {
    h = (h * 31 + input.charCodeAt(i)) % 1_000_003;
  }
  return h;
};

const pickPalette = (seed: string, offset = 0): Palette =>
  PALETTES[(hash(seed) + offset) % PALETTES.length]!;

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

/** Cắt chuỗi thành các dòng không vượt quá maxChars, cắt theo từ. */
const wrap = (text: string, maxChars: number, maxLines: number): string[] => {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxChars) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);

  if (lines.length <= maxLines) return lines;
  const kept = lines.slice(0, maxLines);
  kept[maxLines - 1] = `${kept[maxLines - 1]!.slice(0, maxChars - 1)}…`;
  return kept;
};

const FONT =
  "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

const gradientDefs = (palette: Palette) => `  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${palette.from}"/>
      <stop offset="1" stop-color="${palette.to}"/>
    </linearGradient>
  </defs>`;

const iconGroup = (
  icon: IconName,
  cx: number,
  cy: number,
  scale: number,
  palette: Palette,
  rotate = 0,
) => `  <g transform="translate(${cx} ${cy}) rotate(${rotate}) scale(${scale}) translate(-100 -100)"
     fill="none" stroke="${palette.ink}" stroke-width="4.5"
     stroke-linecap="round" stroke-linejoin="round" opacity="0.92">
${ICONS[icon]}
  </g>`;

const textLines = (
  lines: string[],
  x: number,
  y: number,
  fontSize: number,
  color: string,
  anchor: 'middle' | 'start' = 'middle',
  weight = 600,
) => {
  const spans = lines
    .map(
      (line, index) =>
        `      <tspan x="${x}" dy="${index === 0 ? 0 : fontSize * 1.28}">${escapeXml(line)}</tspan>`,
    )
    .join('\n');

  return `  <text x="${x}" y="${y}" font-family="${FONT}" font-size="${fontSize}"
        font-weight="${weight}" fill="${color}" text-anchor="${anchor}">
${spans}
  </text>`;
};

/**
 * Ảnh vuông cho sản phẩm và danh mục.
 *
 * `fraction` là tỷ lệ chiều rộng khung mà icon chiếm (0.5 = nửa khung).
 * Icon vẽ trong hệ toạ độ 200 đơn vị, nên scale = size × fraction ÷ 200.
 */
const buildSquare = (options: {
  icon: IconName;
  label: string;
  palette: Palette;
  size: number;
  fraction: number;
  rotate?: number;
}): string => {
  const { icon, label, palette, size, fraction, rotate = 0 } = options;
  const scale = (size * fraction) / 200;
  const lines = wrap(label, 26, 3);
  const labelBlockHeight = lines.length * size * 0.045;
  const iconCy = size * 0.44 - labelBlockHeight * 0.25;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"
     viewBox="0 0 ${size} ${size}" role="img" aria-label="${escapeXml(label)}">
${gradientDefs(palette)}
  <rect width="${size}" height="${size}" fill="url(#bg)"/>
  <rect x="${size * 0.035}" y="${size * 0.035}" width="${size * 0.93}" height="${size * 0.93}"
        rx="${size * 0.014}" fill="none" stroke="${palette.ink}" stroke-opacity="0.16" stroke-width="2"/>
${iconGroup(icon, size / 2, iconCy, scale, palette, rotate)}
${textLines(lines, size / 2, size * 0.845, size * 0.043, palette.text)}
</svg>
`;
};

/** Banner ngang: chữ bên trái, icon bên phải. */
const buildBanner = (options: {
  icon: IconName;
  headline: string;
  subline: string;
  palette: Palette;
}): string => {
  const { icon, headline, subline, palette } = options;
  const width = 1600;
  const height = 600;
  const headlineLines = wrap(headline, 26, 2);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"
     viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeXml(headline)}">
${gradientDefs(palette)}
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <circle cx="1240" cy="300" r="235" fill="${palette.ink}" opacity="0.07"/>
${iconGroup(icon, 1240, 300, 1.85, palette)}
${textLines(headlineLines, 120, 258, 62, palette.text, 'start', 700)}
${textLines(wrap(subline, 44, 2), 120, 258 + headlineLines.length * 78, 30, palette.text, 'start', 500)}
  <rect x="120" y="${258 + headlineLines.length * 78 + 60}" width="126" height="5" rx="2.5" fill="${palette.ink}" opacity="0.5"/>
</svg>
`;
};

/** Ảnh bài viết: khổ ngang 8:5. */
const buildNewsImage = (options: {
  icon: IconName;
  title: string;
  palette: Palette;
}): string => {
  const { icon, title, palette } = options;
  const width = 800;
  const height = 500;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"
     viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeXml(title)}">
${gradientDefs(palette)}
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
${iconGroup(icon, 400, 205, 1.5, palette)}
${textLines(wrap(title, 40, 2), 400, 400, 30, palette.text)}
</svg>
`;
};

const buildLogo = (): string => {
  const palette = PALETTES[0]!;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="440" height="120"
     viewBox="0 0 440 120" role="img" aria-label="Nội Thất Thành Long">
  <g transform="translate(60 60) scale(0.44) translate(-100 -100)"
     fill="none" stroke="#8B5E3C" stroke-width="7"
     stroke-linecap="round" stroke-linejoin="round">
${ICONS.sofa}
  </g>
  <text x="128" y="54" font-family="${FONT}" font-size="34" font-weight="700" fill="#5A4635">
    NỘI THẤT
  </text>
  <text x="128" y="92" font-family="${FONT}" font-size="30" font-weight="500" fill="#8B5E3C" letter-spacing="5">
    AN VIÊN
  </text>
</svg>
`;
};

const write = (fileName: string, content: string) => {
  fs.writeFileSync(path.join(OUT_DIR, fileName), content, 'utf8');
};

const main = () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  let count = 0;

  write(logoImageFile(), buildLogo());
  count += 1;

  for (const category of CATEGORIES) {
    write(
      categoryImageFile(category.name),
      buildSquare({
        icon: category.icon,
        label: category.name,
        palette: pickPalette(category.name),
        size: 600,
        fraction: 0.54,
      }),
    );
    count += 1;

    for (const child of category.children) {
      write(
        categoryImageFile(child.name),
        buildSquare({
          icon: child.icon,
          label: child.name,
          palette: pickPalette(child.name, 2),
          size: 600,
          fraction: 0.5,
        }),
      );
      count += 1;
    }
  }

  // Ba biến thể mỗi sản phẩm để gallery không phải ba ảnh giống hệt nhau:
  // đổi màu nền, cỡ icon và nghiêng nhẹ.
  const variants = [
    { fraction: 0.54, rotate: 0, offset: 0 },
    { fraction: 0.66, rotate: -4, offset: 2 },
    { fraction: 0.44, rotate: 5, offset: 4 },
  ];

  for (const product of PRODUCTS) {
    for (let index = 1; index <= PRODUCT_IMAGE_COUNT; index += 1) {
      const variant = variants[(index - 1) % variants.length]!;
      write(
        productImageFile(product.name, index),
        buildSquare({
          icon: product.icon,
          label: product.name,
          palette: pickPalette(product.name, variant.offset),
          size: 800,
          fraction: variant.fraction,
          rotate: variant.rotate,
        }),
      );
      count += 1;
    }
  }

  for (const banner of BANNERS) {
    write(
      bannerImageFile(banner.sortOrder),
      buildBanner({
        icon: banner.icon,
        headline: banner.headline,
        subline: banner.subline,
        palette: pickPalette(banner.title, 1),
      }),
    );
    count += 1;
  }

  for (const article of NEWS) {
    write(
      newsImageFile(article.title),
      buildNewsImage({
        icon: article.icon,
        title: article.title,
        palette: pickPalette(article.title, 3),
      }),
    );
    count += 1;
  }

  console.log(`Đã sinh ${count} ảnh placeholder vào ${OUT_DIR}`);
};

main();
