import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { generate, response, sendEmailOtp } from "../helper/commonResponseHandler";
import * as TokenManager from "../utils/tokenManager";
import { DoctorRating, doctorRatingDocument } from "../model/doctorRating.model";
import { User, UserDocument } from "../model/user.model";


var activity = "doctorRating"

/**
 * @author Kaaviyan
 * @date 11-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to DoctorRating  .
 */ 

// 1. Rating  api 
export let saveDoctorRating = async (req, res, next: any) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const doctorRatingDetails: doctorRatingDocument = req.body;
            const userDetails: UserDocument = req.body;
            const createData = new DoctorRating(doctorRatingDetails);
            const insertData = await createData.save();
            response(req, res, activity, 'Level-2', 'Save-ProductRating', true, 200, insertData, clientError.success.savedSuccessfully);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'Save-ProductRating', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Save-ProductRating',
          false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}

/**
 * @author Kaaviyan
 * @date 11-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get all doctor rating  .
 */ 

// 2. all Doctor  rating 

export let getAllDoctorRating = async (req, res, next) => {
 
        try {
           
            const user = await DoctorRating.find({isDeleted:false})
            response(req, res, activity, 'Level-2', 'get-All-Doctor-rating', true, 200, user, clientError.success.fetchedSuccessfully);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'get-al-doctor-rating', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } 

/**
 * @author Kaaviyan
 * @date 11-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get single user rating .
 */ 

// 3. all single user rating 

export let getSingleDoctorRating = async (req, res, next) => {
        try {
            const doctorRatingDetails: doctorRatingDocument = req.body;
            const user = await DoctorRating.findOne({_id:doctorRatingDetails.doctorId})
            response(req, res, activity, 'Level-2', 'get-Single-Doctor-Rating', true, 200, user, clientError.success.fetchedSuccessfully);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'get-Single-Doctor-Rating', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } 


/**
 * @author Kaaviyan
 * @date 11-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to delete doctor rating  .
 */ 

// 4. delete Doctor Rating 

export let deleteDoctorRating = async (req, res, next) => {
        try {
            const doctorRatingDetails: doctorRatingDocument = req.body;
            const userdelete = await DoctorRating.updateOne({_id:doctorRatingDetails._id},{$set:{isDeleted:true}})
            response(req, res, activity, 'Level-2', 'delete-Doctor-rating', true, 200, userdelete, clientError.success.deleteSuccess);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'delete-Doctor-rating', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } 


/**
 * @author Kaaviyan
 * @date 11-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get filter details  .
 */ 

// 5. Rating filter api 


export let getFiltereRating = async (req, res, next) => {
    try{
    var findQuery;
    var andList: any = []
    var limit = req.body.limit ? req.body.limit : 0;
    var page = req.body.page ? req.body.page : 0;
    andList.push({isDeleted:false})
    andList.push({status:1})
   
    findQuery =(andList.length > 0) ? { $and: andList } : {}
    var ratingList = await User.find(findQuery).sort({ createdOn: -1 }).limit(limit).skip(page)
    var ratingListCOunt = await User.find(findQuery).count()
    response(req, res, activity, 'Level-1', 'Get-Filter-Rating', true, 200, { ratingList, ratingListCOunt }, clientError.success.fetchedSuccessfully);
}
    catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-Filter-Rating', false, 500, {}, errorMessage.internalServer, err.message);
    }   
}

/**
 * @author Kaaviyan
 * @date 11-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to update  user  .
 */ 

// 6.Update doctor rating  api 


export let updateDoctorRating = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const doctorRatingDetails: doctorRatingDocument = req.body;
            const data = await DoctorRating.updateOne({_id:doctorRatingDetails._id},{$set:{
                    Reviews:doctorRatingDetails.Reviews,
                    ratingStar:doctorRatingDetails.ratingStar
                    
               }                                     
               })
       
   
            response(req, res, activity, 'Level-2', 'update-doctor-rating', true, 200, data, clientError.success.updateSuccess);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'update-doctor-rating', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'update-doctor-rating', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
} 
