import {Router} from 'express';
import { buyProduct } from '../controller/order.controller';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
const router:Router=Router();

router.post('/orderDetails',
    basicAuthUser,
    checkRequestBodyParams('userId'),
    buyProduct
);

export default router;