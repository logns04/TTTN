import mysql from 'mysql2/promise';

import { DatabaseConfig } from '../types/database-config';

import path from 'path';

import { generateChecksum } from '../utils/checksum';

import { BackupMetadata } from '../types/backup-metadata';

export class VerifyService {
  static async verifyTables(
    config: DatabaseConfig,
    tables: string[]
  ): Promise<boolean> {
    const connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.username,
      password: config.password,
      database: config.database,
    });

    try {
      console.log('Verifying tables...');

      for (const table of tables) {
        const [rows] = await connection.query(
          `
            SELECT COUNT(*) AS total
            FROM \`${table}\`
            `
        );

        const total = (
          rows as {
            total: number;
          }[]
        )[0].total;

        console.log(`${table}: ${total} rows`);
      }

      return true;
    } catch (error: unknown) {
      console.log(error);

      return false;
    } finally {
      await connection.end();
    }
  }
  static async verifyRowCounts(
    config: DatabaseConfig,
    metadata: BackupMetadata
  ): Promise<boolean> {
    const connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.username,
      password: config.password,
      database: config.database,
    });

    let passed = true;

    try {
      console.log('');
      console.log('========== ROW COUNT ==========');

      const rowCounts = metadata.rowCounts as Record<string, number>;

      for (const table of Object.keys(rowCounts)) {
        const expected = rowCounts[table];

        const [rows] = await connection.query(
          `
          SELECT COUNT(*) AS total
          FROM \`${table}\`
          `
        );

        const actual = (
          rows as {
            total: number;
          }[]
        )[0].total;

        const result = expected === actual;

        console.log('');
        console.log(table);

        console.log(`Expected : ${expected}`);

        console.log(`Actual   : ${actual}`);

        console.log(result ? 'PASS' : 'FAIL');

        if (!result) {
          passed = false;
        }
      }

      return passed;
    } finally {
      await connection.end();
    }
  }
  static async verifyTableCount(
    config: DatabaseConfig,
    metadata: BackupMetadata
  ): Promise<boolean> {
    const connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.username,
      password: config.password,
      database: config.database,
    });

    try {
      const [rows] = await connection.query('SHOW TABLES');

      const actual = (rows as unknown[]).length;

      const expected = metadata.tables.length;

      console.log('\nTABLE COUNT VERIFY\n');

      console.log(`Expected: ${expected}`);

      console.log(`Actual: ${actual}`);

      console.log(expected === actual ? 'PASS' : 'FAIL');

      return expected === actual;
    } finally {
      await connection.end();
    }
  }
  static async verifyForeignKeys(
    config: DatabaseConfig,
    metadata: BackupMetadata
  ): Promise<boolean> {
    const connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.username,
      password: config.password,
      database: config.database,
    });

    try {
      const [rows] = await connection.query(
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
        [config.database]
      );

      const actual = rows as {
        TABLE_NAME: string;
        COLUMN_NAME: string;
        REFERENCED_TABLE_NAME: string;
        REFERENCED_COLUMN_NAME: string;
      }[];

      const expected = metadata.foreignKeys ?? [];

      console.log('\nFOREIGN KEY VERIFY\n');

      console.log(`Expected FK: ${expected.length}`);

      console.log(`Actual FK: ${actual.length}`);

      const passed = expected.length === actual.length;

      console.log(passed ? 'PASS' : 'FAIL');

      return passed;
    } catch (error: unknown) {
      console.log(error);

      return false;
    } finally {
      await connection.end();
    }
  }
  static async verifyIndexes(
    config: DatabaseConfig,
    metadata: BackupMetadata
  ): Promise<boolean> {
    const connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.username,
      password: config.password,
      database: config.database,
    });

    try {
      const [rows] = await connection.query(
        `
        SELECT
          TABLE_NAME,
          INDEX_NAME,
          COLUMN_NAME
        FROM information_schema.STATISTICS
        WHERE TABLE_SCHEMA = ?
        `,
        [config.database]
      );

      const expected = metadata.indexes?.length ?? 0;

      const actual = (rows as unknown[]).length;

      console.log('\nINDEX VERIFY\n');

      console.log(`Expected: ${expected}`);

      console.log(`Actual: ${actual}`);

      const passed = expected === actual;

      console.log(passed ? 'PASS' : 'FAIL');

      return passed;
    } catch (error: unknown) {
      console.log(error);

      return false;
    } finally {
      await connection.end();
    }
  }
  static async verifyTriggers(
    config: DatabaseConfig,
    metadata: BackupMetadata
  ): Promise<boolean> {
    const connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.username,
      password: config.password,
      database: config.database,
    });

    try {
      const [rows] = await connection.query(
        `
        SELECT
          TRIGGER_NAME
        FROM information_schema.TRIGGERS
        WHERE TRIGGER_SCHEMA = ?
        `,
        [config.database]
      );

      const expected = metadata.triggers?.length ?? 0;

      const actual = (rows as unknown[]).length;

      console.log('\nTRIGGER VERIFY\n');

      console.log(`Expected: ${expected}`);

      console.log(`Actual: ${actual}`);

      const passed = expected === actual;

      console.log(passed ? 'PASS' : 'FAIL');

      return passed;
    } catch (error: unknown) {
      console.log(error);

      return false;
    } finally {
      await connection.end();
    }
  }
  static async verifyProcedures(
    config: DatabaseConfig,
    metadata: BackupMetadata
  ): Promise<boolean> {
    const connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.username,
      password: config.password,
      database: config.database,
    });

    try {
      const [rows] = await connection.query(
        `
        SELECT
          ROUTINE_NAME
        FROM information_schema.ROUTINES
        WHERE
          ROUTINE_SCHEMA = ?
          AND ROUTINE_TYPE = 'PROCEDURE'
        `,
        [config.database]
      );

      const expected = metadata.procedures?.length ?? 0;

      const actual = (rows as unknown[]).length;

      console.log('\nPROCEDURE VERIFY\n');

      console.log(`Expected: ${expected}`);

      console.log(`Actual: ${actual}`);

      const passed = expected === actual;

      console.log(passed ? 'PASS' : 'FAIL');

      return passed;
    } catch (error: unknown) {
      console.log(error);

      return false;
    } finally {
      await connection.end();
    }
  }
  static async verifyChecksum(
    backupPath: string,
    metadata: BackupMetadata
  ): Promise<boolean> {
    const sqlFile = path.join(backupPath, 'full', 'full.sql');

    const currentChecksum = await generateChecksum(sqlFile);

    const expected = metadata.checksum;

    const passed = expected === currentChecksum;

    console.log('\nCHECKSUM VERIFY\n');

    console.log(`Expected: ${expected}`);

    console.log(`Actual: ${currentChecksum}`);

    console.log(passed ? 'PASS' : 'FAIL');

    return passed;
  }
  static async verifyPrimaryKeys(
    config: DatabaseConfig,
    metadata: BackupMetadata
  ): Promise<boolean> {
    const connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.username,
      password: config.password,
      database: config.database,
    });

    try {
      const [rows] = await connection.query(
        `
        SELECT
          TABLE_NAME,
          COLUMN_NAME
        FROM information_schema.KEY_COLUMN_USAGE
        WHERE
          TABLE_SCHEMA = ?
          AND CONSTRAINT_NAME = 'PRIMARY'
        `,
        [config.database]
      );

      const expected = metadata.primaryKeys?.length ?? 0;

      const actual = (rows as unknown[]).length;

      console.log('\nPRIMARY KEY VERIFY\n');

      console.log(`Expected: ${expected}`);

      console.log(`Actual: ${actual}`);

      const passed = expected === actual;

      console.log(passed ? 'PASS' : 'FAIL');

      return passed;
    } finally {
      await connection.end();
    }
  }
  static async verifyConstraints(
    config: DatabaseConfig,
    metadata: BackupMetadata
  ): Promise<boolean> {
    const connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.username,
      password: config.password,
      database: config.database,
    });

    try {
      const [rows] = await connection.query(
        `
        SELECT
          CONSTRAINT_NAME
        FROM information_schema.TABLE_CONSTRAINTS
        WHERE TABLE_SCHEMA = ?
        `,
        [config.database]
      );

      const expected = metadata.constraints?.length ?? 0;

      const actual = (rows as unknown[]).length;

      console.log('\nCONSTRAINT VERIFY\n');

      console.log(`Expected: ${expected}`);

      console.log(`Actual: ${actual}`);

      const passed = expected === actual;

      console.log(passed ? 'PASS' : 'FAIL');

      return passed;
    } finally {
      await connection.end();
    }
  }
}
