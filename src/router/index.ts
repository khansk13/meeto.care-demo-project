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
import Product from './product.router'
import appoinment from './doctorAppoinmnetroutes'
import ContactList from './contact.routers';
import Faq from './faq.routers';
import Helpus from './help.router';
import Ticket from './ticket.routes'
import Policy from './privacyPolicy.routes'

router.use('/login', Login)
router.use('/user', User)
router.use('/company', Company)
router.use('/doctor', Doctor)
router.use('/post', Post)
router.use('/rating',Rating)
router.use('/order',Order)
router.use('/manufacture',manufacture)
router.use('/docrate',Doctorrating)
router.use('/product',Product)
router.use('/companyrat',comRating)
router.use('/appoinment',appoinment)
router.use('/contactus',ContactList)
router.use('/faq',Faq)
router.use('/help',Helpus)
router.use('/ticket',Ticket)
router.use('/privacyPolicy',Policy)

export default router ;