import { Router } from 'express';
import { checkRequestBodyParams ,checkQuery } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
import { FilteredQuestions, allQuestion, deleteQuestion, helpus, singleQuestion } from '../controller/helpus.controller';
const router:Router=Router();



router.post('/createquestion',
basicAuthUser,
helpus
)


router.post('/getallquestions',
basicAuthUser,
allQuestion
)


router.post('/filter',
basicAuthUser,
FilteredQuestions
)


router.post('/delete',
basicAuthUser,
checkRequestBodyParams('_id'),
deleteQuestion
)



router.post('/singlequestion',
basicAuthUser,
checkRequestBodyParams('_id'),
singleQuestion
)



export default router;