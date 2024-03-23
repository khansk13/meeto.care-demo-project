import {Router} from 'express';
import { addList, createWishList, deleteWishList } from '../controller/wishlistcontroller';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
const router:Router=Router();

router.post('/createlist',
    checkRequestBodyParams('userId'),
    createWishList
);

router.post('/addlist',
    checkRequestBodyParams('userId'),
    addList
);

router.post('/deletelist',
    checkRequestBodyParams('userId'),
    deleteWishList
);





export default router;