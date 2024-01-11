import {Router} from 'express';
import { deleteProductRating, getAllRating, getFilterProductRating, getSingleProductRating, saveProductRating, updateProductRating } from '../controller/productrating.contoller';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
const router:Router=Router();

router.post('/productrating',
    basicAuthUser,
    checkRequestBodyParams('productId'),
    saveProductRating
);


router.post('/singleuser',
    basicAuthUser,
    checkRequestBodyParams('doctorId'),
    getSingleProductRating
    );

router.post('/alluser',
    basicAuthUser,
    getAllRating
);

router.post('/filter',
    basicAuthUser,
    checkRequestBodyParams('doctorId'),
    getFilterProductRating
);

router.post('/delete',
    basicAuthUser,
    deleteProductRating
);

router.post('/updateuser',
    basicAuthUser,
    checkRequestBodyParams('doctorId'),
    updateProductRating
);


export default router;