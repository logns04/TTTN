import fs from 'fs-extra';
import path from 'path';

export class TableRestoreService {
  static async getTableFiles(backupPath: string): Promise<string[]> {
    const dbDir = path.join(backupPath, 'DB');

    if (!(await fs.pathExists(dbDir))) {
      return [];
    }

    return (await fs.readdir(dbDir)).filter((file) => file.endsWith('.sql'));
  }
}
