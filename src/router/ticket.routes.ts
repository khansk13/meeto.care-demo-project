import {Router} from 'express';
import { createTicket,saveCompanyId } from '../controller/ticket.controller';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
const router:Router=Router();

router.post('/save',
    basicAuthUser,
    checkRequestBodyParams('companyId'),
    saveCompanyId
);


router.post('/ticketraise',
    basicAuthUser,
    checkRequestBodyParams('companyId'),
    createTicket
);

export default router;