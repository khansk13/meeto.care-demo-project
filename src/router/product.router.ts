import {Router} from 'express';
import {productcreate, updateProduct, getAllProduct, getSingleProduct, deleteproduct, getFilterProduct} from '../controller/product.controller';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
const router:Router=Router();

router.post('/productcreate',
    basicAuthUser,
    //checkRequestBodyParams('_id'),
    productcreate
    );

     
    router.get('/getSingleuser',
    basicAuthUser,
    checkRequestBodyParams('productId'),
   
    getSingleProduct
    );


    router.get('/getAllUser',
    basicAuthUser,
   // checkRequestBodyParams('id'),
   
    getAllProduct
    );

    
    router.post('/deleteUser',
    basicAuthUser,
    checkRequestBodyParams('productId'),
   
    deleteproduct
    );

    
    router.put('/filter',
    basicAuthUser,
    checkRequestBodyParams('id'),
    getFilterProduct
    );

      
    router.post('/update',
    basicAuthUser,
    checkRequestBodyParams('productId'),
    updateProduct
    
    );
export default router;

