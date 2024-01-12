import { Router } from 'express';
const router: Router = Router();


import  User from './user.routes';
import Login from './login.routes';
import Company from './company.routes';
import Doctor from './doctor.routes';
import Post from './post.routes';
import Rating from './productrating.routes.';
import Order from './order.routes';
import manufacture from './manufacture.routes'
import Doctorrating from './doctorRating.routes';
import comRating from './companyrating.routes'

router.use('/login', Login)
router.use('/user', User)
router.use('/company', Company)
router.use('/doctor', Doctor)
router.use('/post', Post)
router.use('/rating',Rating)
router.use('/order',Order)
router.use('/manufacture',manufacture)
router.use('/docrate',Doctorrating)
router.use('/companyrat',comRating)

export default router ;