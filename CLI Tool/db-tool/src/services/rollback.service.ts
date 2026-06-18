import fs from 'fs-extra';
import path from 'path';
import mysql from 'mysql2/promise';

import { DatabaseConfig } from '../types/database-config';

import { MysqlRestoreService } from './mysql-restore.service';

import { LoggerService } from './logger.service';

export class RollbackService {
  static async getLatestSnapshot(config: DatabaseConfig): Promise<string> {
    const rollbackDir = path.join(
      process.cwd(),
      'Rollback',
      `${config.dialect}_${config.database}`
    );

    const files = await fs.readdir(rollbackDir);

    const snapshots = files
      .filter((file) => file.endsWith('.sql'))
      .sort()
      .reverse();

    if (snapshots.length === 0) {
      throw new Error('No Snapshot Found');
    }

    return path.join(rollbackDir, snapshots[0]);
  }

  static async restoreSnapshot(
    config: DatabaseConfig,
    snapshotFile: string
  ): Promise<void> {
    const sql = await fs.readFile(snapshotFile, 'utf8');

    const connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.username,
      password: config.password,
      database: config.database,
      multipleStatements: true,
    });

    console.log('Executing Snapshot...');

    await connection.query(sql);

    console.log('Snapshot Executed');

    await connection.end();
  }

  static async rollback(config: DatabaseConfig): Promise<void> {
    const logFile = path.join(
      process.cwd(),
      'Rollback',
      `${config.dialect}_${config.database}`,
      'rollback.log'
    );

    try {
      await LoggerService.getInstance().info(
        'rollback.log',
        `Starting Rollback: ${config.database}`
      );

      await fs.ensureDir(path.dirname(logFile));

      const snapshot = await this.getLatestSnapshot(config);

      console.log(`Rollback From: ${snapshot}`);

      await fs.appendFile(
        logFile,
        `[${new Date().toISOString()}] Snapshot: ${snapshot}\n`
      );

      console.log('Dropping Database...');

      await MysqlRestoreService.dropDatabase(config);

      console.log('Creating Database...');

      await MysqlRestoreService.createDatabase(config);

      console.log('Restoring Snapshot...');

      await this.restoreSnapshot(config, snapshot);

      console.log('Rollback Finished');

      await LoggerService.getInstance().info(
        'rollback.log',
        `Rollback Success: ${config.database}`
      );

      await fs.appendFile(
        logFile,
        `[${new Date().toISOString()}] Rollback Success\n`
      );
    } catch (error) {
      await LoggerService.getInstance().error(
        'rollback.log',
        error instanceof Error ? error.message : String(error)
      );

      console.log('Rollback Failed');

      console.log(error);

      await fs.ensureDir(path.dirname(logFile));

      await fs.appendFile(
        logFile,
        `[${new Date().toISOString()}] Rollback Failed\n`
      );

      return;
    }
  }
}
