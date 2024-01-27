import {Router} from 'express';
import { Blockeduser, deleteUser, feedpage, follow, following, getDetails, getFilteredUser, getSingleDetails, savepost, unfollow, unsavepost, updateUser, userDashBoard, userFollowersDetail, userProfile } from '../controller/user.controller';
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

router.post('/dashboard',
    basicAuthUser,
    checkRequestBodyParams('userId'),
    userDashBoard
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

router.get('/followerdetails',
    basicAuthUser,
    checkRequestBodyParams('userId'),
    userFollowersDetail
);

router.get('/following',
    basicAuthUser,
    checkRequestBodyParams('userId'),
    following
);


router.get('/savepost',
    basicAuthUser,
    checkRequestBodyParams('userId'),
    savepost
);


router.get('/unsavepost',
    basicAuthUser,
    checkRequestBodyParams('userId'),
    unsavepost
);



export default router;