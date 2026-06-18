import mysqldump from 'mysqldump';
import fs from 'fs-extra';
import path from 'path';

import { DatabaseConfig } from '../types/database-config';

import { ErrorHandlerService } from './error-handler.service';

export class SnapshotService {
  static async create(config: DatabaseConfig): Promise<string> {
    try {
      const rollbackDir = path.join(
        process.cwd(),
        'Rollback',
        `${config.dialect}_${config.database}`
      );

      await fs.ensureDir(rollbackDir);

      const fileName = `snapshot_${Date.now()}.sql`;

      const snapshotFile = path.join(rollbackDir, fileName);

      await mysqldump({
        connection: {
          host: config.host,
          port: config.port,
          user: config.username,
          password: config.password,
          database: config.database,
        },

        dumpToFile: snapshotFile,
      });

      return snapshotFile;
    } catch (error) {
      await ErrorHandlerService.handle('snapshot', error);

      throw error;
    }
  }
}
