import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { generateTicketNumber, response, sendEmailOtp } from "../helper/commonResponseHandler";
import { Appoinment, AppoinmentDocument } from "../model/doctorappoinment.model";
import * as TokenManager from "../utils/tokenManager";

var activity = "Appoinment"

/**
 * @author Kaaviyan
 * @date 13-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to create doctor Appoinment .
 */ 

export let doctorAppoinment = async (req, res, next: any) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const id =generateTicketNumber()
        try {
            const AppoinmentDetails: AppoinmentDocument = req.body; 
            const number= generateTicketNumber();
            const createData = new Appoinment(AppoinmentDetails)
            const insertData = await createData.save(); 
            const find = await Appoinment.findOne({ $and: [{ appoinmentStatus:req.body.Status}, {doctorName:req.body.name}] });
            if (find) {
                const data = await Appoinment.updateOne({_id:insertData._id},{$set:{patientDetails:[{appoinmentNumber:number}]}});
                response(req, res, activity, 'Level-2', 'Save-Appoinmnet', true, 200, insertData, clientError.success.savedSuccessfully);
            } else {
                response(req, res, activity, 'Level-2', 'Save-Appoinmnet', false, 204,{}, clientError.success.unsavedSuccesfully);
            }
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'Save-Appoinmnet', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Save-Appoinmnet', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}


 

/**
 * @author Kaaviyan
 * @date 13-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get all Appoinmnet  .
 */ 

// 2. all appoinmnet 

export let getAllAppoinment = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const AppoinmentDetails: AppoinmentDocument = req.body;
            const user = await Appoinment.find({isDeleted:false})
            response(req, res, activity, 'Level-2', 'get-all-Appoinmnet', true, 200, user, clientError.success.fetchedSuccessfully);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'get-all-Appoinmnet', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'get-all-Appoinmnet', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
} 

/**
 * @author Kaaviyan
 * @date 13-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get single appoinment   .
 */ 

// 3. all single appoinment 

export let getSingleAppoinment = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const AppoinmentDetails: AppoinmentDocument = req.body;
            const user = await Appoinment.findOne({_id:AppoinmentDetails.appoinmentId})
            response(req, res, activity, 'Level-2', 'get-Single-Appoinmnet', true, 200, user, clientError.success.fetchedSuccessfully);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'get-Single-Appoinmnet', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'get-Single-Appoinmnet', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
} 

/**
 * @author Kaaviyan
 * @date 09-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to update  user  .
 */ 

// 4. Update patient appoinment  

export let updateAppoinment = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const AppoinmentDetails: AppoinmentDocument = req.body; 
            // //let id = incrementWithMath(5);
            // const number = incrementWithMath(5);
            const id =   Math.floor(1000 + Math.random() * 9999);
            // AppoinmentDetails.patientDetails.appoinmentNumber = id ;
            const data = await Appoinment.updateMany({_id:AppoinmentDetails.appoinmentId},{$push:{
                patientDetails:AppoinmentDetails.patientDetails
            }                                     
            })
         
            response(req, res, activity, 'Level-2', 'update-appoinment', true, 200, data, clientError.success.updateSuccess);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'update-appoinment', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'update-appoinmnet', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
} 


/**
 * @author Kaaviyan
 * @date 13-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to delete appoinment  .
 */ 

// 5. delete user appoinmnet 

export let deleteAppoinment = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const AppoinmentDetails: AppoinmentDocument = req.body;
            const userdelete = await Appoinment.updateOne({_id:AppoinmentDetails.appoinmentId},{$set:{isDeleted:true}})
            response(req, res, activity, 'Level-2', 'delete-appoinment', true, 200, userdelete, clientError.success.deleteSuccess);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'delete-appoinmnet', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'delete-appoinment', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
} 


/**
 * @author Kaaviyan
 * @date 13-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get filter appoinment  .
 */ 

// 6. user filter api 

export let getFilterAppoinment = async (req, res, next) => {
    try{
    var findQuery;
    var andList: any = []
    var limit = req.body.limit ? req.body.limit : 0;
    var page = req.body.page ? req.body.page : 0;
    andList.push({isDeleted:false})
    andList.push({status:1})
   
    findQuery =(andList.length > 0) ? { $and: andList } : {}
    var appoinmentlist = await Appoinment.find(findQuery).sort({ createdOn: -1 }).limit(limit).skip(page)
    var appoinmentcount = await Appoinment.find(findQuery).count()
    response(req, res, activity, 'Level-1', 'Get-Filter-Appoinmnet', true, 200, { appoinmentlist, appoinmentcount }, clientError.success.fetchedSuccessfully);
}
    catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-Filter-Appoinment', false, 500, {}, errorMessage.internalServer, err.message);
    }   
}
