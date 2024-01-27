import { checkRequestBodyParams ,checkQuery } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
import { allImagePost, deleteImagePost, imageComment, imageLikes, imageReport, savePost, showreportImagePost, singleImagePost, unLikesImagePost, updatePost } from '../controller/imageAd.controller';
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
singleImagePost
);


router.post('/allpost',
basicAuthUser,
allImagePost
);


router.post('/deletepost',
basicAuthUser,
checkRequestBodyParams('postId'),
deleteImagePost
);


router.post('/videolike',
basicAuthUser,
checkRequestBodyParams('postId'),
imageLikes
);


router.post('/unlikepost',
basicAuthUser,
checkRequestBodyParams('postId'),
unLikesImagePost
);

router.post('/reportpost',
basicAuthUser,
checkRequestBodyParams('postId'),
imageReport
);

router.post('/showreportvideopost',
basicAuthUser,
checkRequestBodyParams('postId'),
showreportImagePost
);

router.post('/videocomments',
basicAuthUser,
checkRequestBodyParams('postId'),
imageComment
);

export default router
