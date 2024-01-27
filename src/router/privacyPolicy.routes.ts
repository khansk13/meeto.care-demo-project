import {Router} from 'express';
import { createPolicy ,deleteConditions } from '../controller/privacy.controller';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
const router:Router=Router();

router.post('/save',
    basicAuthUser,
    checkRequestBodyParams('companyId'),
    createPolicy
);


router.post('/ticketraise',
    basicAuthUser,
    checkRequestBodyParams('_id'),
    deleteConditions
);

export default router;