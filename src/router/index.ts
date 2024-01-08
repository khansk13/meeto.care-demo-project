import { Router } from 'express';
const router: Router = Router();
import  Doctor from './doctor.router';

router.use('/doctor', Doctor)

export default router