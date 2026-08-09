import { env } from '../config/env';
import { localStorage } from './local';
import type { StorageProvider } from './types';

const resolveStorage = (): StorageProvider => {
  if (env.STORAGE_DRIVER === 'cloudinary') {

    const { cloudinaryStorage } = require('./cloudinary') as {
      cloudinaryStorage: StorageProvider;
    };
    return cloudinaryStorage;
  }
  return localStorage;
};

export const storage = resolveStorage();

export * from './types';
