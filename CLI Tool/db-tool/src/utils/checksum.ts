import crypto from 'crypto';
import fs from 'fs-extra';

export async function generateChecksum(filePath: string): Promise<string> {
  const buffer = await fs.readFile(filePath);

  return crypto.createHash('sha256').update(buffer).digest('hex');
}
