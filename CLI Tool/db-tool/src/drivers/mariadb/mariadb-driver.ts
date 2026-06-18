import { MysqlDriver } from '../mysql/mysql-driver';

import { DatabaseConfig } from '../../types/database-config';

export class MariaDbDriver extends MysqlDriver {
  constructor(config: DatabaseConfig) {
    super(config);
  }
}
