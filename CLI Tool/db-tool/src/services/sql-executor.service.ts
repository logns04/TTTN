import fs from 'fs-extra';
import mysql from 'mysql2/promise';
import { DatabaseConfig } from '../types/database-config';

export class SqlExecutorService {
  static async execute(config: DatabaseConfig, sqlFile: string): Promise<void> {
    const sql = await fs.readFile(sqlFile, 'utf8');

    const connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.username,
      password: config.password,
      database: config.database,
      multipleStatements: true,
    });

    try {
      await connection.query(sql);
    } finally {
      await connection.end();
    }
  }
}
