import {Router} from 'express';
import { saveProductRating } from '../controller/rating.controller';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
const router:Router=Router();

router.post('/productrating',
    basicAuthUser,
    checkRequestBodyParams('productId'),
    saveProductRating
);

export default router;