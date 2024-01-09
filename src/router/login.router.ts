import {Router} from 'express';
import { loginEmail,verificationEmail} from '../controller/login.controller';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';

const router:Router=Router();

// router.post('/emailsendOtp',
//     basicAuthUser,
//     checkRequestBodyParams('email'),
   
   
//     emailsendOtp
//     );


    router.post('/loginEmail',
    basicAuthUser,
    checkRequestBodyParams('email'),
   
   
    loginEmail
    );

    
    router.post('/verificationEmail',
    basicAuthUser,
  
    verificationEmail
    );
   

export default router;