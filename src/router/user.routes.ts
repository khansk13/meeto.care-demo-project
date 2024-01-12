import {Router} from 'express';
import { Blockeduser, deleteUser, feedpage, getDetails, getFilteredUser, getSingleDetails, updateUser, userProfile } from '../controller/user.controller';
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

router.put('/filter',
    basicAuthUser,
    getFilteredUser
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

router.post('/userblock',
    basicAuthUser,
    checkRequestBodyParams('_id'),
    Blockeduser
);


router.post('/userfeed',
    basicAuthUser,
    checkRequestBodyParams('userId'),
    feedpage
);



export default router;