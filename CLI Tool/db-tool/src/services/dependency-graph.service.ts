import { ForeignKey } from '../types/foreign-key';

export class DependencyGraphService {
  static build(foreignKeys: ForeignKey[]): Map<string, string[]> {
    const graph = new Map<string, string[]>();

    for (const fk of foreignKeys) {
      if (!graph.has(fk.table)) {
        graph.set(fk.table, []);
      }

      graph.get(fk.table)?.push(fk.referencedTable);
    }

    return graph;
  }
}
