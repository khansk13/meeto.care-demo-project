import {Router} from 'express';
import { deleteDoctorRating, getAllDoctorRating, getFiltereRating, getSingleDoctorRating, saveDoctorRating, updateDoctorRating , } from '../controller/doctorRating.controller';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
const router:Router=Router();

router.post('/doctorrating',
    basicAuthUser,
    checkRequestBodyParams('doctorId'),
    saveDoctorRating
);


router.post('/singlerating',
    basicAuthUser,
    checkRequestBodyParams('doctorId'),
    getAllDoctorRating
    );

router.post('/allrating',
    basicAuthUser,
    getSingleDoctorRating
);

router.put('/filter',
    basicAuthUser,
    checkRequestBodyParams('doctorId'),
    getFiltereRating
);

router.post('/delete',
    basicAuthUser,
    deleteDoctorRating
);

router.post('/updaterating',
    basicAuthUser,
    updateDoctorRating
);




export default router;