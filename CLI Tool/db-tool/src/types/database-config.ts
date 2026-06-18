export type Dialect = 'mysql' | 'mariadb' | 'mssql' | 'sqlserver' | 'mongodb';

export interface DatabaseConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: 'mysql' | 'mariadb' | 'sqlserver' | 'mssql' | 'mongodb';
  port: number;
}
