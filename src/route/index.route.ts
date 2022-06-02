import * as express from 'express';
import adminRoleRoute from './admin/admin-role.route';
import userRoleRoute from './user/user-role.route';
import { authorize } from '../middleware/authentication-handler.middleware';
import { Role } from '../enum/role.enum';
import commonRoute from './common/common.route';

const router = express.Router();

router.use('/admin', authorize([Role.ADMIN]), adminRoleRoute);
router.use('/user', authorize([Role.USER]), userRoleRoute);
router.use('', commonRoute);

export default router;
