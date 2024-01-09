import {Router} from 'express';
import { deleteUser, getDetails, getFilterDetails, getSingleDetails, updateUser, userProfile } from '../controller/user.controller';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
const router:Router=Router();

router.post('/createuser',
    basicAuthUser,
    checkRequestBodyParams('email'),
    userProfile
);


router.post('/singleuser',
    basicAuthUser,
    checkRequestBodyParams('email'),
    getSingleDetails
);

router.post('/alluser',
    basicAuthUser,
    checkRequestBodyParams('userName'),
    getDetails
);

router.post('/filterdetails',
    basicAuthUser,
    checkRequestBodyParams('userId'),
    getFilterDetails
);

router.post('/deleteuser',
    basicAuthUser,
    checkRequestBodyParams('userId'),
    deleteUser
);

router.post('/updateuser',
    basicAuthUser,
    checkRequestBodyParams('userId'),
    updateUser
);


export default router;