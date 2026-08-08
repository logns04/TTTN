import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Ghép class Tailwind, class sau ghi đè class trước khi trùng nhóm. */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
