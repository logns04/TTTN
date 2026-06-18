import fs from 'fs-extra';
import path from 'path';

import { ConfigSchema } from './config.schema';
import { DatabaseConfig } from '../types/database-config';

export class ConfigLoader {
  static load(): DatabaseConfig {
    const configPath = path.resolve(process.cwd(), 'config/db.config.json');

    const raw = fs.readJsonSync(configPath);

    const parsed = ConfigSchema.safeParse(raw);

    if (!parsed.success) {
      throw new Error('Invalid Config');
    }

    return parsed.data;
  }
}
