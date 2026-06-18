import mysql from 'mysql2/promise';
import { BackupService } from '../../services/backup.service';
import { ForeignKey } from '../../types/foreign-key';

import { SnapshotService } from '../../services/snapshot.service';

import { RestoreService } from '../../services/restore.service';

import { MysqlRestoreService } from '../../services/mysql-restore.service';

import { VerifyService } from '../../services/verify.service';

import { SqlExecutorService } from '../../services/sql-executor.service';

import { retry } from '../../utils/retry';

import { LoggerService } from '../../services/logger.service';

import { withTimeout } from '../../utils/timeout';

import { RestoreStateService } from '../../services/restore-state.service';

import { RollbackService } from '../../services/rollback.service';

import { LastRestoreService } from '../../services/last-restore.service';

import { DatabaseDriver } from '../../interfaces/database-driver';
import { DatabaseConfig } from '../../types/database-config';

import { HistoryService } from '../../services/history.service';

import { ErrorHandlerService } from '../../services/error-handler.service';

export class MysqlDriver implements DatabaseDriver {
  private connection?: mysql.Connection;

  constructor(private readonly config: DatabaseConfig) {}

  async connect(): Promise<void> {
    this.connection = await mysql.createConnection({
      host: this.config.host,
      port: this.config.port,
      user: this.config.username,
      password: this.config.password,
      database: this.config.database,
    });
  }

  async disconnect(): Promise<void> {
    await this.connection?.end();
  }

  async test(): Promise<boolean> {
    try {
      const connection = await mysql.createConnection({
        host: this.config.host,
        port: this.config.port,
        user: this.config.username,
        password: this.config.password,
        database: this.config.database,
      });

      await connection.end();

      return true;
    } catch (error) {
      await ErrorHandlerService.handle('connection', error);

      return false;
    }
  }

  async getIndexes(): Promise<unknown[]> {
    await this.connect();

    const [rows] = await this.connection!.query(
      `
      SELECT
        TABLE_NAME,
        INDEX_NAME,
        COLUMN_NAME
      FROM information_schema.STATISTICS
      WHERE TABLE_SCHEMA = ?
      `,
      [this.config.database]
    );

    await this.disconnect();

    return rows as unknown[];
  }
  async getTriggers(): Promise<unknown[]> {
    await this.connect();

    const [rows] = await this.connection!.query(
      `
      SELECT
        TRIGGER_NAME,
        EVENT_OBJECT_TABLE,
        ACTION_TIMING,
        EVENT_MANIPULATION
      FROM information_schema.TRIGGERS
      WHERE TRIGGER_SCHEMA = ?
      `,
      [this.config.database]
    );

    await this.disconnect();

    return rows as unknown[];
  }
  async getConstraints(): Promise<unknown[]> {
    await this.connect();

    const [rows] = await this.connection!.query(
      `
      SELECT
        CONSTRAINT_NAME,
        TABLE_NAME,
        CONSTRAINT_TYPE
      FROM information_schema.TABLE_CONSTRAINTS
      WHERE TABLE_SCHEMA = ?
      `,
      [this.config.database]
    );

    await this.disconnect();

    return rows as unknown[];
  }
  async getAutoIncrements(): Promise<unknown[]> {
    await this.connect();

    const [rows] = await this.connection!.query(
      `
      SELECT
        TABLE_NAME,
        AUTO_INCREMENT
      FROM information_schema.TABLES
      WHERE TABLE_SCHEMA = ?
      `,
      [this.config.database]
    );

    await this.disconnect();

    return rows as unknown[];
  }
  async backup(): Promise<void> {
    const tables = await this.getTables();
    const rowCounts = await this.getRowCounts();
    const foreignKeys = await this.getForeignKeys();
    const schema = await this.getSchema();
    const views = await this.getViews();
    const procedures = await this.getProcedures();
    const functions = await this.getFunctions();
    const indexes = await this.getIndexes();
    const triggers = await this.getTriggers();
    const constraints = await this.getConstraints();
    const autoIncrements = await this.getAutoIncrements();
    const primaryKeys = await this.getPrimaryKeys();

    await BackupService.backup(
      this.config,
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
      primaryKeys
    );
  }

