import { Router } from 'express';
import { checkRequestBodyParams ,checkQuery } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
import {  contactdetails, deleteDetails, getFilteredContact, updateContact } from '../controller/contact.controller';
const router:Router=Router();

router.post('/create',
    basicAuthUser,
    checkRequestBodyParams('email'),
    contactdetails
);


router.post('/update',
    basicAuthUser,
    checkRequestBodyParams('_id'),
    updateContact
);


router.post('/filtercontact',
    basicAuthUser,
    getFilteredContact
);

router.post('/deletecontact',
    basicAuthUser,
    checkRequestBodyParams('_id'),
    deleteDetails
);



export default router;