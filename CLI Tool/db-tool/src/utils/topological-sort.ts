export function topologicalSort(graph: Map<string, string[]>): string[] {
  const visited = new Set<string>();

  const result: string[] = [];

  const dfs = (node: string) => {
    if (visited.has(node)) {
      return;
    }

    visited.add(node);

    const deps = graph.get(node) ?? [];

    for (const dep of deps) {
      dfs(dep);
    }

    result.push(node);
  };

  for (const node of graph.keys()) {
    dfs(node);
  }

  return result;
}
