import {Router} from 'express';
import { loginUser } from '../controller/login.controller';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
const router:Router=Router();

router.post('/loginuser',
    basicAuthUser,
    checkRequestBodyParams('email'),
    loginUser
);


export default router;