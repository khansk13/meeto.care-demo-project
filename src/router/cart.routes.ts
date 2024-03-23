import {Router} from 'express';
import { cartProduct, deleteCart, updateCart } from '../controller/addToController';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
const router:Router=Router();

router.post('/cartUser',
    checkRequestBodyParams('userId'),
    cartProduct
);


router.post('/updateCart',
    checkRequestBodyParams('_id'),
    updateCart
);

router.get('/deleteCart',
    checkRequestBodyParams('userId'),
    deleteCart
);




export default router;