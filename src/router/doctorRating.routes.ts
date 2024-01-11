import {Router} from 'express';
import { deleteDoctorRating, getAllDoctorRating, getFilterDoctorRating, getSingleDoctorRating, saveDoctorRating, updateDoctorRating , } from '../controller/doctorRating.controller';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
const router:Router=Router();

router.post('/createuser',
    basicAuthUser,
    checkRequestBodyParams('email'),
    saveDoctorRating
);


router.post('/singleuser',
    basicAuthUser,
    checkRequestBodyParams('doctorId'),
    getAllDoctorRating
    );

router.post('/alluser',
    basicAuthUser,
    getSingleDoctorRating
);

router.post('/filter',
    basicAuthUser,
    checkRequestBodyParams('doctorId'),
    getFilterDoctorRating
);

router.post('/delete',
    basicAuthUser,
    deleteDoctorRating
);

router.post('/updateuser',
    basicAuthUser,
    checkRequestBodyParams('doctorId'),
    updateDoctorRating
);




export default router;