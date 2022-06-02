import express from 'express';
import { bodyValidator } from '../../middleware/request-handler.middleware';
import userController from '../../controller/user.controller';
import { ChangePasswordReqDto } from '../../dto/request/user/change-password-req.dto';

const router = express.Router();

router.put('/change-password', bodyValidator(ChangePasswordReqDto), userController.changePassword);

export default router;
