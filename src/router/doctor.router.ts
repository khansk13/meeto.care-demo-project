import {Router} from 'express';
import { deleteUser, doctorProfile, getDetails, getSingleDetails, getuserDetails, updateUser } from '../controller/doctor.controller';
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


router.post('/updateuser',
    basicAuthUser,
    checkRequestBodyParams('userId'),
    updateUser
);


router.post('/deleteuser',
    basicAuthUser,
    checkRequestBodyParams('userId'),
    deleteUser
);

router.post('/userdetails',
    basicAuthUser,
    checkRequestBodyParams('userId'),
    getuserDetails
);

export default router;