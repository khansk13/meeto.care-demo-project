import { Router } from 'express';
const router: Router = Router();
import  Doctor from './doctor.router';
import  Login from './login.router';

router.use('/doctor', Doctor)
router.use('/login',Login)

export default router