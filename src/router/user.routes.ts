import {Router} from 'express';
import { Blockeduser, deleteUser, feedpage, follow, getDetails, getFilteredUser, getSingleDetails, unfollow, updateUser, userProfile } from '../controller/user.controller';
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

router.put('/filteruser',
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
    checkRequestBodyParams('userId'),
    Blockeduser
);


router.post('/userfeed',
    basicAuthUser,
    checkRequestBodyParams('userId'),
    feedpage
);




router.post('/follow',
    basicAuthUser,
    checkRequestBodyParams('userId'),
    follow
);

router.post('/unfollow',
    basicAuthUser,
    checkRequestBodyParams('userId'),
    unfollow
);




export default router;