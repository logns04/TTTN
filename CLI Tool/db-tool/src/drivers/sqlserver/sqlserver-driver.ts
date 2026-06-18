import * as sql from 'mssql';

import { DatabaseDriver } from '../../interfaces/database-driver';

import { DatabaseConfig } from '../../types/database-config';

export class SqlServerDriver implements DatabaseDriver {
  constructor(private readonly config: DatabaseConfig) {}

  async connect(): Promise<void> {
    return;
  }

  async disconnect(): Promise<void> {
    return;
  }

  async test(): Promise<boolean> {
    try {
      const pool = await sql.connect({
        server: this.config.host,

        database: this.config.database,

        user: this.config.username,

        password: this.config.password,

        options: {
          trustServerCertificate: true,
        },
      });

      await pool.close();

      return true;
    } catch {
      return false;
    }
  }

  async backup(): Promise<void> {
    throw new Error('SQL Server backup not implemented');
  }

  async restore(backupPath: string): Promise<void> {
    console.log(backupPath);

    throw new Error('SQL Server restore not implemented');
  }

  async verify(): Promise<boolean> {
    return true;
  }

  async rollback(): Promise<void> {
    throw new Error('SQL Server rollback not implemented');
  }

  async createSnapshot(): Promise<void> {
    throw new Error('SQL Server snapshot not implemented');
  }

  async getSchema(): Promise<unknown> {
    return {};
  }

  async getForeignKeys(): Promise<unknown> {
    return [];
  }

  async getTables(): Promise<string[]> {
    return [];
  }
}
