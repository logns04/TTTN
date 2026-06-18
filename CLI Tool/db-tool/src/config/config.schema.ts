import { z } from 'zod';

export const ConfigSchema = z.object({
  username: z.string().min(1),
  password: z.string(),
  database: z.string().min(1),
  host: z.string().min(1),
  dialect: z.enum(['mysql', 'mariadb', 'mssql', 'sqlserver', 'mongodb']),
  port: z.number(),
});
