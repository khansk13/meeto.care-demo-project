import { Router } from 'express';
const router: Router = Router();
import  User from './user.routes';
import Login from './login.routes';
import Company from './company.routes';
import Doctor from './doctor.routes';

router.use('/user',User)
router.use('/login',Login)
router.use('/company',Company)
router.use('/doctor',Doctor)

export default router