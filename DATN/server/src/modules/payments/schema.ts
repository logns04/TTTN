import { z } from 'zod';

export const sepayWebhookSchema = z.object({
  id: z.coerce.number().int().positive(),
  gateway: z.string().max(80).default('unknown'),
  transactionDate: z.string().max(40).optional(),
  accountNumber: z.string().max(60).nullish(),
  subAccount: z.string().max(60).nullish(),

  code: z.string().max(60).nullish(),
  content: z.string().max(500).default(''),

  transferType: z.string().max(10).default('in'),
  description: z.string().max(1000).nullish(),
  transferAmount: z.coerce.number(),
  accumulated: z.coerce.number().nullish(),
  referenceCode: z.string().max(120).nullish(),
});

export type SepayWebhookPayload = z.infer<typeof sepayWebhookSchema>;
