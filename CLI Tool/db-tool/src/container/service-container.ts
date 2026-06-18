import { LoggerService } from '../services/logger.service';

export class ServiceContainer {
  static getLogger(): LoggerService {
    return LoggerService.getInstance();
  }
}
