export interface DatabaseDriver {
  connect(): Promise<void>;

  disconnect(): Promise<void>;

  test(): Promise<boolean>;

  backup(): Promise<void>;

  restore(backupPath: string): Promise<void>;

  verify(): Promise<boolean>;

  rollback(): Promise<void>;

  createSnapshot(): Promise<void>;

  getSchema(): Promise<unknown>;

  getForeignKeys(): Promise<unknown>;

  getTables(): Promise<string[]>;
}
