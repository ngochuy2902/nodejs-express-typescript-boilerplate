import IController from '../type/controller.type';
import apiResponseUtil from '../util/api-response.util';
import { ValidatorException } from '../error/validator.exception';
import { ErrorCode } from '../constant/error-code.constant';

const uploadFile: IController = async (req, res, next) => {
  if (!req.file) {
    return next(new ValidatorException('File is required', ErrorCode.INVALID_FILE_EMPTY));
  }

  try {
    const filePath = req.file.path;
    //Todo: Call media service to save filePath
    return apiResponseUtil.ok(res, { filePath });
  } catch (error) {
    next(error);
  }
};

export default { uploadFile };
