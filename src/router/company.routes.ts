import {Router} from 'express';
import { CompanyProfile } from '../controller/Company.controller';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
const router:Router=Router();

router.post('/companyuser',
    basicAuthUser,
    checkRequestBodyParams('email'),
    CompanyProfile
);

export default router;