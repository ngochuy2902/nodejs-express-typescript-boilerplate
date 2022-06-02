import express from 'express';
import { bodyValidator } from '../../middleware/request-handler.middleware';
import { LoginReqDto } from '../../dto/request/auth/login-req.dto';
import authController from '../../controller/auth.controller';
import { RefreshTokenReqDto } from '../../dto/request/auth/refresh-token-req.dto';

const router = express.Router();

router.post('/login', bodyValidator(LoginReqDto), authController.login);
router.post('/refresh-token', bodyValidator(RefreshTokenReqDto), authController.refreshToken);

export default router;
