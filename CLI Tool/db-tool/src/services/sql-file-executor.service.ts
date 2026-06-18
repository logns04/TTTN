import fs from 'fs-extra';

export class SqlFileExecutorService {
  static async readSql(file: string): Promise<string> {
    return fs.readFile(file, 'utf8');
  }
}
