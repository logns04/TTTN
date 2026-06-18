export interface DatabaseDriver {
  test(): Promise<boolean>;

  backup(): Promise<void>;

  restore(backupPath: string): Promise<void>;

  verify(): Promise<boolean>;

  createSnapshot(): Promise<void>;
}
