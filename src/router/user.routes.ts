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
    checkRequestBodyParams('userId'),
    getSingleDetails
);

router.post('/alluser',
    basicAuthUser,
    getDetails
);

router.post('/filter',
    basicAuthUser,
    checkRequestBodyParams('email'),
    getFilterDetails
);

router.post('/delete',
    basicAuthUser,
    deleteUser
);

router.post('/updateuser',
    basicAuthUser,
    checkRequestBodyParams('userId'),
    updateUser
);


export default router;