import { MongoClient } from 'mongodb';

import { DatabaseDriver } from '../../interfaces/database-driver';

import { DatabaseConfig } from '../../types/database-config';

export class MongoDbDriver implements DatabaseDriver {
  constructor(private readonly config: DatabaseConfig) {}

  async connect(): Promise<void> {
    return;
  }

  async disconnect(): Promise<void> {
    return;
  }

  async test(): Promise<boolean> {
    try {
      const client = new MongoClient(this.config.host);

      await client.connect();

      await client.close();

      return true;
    } catch {
      return false;
    }
  }

  async backup(): Promise<void> {
    throw new Error('MongoDB backup not implemented');
  }

  async restore(backupPath: string): Promise<void> {
    console.log(backupPath);

    throw new Error('MongoDB restore not implemented');
  }

  async verify(): Promise<boolean> {
    return true;
  }

  async rollback(): Promise<void> {
    throw new Error('MongoDB rollback not implemented');
  }

  async createSnapshot(): Promise<void> {
    throw new Error('MongoDB snapshot not implemented');
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
