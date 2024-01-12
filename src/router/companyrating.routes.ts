import {Router} from 'express';
import { deleteCompanyRating, getAllCompanyRating, getFilterCompanyRating, getSingleCompanyRating, saveCompanyRating, updateCompanyRating , } from '../controller/Companyrating.controller';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
const router:Router=Router();

router.post('/createrating',
    basicAuthUser,
    checkRequestBodyParams('companyName'),
    saveCompanyRating
);


router.post('/singleuser',
    basicAuthUser,
    checkRequestBodyParams('doctorId'),
    getSingleCompanyRating
    );

router.post('/alluser',
    basicAuthUser,
    getAllCompanyRating
);

router.post('/filter',
    basicAuthUser,
    checkRequestBodyParams('doctorId'),
getFilterCompanyRating
);

router.post('/delete',
    basicAuthUser,
    deleteCompanyRating
);

router.post('/updaterating',
    basicAuthUser,
    checkRequestBodyParams('_id'),
    updateCompanyRating
);




export default router;