import { z } from 'zod';

/**
 * Payload SePay gửi tới webhook.
 *
 * Chỉ `id`, `transferAmount`, `transferType` là thứ mình thực sự dựa vào; phần
 * còn lại nới lỏng để SePay thêm field mới không làm hỏng webhook. Nhận cả
 * null lẫn thiếu field vì tài liệu không cam kết field nào luôn có.
 */
export const sepayWebhookSchema = z.object({
  id: z.coerce.number().int().positive(),
  gateway: z.string().max(80).default('unknown'),
  transactionDate: z.string().max(40).optional(),
  accountNumber: z.string().max(60).nullish(),
  subAccount: z.string().max(60).nullish(),
  /** Mã thanh toán SePay tự tách từ nội dung chuyển khoản. */
  code: z.string().max(60).nullish(),
  content: z.string().max(500).default(''),
  /** 'in' = tiền vào, 'out' = tiền ra. */
  transferType: z.string().max(10).default('in'),
  description: z.string().max(1000).nullish(),
  transferAmount: z.coerce.number(),
  accumulated: z.coerce.number().nullish(),
  referenceCode: z.string().max(120).nullish(),
});

export type SepayWebhookPayload = z.infer<typeof sepayWebhookSchema>;