  async restore(backupPath: string): Promise<void> {
    try {
      await LoggerService.getInstance().info(
        'restore.log',
        `Starting Restore: ${backupPath}`
      );
      const state = await RestoreStateService.load();

      if (state) {
        console.log(`Resume From: ${state}`);
      }

      //
      // Load Metadata
      //
      console.log('Loading Metadata...');

      const metadata = await RestoreService.loadMetadata(backupPath);

      console.log('Metadata Loaded');

      //
      // Test Connection
      //
      console.log('Testing Connection...');

      const connected = await this.test();

      if (!connected) {
        throw new Error('Connection Failed');
      }

      console.log('Passed');

      //
      // Snapshot Current DB
      //
      console.log('Creating Snapshot...');

      await SnapshotService.create(this.config);

      console.log('Snapshot Created');

      //
      // Create Database
      //
      console.log('Creating Database...');

      await MysqlRestoreService.createDatabase(this.config);

      console.log('Database Created');

      //
      // Disable FK
      //
      console.log('Disable FK...');

      await MysqlRestoreService.disableForeignKeys(this.config);

      //
      // Get Full SQL
      //
      const sqlFile = RestoreService.getFullSqlPath(backupPath);

      //
      // Save Resume State
      //
      await RestoreStateService.save('full.sql');

      //
      // Restore Schema + Data
      //
      console.log('Restore Schema + Data...');

      await withTimeout(
        retry(
          () => SqlExecutorService.execute(this.config, sqlFile),

          3
        ),

        300000
      );

      console.log('Database Restored');

      //
      // Enable FK
      //
      console.log('Enable FK...');

      await MysqlRestoreService.enableForeignKeys(this.config);
      //
      // Checksum
      //
      if (metadata && metadata.checksum) {
        console.log('Backup Checksum:');

        console.log(metadata.checksum);
      }

      //
      // Clear Resume State
      //
      await RestoreStateService.clear();

      //
      // Success
      //
      await LastRestoreService.save(backupPath);
      await HistoryService.add('restore', this.config.database, 'SUCCESS');
      console.log('Restore Success');

      await LoggerService.getInstance().info(
        'restore.log',
        `Restore Success: ${this.config.database}`
      );
    } catch (error) {
      await LoggerService.getInstance().error(
        'restore.log',
        error instanceof Error ? error.message : String(error)
      );

      await HistoryService.add('restore', this.config.database, 'FAIL');

      console.log('Restore Failed');

      console.log('Starting Rollback...');

      try {
        await RollbackService.rollback(this.config);

        await RestoreStateService.clear();

        console.log('Verifying Rollback...');

        const connected = await this.test();

        if (connected) {
          console.log('Rollback Verify Passed');
        } else {
          console.log('Rollback Verify Failed');
        }
      } catch (rollbackError) {
        await LoggerService.getInstance().error(
          'rollback.log',
          rollbackError instanceof Error
            ? rollbackError.message
            : String(rollbackError)
        );

        console.log('Rollback Failed');
      }

      return;
    }
  }

  async verify(): Promise<boolean> {
    console.log('');
    console.log('========== VERIFY ==========');

    let backupPath: string;

    try {
      backupPath = await LastRestoreService.load();
    } catch {
      console.log('No Restore History Found');

      return false;
    }

    console.log('Backup:', backupPath);
    const metadata = await RestoreService.loadMetadata(backupPath);

    const tableCountVerified = await VerifyService.verifyTableCount(
      this.config,
      metadata
    );

    const rowCountVerified = await VerifyService.verifyRowCounts(
      this.config,
      metadata
    );

    const primaryKeyVerified = await VerifyService.verifyPrimaryKeys(
      this.config,
      metadata
    );

    const foreignKeyVerified = await VerifyService.verifyForeignKeys(
      this.config,
      metadata
    );

    const constraintVerified = await VerifyService.verifyConstraints(
      this.config,
      metadata
    );

    const indexVerified = await VerifyService.verifyIndexes(
      this.config,
      metadata
    );

    const triggerVerified = await VerifyService.verifyTriggers(
      this.config,
      metadata
    );

    const procedureVerified = await VerifyService.verifyProcedures(
      this.config,
      metadata
    );

    const checksumVerified = await VerifyService.verifyChecksum(
      backupPath,
      metadata
    );

    console.log('');

    console.log('========== VERIFY RESULT ==========');

    console.log(`Table Count : ${tableCountVerified ? 'PASS' : 'FAIL'}`);

    console.log(`Row Count : ${rowCountVerified ? 'PASS' : 'FAIL'}`);

    console.log(`Primary Key : ${primaryKeyVerified ? 'PASS' : 'FAIL'}`);

    console.log(`Foreign Key : ${foreignKeyVerified ? 'PASS' : 'FAIL'}`);

    console.log(`Constraint  : ${constraintVerified ? 'PASS' : 'FAIL'}`);

    console.log(`Index       : ${indexVerified ? 'PASS' : 'FAIL'}`);

    console.log(`Trigger     : ${triggerVerified ? 'PASS' : 'FAIL'}`);

    console.log(`Procedure   : ${procedureVerified ? 'PASS' : 'FAIL'}`);

    console.log(`Checksum    : ${checksumVerified ? 'PASS' : 'FAIL'}`);

    console.log('');

    const success =
      tableCountVerified &&
      rowCountVerified &&
      primaryKeyVerified &&
      foreignKeyVerified &&
      constraintVerified &&
      indexVerified &&
      triggerVerified &&
      procedureVerified &&
      checksumVerified;

    console.log('===================================');

    console.log(success ? 'VERIFY PASS' : 'VERIFY FAIL');

    console.log('===================================');
    if (success) {
      await LoggerService.getInstance().info(
        'verify.log',
        `Verify Success: ${this.config.database}`
      );
      if (!success) {
        await LoggerService.getInstance().warn(
          'verify.log',
          `Verify Failed: ${this.config.database}`
        );
      }
    }
    if (!success) {
      await ErrorHandlerService.handle('verify', new Error('Verify Failed'));
    }
    return success;
  }

