export const cleanParams = <T extends object>(query: T): Record<string, string> => {
  const params: Record<string, string> = {};

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null || value === '' || value === false) continue;
    params[key] = String(value);
  }

  return params;
};
