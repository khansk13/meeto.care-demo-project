import {Router} from 'express';
import { createTicket, updateTicket } from '../controller/ticket.controller';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
const router:Router=Router();

router.post('/save',
    checkRequestBodyParams('companyId'),
    createTicket
);

router.post('/updateTicket',
    checkRequestBodyParams('ticketid'),
    updateTicket
);


export default router;