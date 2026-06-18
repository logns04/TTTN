export interface BackupMetadata {
  tables: string[];

  rowCounts: Record<string, number>;

  foreignKeys: unknown[];

  indexes: unknown[];

  triggers: unknown[];

  procedures: string[];

  primaryKeys: unknown[];

  constraints: unknown[];

  checksum: string;
}
