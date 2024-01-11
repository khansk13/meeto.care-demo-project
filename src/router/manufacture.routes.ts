import {Router} from 'express';
import { createProductManufacturing, deleteProduct, getAlllist, getFilterProduct, getManufacturinglist, updateManufacturingProduct } from '../controller/manufacture.controller';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
const router:Router=Router();

router.post('/createproduct',
    basicAuthUser,
     checkRequestBodyParams('companyId'),
    createProductManufacturing
);


router.post('/singleproduct',
    basicAuthUser,
    checkRequestBodyParams('productId'),
    getManufacturinglist
);

router.post('/allproduct',
    basicAuthUser,
    getAlllist
);

router.post('/filter',
    basicAuthUser,
    checkRequestBodyParams('productId'),
    getFilterProduct
);

router.post('/delete',
    basicAuthUser,
    checkRequestBodyParams('productId'),
    deleteProduct
);

router.post('/update',
    basicAuthUser,
    checkRequestBodyParams('productId'),
    updateManufacturingProduct
);


export default router;