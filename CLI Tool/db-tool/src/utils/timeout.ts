export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number
): Promise<T> {
  return Promise.race([
    promise,

    new Promise<never>((_, reject) =>
      setTimeout(
        () => reject(new Error('Timeout')),

        timeoutMs
      )
    ),
  ]);
}
