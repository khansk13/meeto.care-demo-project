import { Router } from 'express';
import { checkRequestBodyParams ,checkQuery } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
import {  followers, followersdetail, saveAdvertiser, updateAdd } from '../controller/advertiser.controller ';
const router: Router = Router();

router.post('/advertisersave',
    basicAuthUser,
    checkRequestBodyParams('advertiserName'),
    saveAdvertiser
);

router.post('/updateProfile',
    basicAuthUser,
    checkRequestBodyParams('_id'),
    updateAdd
);


router.post('/follower',
    basicAuthUser,
    checkRequestBodyParams('advertiserId'),
    followers
);

router.post('/followersdetails',
    basicAuthUser,
    checkRequestBodyParams('advertiserId'),
    followersdetail
);

export default router;