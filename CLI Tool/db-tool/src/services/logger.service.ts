import fs from 'fs-extra';
import path from 'path';

export class LoggerService {
  private static instance: LoggerService;

  private constructor() {}

  static getInstance(): LoggerService {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService();
    }

    return LoggerService.instance;
  }

  private async write(
    fileName: string,
    level: string,
    message: string
  ): Promise<void> {
    const logDir = path.join(process.cwd(), 'Logs');

    await fs.ensureDir(logDir);

    const logFile = path.join(logDir, fileName);

    const now = new Date();

    const timestamp = now.toISOString().replace('T', ' ').substring(0, 19);

    const content = `[${timestamp}]

${level}

${message}

--------------------------------

`;

    await fs.appendFile(logFile, content);
  }

  async info(fileName: string, message: string): Promise<void> {
    await this.write(fileName, 'INFO', message);
  }

  async warn(fileName: string, message: string): Promise<void> {
    await this.write(fileName, 'WARN', message);
  }

  async error(fileName: string, message: string): Promise<void> {
    await this.write(fileName, 'ERROR', message);
  }
}
