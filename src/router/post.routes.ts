import {Router} from 'express';
import { deletePost, getFilteredPost, likes, postCreate, reportPost, showreportPost, singlePost, unLikes, updatePost, } from '../controller/post.controller';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
const router:Router=Router();

router.post('/postcreate',
    basicAuthUser,
    checkRequestBodyParams('userId'),
    postCreate
);

router.post('/singlePost',
    basicAuthUser,
    checkRequestBodyParams('postId'),
    singlePost
);

router.post('/delete',
    basicAuthUser,
    checkRequestBodyParams('_id'),
    deletePost
);


router.post('/likes',
    basicAuthUser,
    checkRequestBodyParams('postId'),
    likes
);

router.post('/reportPost',
    basicAuthUser,
    checkRequestBodyParams('postId'),
    reportPost
);


router.post('/showreport',
    basicAuthUser,
    showreportPost
);

router.post('/unlikes',
    basicAuthUser,
    checkRequestBodyParams('postId'),
    unLikes
);

router.post('/filter',
    basicAuthUser,
    checkRequestBodyParams('_id'),
    getFilteredPost
);

router.post('/update',
    basicAuthUser,
    checkRequestBodyParams('postId'),
    updatePost
);

export default router;