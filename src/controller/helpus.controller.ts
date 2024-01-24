
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response } from "../helper/commonResponseHandler";
import { Help, HelpDocument } from "../model/help.model";

var activity ='help'

 /**
 * @author Kaaviyan
 * @date 20-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is for create Questions.
 */

 export let helpus = async (req, res, next) => {
    try {
        const dates = new Date()
        const helpDetails: HelpDocument = req.body;
        const createdate = new Help(helpDetails);
        let insertData = await createdate.save();
        const result ={}
        result['_id']= insertData._id;
        result["Question"]=insertData.helpQuestions; 
        result["Answers"] =insertData.helpAnswers;
        let finalResult ={};      
        finalResult["HelpDetails"]=result;        
        response(req, res, activity, 'Level-2', 'create-details', true, 200, result, clientError.success.registerSuccessfully);
    }
 catch (err: any) {
    response(req, res, activity, 'Level-3', 'create-details', false, 500, {}, errorMessage.internalServer, err.message);
}
} 
/**
 * @author Kaaviyan
 * @date 20-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is for get All questions.
 */

export let allQuestion = async (req, res, next) => {
    try {
        const dates = new Date()
        const helpDetails: HelpDocument = req.body;
        const data = await Help.find({isDeleted:false})
        response(req, res, activity, 'Level-2', 'all-Questions', true, 200, data, clientError.success.registerSuccessfully);
    }
 catch (err: any) {
    response(req, res, activity, 'Level-3', 'all-Questions', false, 500, {}, errorMessage.internalServer, err.message);
}
} 


 /**
 * @author Kaaviyan
 * @date 20-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is for get single details.
 */

 export let singleQuestion = async (req, res, next) => {
    try {
        
        const helpDetails: HelpDocument = req.body;
        const data = await Help.findOne({_id:req.body.id})
        response(req, res, activity, 'Level-2', 'get-single-questions', true, 200, data, clientError.success.registerSuccessfully);
    }
 catch (err: any) {
    response(req, res, activity, 'Level-3', 'get-single-questions', false, 500, {}, errorMessage.internalServer, err.message);
}
} 


 /**
 * @author Kaaviyan
 * @date 20-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is for delete details.
 */

 export let deleteQuestion = async (req, res, next) => {
    try {
        
        const helpDetails: HelpDocument = req.body;
        const data = await Help.findByIdAndUpdate({_id:req.body._id},{$set:{isDeleted:true,modifiedOn:new Date()}})
        response(req, res, activity, 'Level-2', 'get-delete-details', true, 200, data, clientError.success.updateSuccess);
    }
 catch (err: any) {
    response(req, res, activity, 'Level-3', 'get-delete-details', false, 500, {}, errorMessage.internalServer, err.message);
}
} 


/**
 * @author Kaaviyan
 * @date 20-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get filter details  .
 */ 

//  user filter contact 


export let FilteredQuestions = async (req, res, next) => {
    try{
    var findQuery;
    var andList: any = []
    var limit = req.body.limit ? req.body.limit : 0;
    var page = req.body.page ? req.body.page : 0;
    andList.push({isDeleted:false})
    andList.push({status:1})

    findQuery =(andList.length > 0) ? { $and: andList } : {}
    var questionList = await Help.find(findQuery).sort({ name: -1 }).limit(limit).skip(page)
    var questionCount = await Help.find(findQuery).count()
    response(req, res, activity, 'Level-1', 'Get-FilterUser', true, 200, { questionList, questionCount }, clientError.success.fetchedSuccessfully);
}
    catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-FilterUser', false, 500, {}, errorMessage.internalServer, err.message);
    }   
}




