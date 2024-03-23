import {Router} from 'express';
import { saveCompany } from '../controller/userdatacontroller';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
const router:Router=Router();

router.post('/createuser',
    basicAuthUser,
    checkRequestBodyParams('email'),
    checkRequestBodyParams('password'),
    saveCompany
);

export default router;