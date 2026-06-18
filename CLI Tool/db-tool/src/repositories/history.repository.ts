import fs from 'fs-extra';
import path from 'path';

import { HistoryRecord } from '../types/history-record';

export class HistoryRepository {
  private static readonly file = path.join(
    process.cwd(),
    'Logs',
    'history.json'
  );

  static async load(): Promise<HistoryRecord[]> {
    if (!(await fs.pathExists(this.file))) {
      return [];
    }

    return fs.readJson(this.file);
  }

  static async save(history: HistoryRecord[]): Promise<void> {
    await fs.ensureDir(path.dirname(this.file));

    await fs.writeJson(this.file, history, {
      spaces: 2,
    });
  }
}
