import * as express from 'express';
import userRoute from './user.route';
import fileRoute from './file.route';

const router = express.Router();

router.use('/users', userRoute);
router.use('/files', fileRoute);

export default router;
