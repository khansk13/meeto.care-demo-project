import { Router } from 'express';
import { checkRequestBodyParams ,checkQuery } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
import { deleteQuestions, faq, getAllQuestions, getFilteredQuestions, getSingleQuestion } from '../controller/faq.controllr';
const router:Router=Router();



router.post('/createquestion',
basicAuthUser,
faq
)


router.post('/getallquestions',
basicAuthUser,
getAllQuestions
)


router.post('/filter',
basicAuthUser,
getFilteredQuestions
)


router.post('/delete',
basicAuthUser,
checkRequestBodyParams('_id'),
deleteQuestions
)



router.post('/singlequestion',
basicAuthUser,
checkRequestBodyParams('_id'),
getSingleQuestion
)



export default router;