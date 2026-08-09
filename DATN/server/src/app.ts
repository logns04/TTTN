import path from 'node:path';
import cors from 'cors';
import express from 'express';
import { env } from './config/env';
import { errorHandler, notFound } from './middleware/error';
import { apiRouter } from './routes';

export const UPLOAD_DIR = path.join(__dirname, '..', 'public', 'uploads');

const allowedOrigins = [
  ...env.CLIENT_URL.split(',').map((value) => value.trim()).filter(Boolean),
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];

export const createApp = () => {
  const app = express();

  console.log('CORS cho phép:', allowedOrigins.join(' | '));

  app.use(cors({ origin: allowedOrigins }));

  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use('/uploads', express.static(UPLOAD_DIR, { maxAge: '7d' }));

  app.use('/api', apiRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
