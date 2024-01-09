import {Router} from 'express';
import { doctorProfile, updateAll ,getSingleuser,getAllUser,deleteUser,filter} from '../controller/doctor.controller';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
const router:Router=Router();

router.post('/',
    basicAuthUser,
    checkRequestBodyParams('email'),
   
    doctorProfile
    );


    // router.post('/',
    // basicAuthUser,
    // checkRequestBodyParams('_id'),
   
    // doctorProfile
    // );

    
    router.post('/updateAll',
    basicAuthUser,
    checkRequestBodyParams('id'),
   
    updateAll
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