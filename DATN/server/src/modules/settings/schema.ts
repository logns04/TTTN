import { z } from 'zod';
import { SETTING_KEYS } from './keys';

export const updateSettingsSchema = z
  .record(z.string(), z.union([z.string(), z.boolean(), z.number()]))
  .transform((input) => {
    const result: Record<string, string> = {};
    for (const [key, value] of Object.entries(input)) {
      if (SETTING_KEYS.includes(key)) result[key] = String(value);
    }
    return result;
  })
  .refine((result) => Object.keys(result).length > 0, {
    message: `Không có cấu hình nào hợp lệ. Các khoá cho phép: ${SETTING_KEYS.join(', ')}`,
  });

export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
