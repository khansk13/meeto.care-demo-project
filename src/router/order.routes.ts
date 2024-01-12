import {Router} from 'express';
import { buyProduct, deleteOrder, getAllOrder, getFilterOrder, getSingleOrder, updateOrder } from '../controller/order.controller';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
const router:Router=Router();

router.post('/orderDetails',
    basicAuthUser,
    checkRequestBodyParams('userId'),
    buyProduct
);

router.post('/singleuser',
    basicAuthUser,
    checkRequestBodyParams('doctorId'),
    getAllOrder
    );

router.post('/alluser',
    basicAuthUser,
    getSingleOrder
);

router.post('/filter',
    basicAuthUser,
    checkRequestBodyParams('doctorId'),
    getFilterOrder
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