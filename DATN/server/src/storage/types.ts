export interface UploadedFile {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
  size: number;
}

export interface SavedFile {

  url: string;

  key: string;
}


export interface StorageProvider {
  readonly name: string;
  save(file: UploadedFile): Promise<SavedFile>;
  remove(key: string): Promise<void>;
}

export const buildUploadPath = (relativePath: string): string =>
  `/uploads/${relativePath.replace(/^\/+/, '').replace(/\\/g, '/')}`;
