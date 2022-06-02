import multer, { FileFilterCallback } from 'multer';
import { v4 as uuidV4 } from 'uuid';
import { Express, Request } from 'express';
import { application } from './application';
import { ValidatorException } from '../error/validator.exception';
import { ErrorCode } from '../constant/error-code.constant';

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void,
  ) => {
    callback(null, application.file.tmpDir);
  },
  filename(req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) {
    callback(null, uuidV4() + '.' + file.originalname.split('.').at(-1));
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback): void => {
  const fileSize = parseInt(req.headers['content-length']);
  const fileExtensions = application.file.extensions;
  const maxFileSize = application.file.maxSize;

  if (!fileExtensions.includes(file.mimetype)) {
    callback(
      new ValidatorException(
        `Invalid file upload, must be ${fileExtensions.map((extension) => extension.replace('image/', ' '))}`,
        ErrorCode.INVALID_FILE_UPLOAD_EXTENSION,
      ),
    );
  } else if (fileSize > maxFileSize) {
    callback(
      new ValidatorException(
        `Invalid file upload, must be less than ${maxFileSize / 1048576}MB`,
        ErrorCode.INVALID_FILE_UPLOAD_SIZE,
      ),
    );
  } else {
    callback(null, true);
  }
};

export const multerUpload = multer({ storage, fileFilter });
