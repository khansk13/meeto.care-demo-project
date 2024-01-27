import { checkRequestBodyParams ,checkQuery } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
import {  allVideoPost, deleteVideoPost, report, savePost,  showreport,  singleVideoPost,  unLikesPost,  updatePost, videoComment, videoLikes } from '../controller/videoAd.controller';
import { Router } from 'express';
const router: Router = Router();

router.post('/postsave',
basicAuthUser,
checkRequestBodyParams('userId'),
savePost
);


router.post('/updatepost',
basicAuthUser,
checkRequestBodyParams('postId'),
updatePost
);


router.post('/singlepost',
basicAuthUser,
checkRequestBodyParams('postId'),
singleVideoPost
);


router.post('/allpost',
basicAuthUser,
allVideoPost
);


router.post('/deletepost',
basicAuthUser,
checkRequestBodyParams('postId'),
deleteVideoPost
);


router.post('/videolike',
basicAuthUser,
checkRequestBodyParams('postId'),
videoLikes
);


router.post('/unlikepost',
basicAuthUser,
checkRequestBodyParams('postId'),
unLikesPost
);

router.post('/reportpost',
basicAuthUser,
checkRequestBodyParams('postId'),
report
);

router.post('/showreportvideopost',
basicAuthUser,
checkRequestBodyParams('postId'),
showreport
);

router.post('/videocomments',
basicAuthUser,
checkRequestBodyParams('postId'),
videoComment
);



export default router
