import {Router} from 'express';
import { createCustomerServiceAgent } from '../controller/support.controller';
import { checkRequestBodyParams } from '../middleware/Validators';
const router:Router=Router();

router.post('/save',
    checkRequestBodyParams('companyId'),
    createCustomerServiceAgent
);


export default router;