import express from 'express';
import { bodyValidator, paramValidator } from '../../middleware/request-handler.middleware';
import { IdParamDto } from '../../dto/request/id-param.dto';
import userController from '../../controller/user.controller';
import { UserCreateReqDto } from '../../dto/request/user/user-create-req.dto';
import { authorize } from '../../middleware/authentication-handler.middleware';
import { Role } from '../../enum/role.enum';
import { UserFetchReqDto } from '../../dto/request/user/user-fetch-req.dto';

const router = express.Router();

router.post('', bodyValidator(UserCreateReqDto), authorize([Role.ADMIN]), userController.createUser);
router.get('', paramValidator(UserFetchReqDto), userController.fetchUsers);
router.get('/:id', paramValidator(IdParamDto), userController.getUserDetail);

export default router;
