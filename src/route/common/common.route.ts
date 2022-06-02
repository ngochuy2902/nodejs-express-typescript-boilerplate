import * as express from 'express';
import userRoute from './user.route';
import authRoute from './auth.route';
import { authorize } from '../../middleware/authentication-handler.middleware';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', authorize(), userRoute);

export default router;
