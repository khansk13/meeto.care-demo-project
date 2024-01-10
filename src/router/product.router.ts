import {Router} from 'express';
import {productcreate,getSingleuser,getAllUser,deleteUser,filter} from '../controller/product.controller';
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
    checkRequestBodyParams('id'),
   
    getSingleuser
    );


    router.get('/getAllUser',
    basicAuthUser,
   // checkRequestBodyParams('id'),
   
    getAllUser
    );

    
    router.post('/deleteUser',
    basicAuthUser,
    checkRequestBodyParams('id'),
   
    deleteUser
    );

    
    router.get('/filter',
    basicAuthUser,
    checkRequestBodyParams('id'),
   
    filter
    );
export default router;

