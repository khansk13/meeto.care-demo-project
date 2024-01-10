import {Router} from 'express';
import { loginEmail } from '../controller/login.controller';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
const router:Router=Router();

router.post('/loginuser',
    basicAuthUser,
    checkRequestBodyParams('email'),
    loginEmail
);

export default router;