import {Router} from 'express';
import { postCreate } from '../controller/post.controller';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
const router:Router=Router();

router.post('/postcreate',
    basicAuthUser,
    checkRequestBodyParams('userId'),
    postCreate
);

export default router;