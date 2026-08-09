// Dải Unicode combining diacritical marks — phần dấu bị tách ra sau khi normalize('NFD').
const COMBINING_MARKS = /[̀-ͯ]/g;


export const slugify = (input: string): string => {
  const slug = input
    .normalize('NFD')
    .replace(COMBINING_MARKS, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .slice(0, 180)
    .replace(/^-+|-+$/g, '');

  return slug || 'item';
};

export const uniqueSlug = async (
  source: string,
  exists: (slug: string) => Promise<boolean>,
): Promise<string> => {
  const base = slugify(source);
  let candidate = base;
  let counter = 1;

  while (await exists(candidate)) {
    counter += 1;
    candidate = `${base}-${counter}`;
  }

  return candidate;
};
