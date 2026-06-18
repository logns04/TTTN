import fs from 'fs-extra';
import path from 'path';
import { BackupMetadata } from '../types/backup-metadata';

export class RestoreService {
  static async loadMetadata(backupPath: string): Promise<BackupMetadata> {
    const metadataPath = path.join(backupPath, 'metadata.json');

    return fs.readJson(metadataPath);
  }

  static getFullSqlPath(backupPath: string): string {
    return path.join(backupPath, 'full', 'full.sql');
  }
}
