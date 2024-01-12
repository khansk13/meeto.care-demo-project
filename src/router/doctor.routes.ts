import {Router} from 'express';
import { deletePanel, doctorPanel, getAllPanel, getFilterPanel, getSinglePanel, updatePanel } from '../controller/doctor.controller';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
const router:Router=Router();

router.post('/doctoruser',
    basicAuthUser,
     checkRequestBodyParams('email'),
    doctorPanel
);


router.post('/singlePanel',
    basicAuthUser,
    checkRequestBodyParams('doctorId'),
    getSinglePanel
);

router.post('/alluser',
    basicAuthUser,
    getAllPanel
);

router.post('/filter',
    basicAuthUser,
    // checkRequestBodyParams('email'),
    getFilterPanel
);

router.post('/delete',
    basicAuthUser,
    deletePanel
);

router.post('/updateuser',
    basicAuthUser,
    checkRequestBodyParams('doctorId'),
    updatePanel
);


export default router;