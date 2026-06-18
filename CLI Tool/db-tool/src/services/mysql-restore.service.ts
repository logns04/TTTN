import mysql from 'mysql2/promise';
import { DatabaseConfig } from '../types/database-config';

export class MysqlRestoreService {
  static async createDatabase(config: DatabaseConfig): Promise<void> {
    const connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.username,
      password: config.password,
    });

    try {
      await connection.query(`DROP DATABASE IF EXISTS \`${config.database}\``);

      await connection.query(
        `
        CREATE DATABASE \`${config.database}\`
        CHARACTER SET utf8mb4
        COLLATE utf8mb4_general_ci
        `
      );
    } finally {
      await connection.end();
    }
  }

  static async disableForeignKeys(config: DatabaseConfig): Promise<void> {
    const connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.username,
      password: config.password,
      database: config.database,
    });

    try {
      await connection.query('SET FOREIGN_KEY_CHECKS = 0');
    } finally {
      await connection.end();
    }
  }

  static async enableForeignKeys(config: DatabaseConfig): Promise<void> {
    const connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.username,
      password: config.password,
      database: config.database,
    });

    try {
      await connection.query('SET FOREIGN_KEY_CHECKS = 1');
    } finally {
      await connection.end();
    }
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
}
