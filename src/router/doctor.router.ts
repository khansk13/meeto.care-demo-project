import {Router} from 'express';
import { doctorProfile, getDetails, getSingleDetails } from '../controller/doctor.controller';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
const router:Router=Router();

router.post('/createuser',
    basicAuthUser,
    checkRequestBodyParams('email'),
    doctorProfile
);


router.post('/singleuser',
    basicAuthUser,
    checkRequestBodyParams('email'),
    getSingleDetails
);

router.post('/alluser',
    basicAuthUser,
    checkRequestBodyParams('email'),
    getDetails
);


export default router;