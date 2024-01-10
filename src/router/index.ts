import { Router } from 'express';
const router: Router = Router();


import  User from './user.routes';
import Login from './login.routes';
import Company from './company.routes';
import Doctor from './doctor.routes';
import Post from './post.routes';
import Rating from './rating.routes';
import Order from './order.routes'

router.use('/login', Login)
router.use('/user', User)
router.use('/company', Company)
router.use('/doctor', Doctor)
router.use('/post', Post)
router.use('/rating',Rating)
router.use('/order',Order)

export default router ;