  async rollback(): Promise<void> {}

  async createSnapshot(): Promise<void> {
    const file = await SnapshotService.create(this.config);

    console.log(`Snapshot created: ${file}`);
  }

  async getSchema(): Promise<unknown> {
    await this.connect();

    const [rows] = await this.connection!.query(
      `
      SELECT
        DEFAULT_CHARACTER_SET_NAME,
        DEFAULT_COLLATION_NAME
      FROM information_schema.SCHEMATA
      WHERE SCHEMA_NAME = ?
      `,
      [this.config.database]
    );

    await this.disconnect();

    return rows;
  }
  static async dropDatabase(config: DatabaseConfig): Promise<void> {
    const connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.username,
      password: config.password,
    });

    await connection.query(`DROP DATABASE IF EXISTS \`${config.database}\``);

    await connection.end();
  }
  static async createDatabase(config: DatabaseConfig): Promise<void> {
    const connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.username,
      password: config.password,
    });

    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${config.database}\``
    );

    await connection.end();
  }
  async getPrimaryKeys(): Promise<unknown[]> {
    await this.connect();

    const [rows] = await this.connection!.query(
      `
      SELECT
        TABLE_NAME,
        COLUMN_NAME
      FROM information_schema.KEY_COLUMN_USAGE
      WHERE
        TABLE_SCHEMA = ?
        AND CONSTRAINT_NAME = 'PRIMARY'
      `,
      [this.config.database]
    );

    await this.disconnect();

    return rows as unknown[];
  }
  async getForeignKeys(): Promise<ForeignKey[]> {
    await this.connect();

    const [rows] = await this.connection!.query(
      `
      SELECT
        TABLE_NAME,
        COLUMN_NAME,
        REFERENCED_TABLE_NAME,
        REFERENCED_COLUMN_NAME
      FROM information_schema.KEY_COLUMN_USAGE
      WHERE
        TABLE_SCHEMA = ?
        AND REFERENCED_TABLE_NAME IS NOT NULL
      `,
      [this.config.database]
    );

    await this.disconnect();

    return (
      rows as {
        TABLE_NAME: string;
        COLUMN_NAME: string;
        REFERENCED_TABLE_NAME: string;
        REFERENCED_COLUMN_NAME: string;
      }[]
    ).map((row) => ({
      table: row.TABLE_NAME,
      column: row.COLUMN_NAME,
      referencedTable: row.REFERENCED_TABLE_NAME,
      referencedColumn: row.REFERENCED_COLUMN_NAME,
    }));
  }
  async getProcedures(): Promise<string[]> {
    await this.connect();

    const [rows] = await this.connection!.query(
      `
            SELECT ROUTINE_NAME
            FROM information_schema.ROUTINES
            WHERE
                ROUTINE_SCHEMA = ?
                AND ROUTINE_TYPE = 'PROCEDURE'
            `,
      [this.config.database]
    );

    await this.disconnect();

    return (
      rows as {
        ROUTINE_NAME: string;
      }[]
    ).map((row) => row.ROUTINE_NAME);
  }
  async getFunctions(): Promise<string[]> {
    await this.connect();

    const [rows] = await this.connection!.query(
      `
      SELECT ROUTINE_NAME
      FROM information_schema.ROUTINES
      WHERE
        ROUTINE_SCHEMA = ?
        AND ROUTINE_TYPE = 'FUNCTION'
      `,
      [this.config.database]
    );

    await this.disconnect();

    return (
      rows as {
        ROUTINE_NAME: string;
      }[]
    ).map((row) => row.ROUTINE_NAME);
  }

  async getTables(): Promise<string[]> {
    await this.connect();

    const [rows] = await this.connection!.query('SHOW TABLES');

    await this.disconnect();

    return (rows as Record<string, string>[]).map(
      (row) => Object.values(row)[0]
    );
  }
  async getRowCounts(): Promise<Record<string, number>> {
    const result: Record<string, number> = {};

    const tables = await this.getTables();

    await this.connect();

    for (const table of tables) {
      const [rows] = await this.connection!.query(
        `
        SELECT COUNT(*) AS total
        FROM \`${table}\`
        `
      );

      result[table] = (
        rows as {
          total: number;
        }[]
      )[0].total;
    }

    await this.disconnect();

    return result;
  }
  async getViews(): Promise<string[]> {
    await this.connect();

    const [rows] = await this.connection!.query(
      `
      SELECT TABLE_NAME
      FROM information_schema.VIEWS
      WHERE TABLE_SCHEMA = ?
      `,
      [this.config.database]
    );

    await this.disconnect();

    return (
      rows as {
        TABLE_NAME: string;
      }[]
    ).map((row) => row.TABLE_NAME);
  }
}
