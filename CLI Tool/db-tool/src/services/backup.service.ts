import mysqldump from 'mysqldump';
import fs from 'fs-extra';
import path from 'path';

import { HistoryService } from './history.service';

import { LoggerService } from './logger.service';

import { ErrorHandlerService } from './error-handler.service';

import { ForeignKey } from '../types/foreign-key';
import { DatabaseConfig } from '../types/database-config';
import { generateChecksum } from '../utils/checksum';

export class BackupService {
  static async backup(
    config: DatabaseConfig,
    tables: string[],
    foreignKeys: ForeignKey[],
    schema: unknown,
    views: string[],
    procedures: string[],
    functions: string[],
    indexes: unknown[],
    triggers: unknown[],
    constraints: unknown[],
    autoIncrements: unknown[],
    rowCounts: Record<string, number>,
    primaryKeys: unknown[]
  ): Promise<void> {
    try {
      await LoggerService.getInstance().info(
        'backup.log',
        `Starting Backup: ${config.database}`
      );
      const now = new Date();

      const date = now.toLocaleDateString('vi-VN').replace(/\//g, '-');

      const time = `${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}`;

      const folderName = `${config.dialect}_${config.database}_${date}_${time}`;

      const backupDir = path.join(process.cwd(), 'Data', folderName);

      const fullDir = path.join(backupDir, 'full');

      const dbDir = path.join(backupDir, 'DB');

      const logsDir = path.join(backupDir, 'logs');

      await fs.ensureDir(fullDir);
      await fs.ensureDir(dbDir);
      await fs.ensureDir(logsDir);

      const sqlFile = path.join(fullDir, 'full.sql');

      console.log('Creating full database backup...');

      await mysqldump({
        connection: {
          host: config.host,
          port: config.port,
          user: config.username,
          password: config.password,
          database: config.database,
        },
        dumpToFile: sqlFile,
      });

      const checksum = await generateChecksum(sqlFile);

      console.log('Tables:', tables);

      for (const table of tables) {
        console.log(`Backing up table: ${table}`);

        const tableFile = path.join(dbDir, `${table}.sql`);

        await mysqldump({
          connection: {
            host: config.host,
            port: config.port,
            user: config.username,
            password: config.password,
            database: config.database,
          },

          dump: {
            tables: [table],
          },

          dumpToFile: tableFile,
        });
      }

      const metadata = {
        version: '1.0',

        dialect: config.dialect,

        database: config.database,

        createdAt: now.toISOString(),

        tables,
        foreignKeys,
        schema,
        views,
        procedures,
        functions,
        indexes,
        triggers,
        constraints,
        autoIncrements,
        rowCounts,
        primaryKeys,
        checksum,
      };

      await fs.writeJson(path.join(backupDir, 'metadata.json'), metadata, {
        spaces: 2,
      });

      await fs.writeFile(
        path.join(logsDir, 'backup.log'),
        `[${new Date().toISOString()}] INFO Backup Success`
      );
      await HistoryService.add('backup', config.database, 'SUCCESS');
      await LoggerService.getInstance().info(
        'backup.log',
        `Starting Backup: ${config.database}`
      );
      console.log('Backup completed');

      console.log(`Backup Path: ${backupDir}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);

      if (message.includes('ENOSPC')) {
        await ErrorHandlerService.handle('backup', 'Disk Full');

        return;
      }
    }
  }
}
