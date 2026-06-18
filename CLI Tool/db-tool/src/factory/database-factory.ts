import { DatabaseConfig } from '../types/database-config';

import { DatabaseDriver } from '../interfaces/database-driver';

import { MysqlDriver } from '../drivers/mysql/mysql-driver';

import { MariaDbDriver } from '../drivers/mariadb/mariadb-driver';

import { SqlServerDriver } from '../drivers/sqlserver/sqlserver-driver';

import { MongoDbDriver } from '../drivers/mongodb/mongodb-driver';

export class DatabaseFactory {
  static create(config: DatabaseConfig): DatabaseDriver {
    switch (config.dialect) {
      case 'mysql':
        return new MysqlDriver(config);

      case 'mariadb':
        return new MariaDbDriver(config);

      case 'sqlserver':

      case 'mssql':
        return new SqlServerDriver(config);

      case 'mongodb':
        return new MongoDbDriver(config);

      default:
        throw new Error(`Unsupported Database: ${config.dialect}`);
    }
  }
}
