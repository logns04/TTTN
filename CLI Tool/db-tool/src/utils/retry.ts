export async function retry<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
  let error: unknown;

  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (e) {
      error = e;

      console.log(`Retry ${i + 1}/${retries}`);
    }
  }

  throw error;
}
