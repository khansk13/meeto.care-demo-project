import {Router} from 'express';
import { buyProduct, deleteOrder, getAllOrder, getFilteredOrder, getSingleOrder, updateOrder } from '../controller/order.controller';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
const router:Router=Router();

router.post('/orderDetails',
    basicAuthUser,
    checkRequestBodyParams('userId'),
    buyProduct
);

router.post('/singleOrder',
    basicAuthUser,
    checkRequestBodyParams('_id'),
    getAllOrder
    );

router.post('/alluser',
    basicAuthUser,
    getSingleOrder
);

router.post('/filter',
    basicAuthUser,
    checkRequestBodyParams('_id'),
    getFilteredOrder
);

router.post('/delete',
    basicAuthUser,
    deleteOrder
);

router.post('/update',
    basicAuthUser,
    updateOrder
);

export default router;