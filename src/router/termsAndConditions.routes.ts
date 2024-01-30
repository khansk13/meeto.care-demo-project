import {Router} from 'express';
import { createConditions , deleteConditions, getAllConditions, getSingleConditions, updateConditions } from '../controller/termsAndConditions.controller';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
const router:Router=Router();

router.post('/save',
    basicAuthUser,
    checkRequestBodyParams('termsAndConditions'),
    createConditions
);

router.post('/getsingle',
    basicAuthUser,
    checkRequestBodyParams('_id'),
    getSingleConditions
);
router.post('/getall',
    basicAuthUser,
    checkRequestBodyParams('_id'),
    getAllConditions
);

router.post('/update',
    basicAuthUser,
    checkRequestBodyParams('_id'),
    updateConditions
);

router.post('/delete',
    basicAuthUser,
    checkRequestBodyParams('_id'),
    deleteConditions
);

export default router;