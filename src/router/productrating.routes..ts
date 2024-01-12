import {Router} from 'express';
import { deleteProductRating, getAllRating, getFilterProduct, getSingleProductRating, saveProductRating, updateProductRating } from '../controller/productrating.contoller';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
const router:Router=Router();

router.post('/productrating',
    basicAuthUser,
    checkRequestBodyParams('productId'),
    saveProductRating
);


router.post('/singlerating',
    basicAuthUser,
    checkRequestBodyParams('ratingId'),
    getSingleProductRating
    );

router.post('/alluser',
    basicAuthUser,
    getAllRating
);

router.post('/filter',
    basicAuthUser,
    checkRequestBodyParams('ratingId'),
    getFilterProduct
);

router.post('/delete',
    basicAuthUser,
    deleteProductRating
);

router.post('/updaterating',
    basicAuthUser,
    checkRequestBodyParams('ratingId'),
    updateProductRating
);


export default router;