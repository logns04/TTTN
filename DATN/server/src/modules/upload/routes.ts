import { Router } from 'express';
import { STAFF_ROLES, requireAuth, requireRole } from '../../middleware/auth';
import { MAX_FILES, upload } from '../../middleware/upload';
import * as controller from './controller';

export const uploadRouter = Router();

// EDITOR cũng cần upload được ảnh cho tin tức và banner.
uploadRouter.use(requireAuth, requireRole(...STAFF_ROLES));

uploadRouter.post('/', upload.single('file'), controller.uploadSingle);
uploadRouter.post('/multiple', upload.array('files', MAX_FILES), controller.uploadMultiple);
