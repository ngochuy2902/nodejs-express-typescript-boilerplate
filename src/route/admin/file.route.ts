import express from 'express';
import { multerUpload } from '../../config/multer';
import fileController from '../../controller/file.controller';

const router = express.Router();

router.post('', multerUpload.single('file'), fileController.uploadFile);

export default router;
