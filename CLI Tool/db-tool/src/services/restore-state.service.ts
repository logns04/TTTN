import fs from 'fs-extra';
import path from 'path';

export class RestoreStateService {
  private static readonly file = path.join(
    process.cwd(),
    'Logs',
    'restore-state.json'
  );

  static async save(table: string): Promise<void> {
    await fs.writeJson(this.file, {
      lastTable: table,
    });
  }

  static async load(): Promise<string | null> {
    const exists = await fs.pathExists(this.file);

    if (!exists) {
      return null;
    }

    const data = await fs.readJson(this.file);

    return data.lastTable ?? null;
  }

  static async clear(): Promise<void> {
    const exists = await fs.pathExists(this.file);

    if (exists) {
      await fs.remove(this.file);
    }
  }
}
