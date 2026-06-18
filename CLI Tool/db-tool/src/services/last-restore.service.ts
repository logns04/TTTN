import fs from 'fs-extra';
import path from 'path';

export class LastRestoreService {
  private static readonly file = path.join(
    process.cwd(),
    'Logs',
    'last-restore.json'
  );

  static async save(backupPath: string): Promise<void> {
    await fs.ensureDir(path.dirname(this.file));

    await fs.writeJson(
      this.file,
      {
        backupPath,
      },
      {
        spaces: 2,
      }
    );
  }

  static async load(): Promise<string> {
    const exists = await fs.pathExists(this.file);

    if (!exists) {
      throw new Error('No Restore History Found');
    }

    const data = await fs.readJson(this.file);

    return data.backupPath as string;
  }
}
