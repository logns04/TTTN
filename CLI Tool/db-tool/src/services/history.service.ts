import { HistoryRecord } from '../types/history-record';

import { HistoryRepository } from '../repositories/history.repository';

export class HistoryService {
  static async add(
    action: string,
    database: string,
    status: string
  ): Promise<void> {
    const history = await HistoryRepository.load();

    const record: HistoryRecord = {
      id: String(history.length + 1).padStart(3, '0'),

      action,

      database,

      status,

      time: new Date().toISOString(),
    };

    history.push(record);

    await HistoryRepository.save(history);
  }

  static async getAll(): Promise<HistoryRecord[]> {
    return HistoryRepository.load();
  }
}
