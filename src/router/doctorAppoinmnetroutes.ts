import {Router} from 'express';
import { deleteAppoinment, doctorAppoinment, getAllAppoinment, getFilterAppoinment, getSingleAppoinment, updateAppoinment } from '../controller/doctorAppoinment.controller';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
const router:Router=Router();

router.post('/createappoinment',
    basicAuthUser,
     checkRequestBodyParams('doctorId'),
    doctorAppoinment
);


router.post('/singleappoinment',
    basicAuthUser,
    checkRequestBodyParams('appoinmentId'),
    getSingleAppoinment
);

router.post('/allappoinment',
    basicAuthUser,
    getAllAppoinment
);

router.post('/filter',
    basicAuthUser,
    // checkRequestBodyParams('email'),
    getFilterAppoinment
);

router.post('/delete',
    basicAuthUser,
    deleteAppoinment
);

router.post('/appoinment',
    basicAuthUser,
    checkRequestBodyParams('appoinmentId'),
    updateAppoinment
);


export default router;