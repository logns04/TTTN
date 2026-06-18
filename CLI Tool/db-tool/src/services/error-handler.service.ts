import { LoggerService } from './logger.service';

export class ErrorHandlerService {
  static async handle(source: string, error: unknown): Promise<void> {
    const message = error instanceof Error ? error.message : String(error);

    console.log('');

    console.log('================================');

    console.log(`[ERROR] ${message}`);

    console.log('================================');

    await LoggerService.getInstance().error(`${source}.log`, message);
  }
}
