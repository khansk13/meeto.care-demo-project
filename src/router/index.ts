import { Router } from 'express';
const router: Router = Router();
import  User from './user.routes';
import Login from './login.routes';
import Company from './company.routes';
import  product  from './product.router';


router.use('/user',User)
router.use('/login',Login)
router.use('/company',Company)
router.use('/product',product)
export default router