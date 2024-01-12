import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { generate, response, sendEmailOtp } from "../helper/commonResponseHandler";
import * as TokenManager from "../utils/tokenManager";
import { companyRating, companyRatingDocument } from "../model/companyrating.model";
import { User, UserDocument } from "../model/user.model";


var activity = "doctorRating"

/**
 * @author Kaaviyan
 * @date 11-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to company rating  .
 */ 

// 1. Rating  api 
export let saveCompanyRating = async (req, res, next: any) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const compnayRatingDetails: companyRatingDocument = req.body;
            const userDetails: UserDocument = req.body;
            const createData = new companyRating(compnayRatingDetails);
            const insertData = await createData.save();
            response(req, res, activity, 'Level-2', 'Save-company-rating', true, 200, insertData, clientError.success.savedSuccessfully);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'Save-company-rating', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Save-company-rating', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}

/**
 * @author Kaaviyan
 * @date 08-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get all company rating  .
 */ 

// 2. all Doctor  rating 

export let getAllCompanyRating = async (req, res, next) => {
 
        try {
           
            const user = await companyRating.find({isDeleted:false})
            response(req, res, activity, 'Level-2', 'get-All-company-rating', true, 200, user, clientError.success.fetchedSuccessfully);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'get-al-company-rating', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } 

/**
 * @author Kaaviyan
 * @date 08-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get single company rating .
 */ 

// 3. all single user rating 

export let getSingleCompanyRating = async (req, res, next) => {
        try {
            const compnayRatingDetails: companyRatingDocument = req.body;
            const user = await companyRating.findOne({_id:compnayRatingDetails.CompanyId})
            response(req, res, activity, 'Level-2', 'get-Single-company-Rating', true, 200, user, clientError.success.fetchedSuccessfully);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'get-Single-company-Rating', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } 


/**
 * @author Kaaviyan
 * @date 08-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to delete company rating  .
 */ 

// 4. delete company Rating 

export let deleteCompanyRating = async (req, res, next) => {
        try {
            const compnayRatingDetails: companyRatingDocument = req.body;
            const userdelete = await companyRating.updateOne({_id:compnayRatingDetails.CompanyId},{$set:{isDeleted:true}})
            response(req, res, activity, 'Level-2', 'delete-company-rating', true, 200, userdelete, clientError.success.deleteSuccess);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'delete-company-rating', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } 


/**
 * @author Kaaviyan
 * @date 08-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get filter rating  .
 */ 

// 5. Rating filter api 

export let getFilterCompanyRating = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const compnayRatingDetails: companyRatingDocument = req.body;
            const user = await companyRating.find({_id:compnayRatingDetails.CompanyId},{

            })
            response(req, res, activity, 'Level-2', 'get-Filter-company-rating', true, 200, user, clientError.success.fetchedSuccessfully);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'get-Filter-company-rating', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'get-Filter-company+-rating', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
} 

/**
 * @author Kaaviyan
 * @date 08-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to update  company rating  .
 */ 

// 6.Update doctor rating  api 


export let updateCompanyRating = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const compnayRatingDetails: companyRatingDocument = req.body;
            const review = await companyRating.findByIdAndUpdate({_id:compnayRatingDetails._id},
                {$set:{
                    productName:compnayRatingDetails.productName,
                    reviews:compnayRatingDetails.reviews,
                    ratingStar:compnayRatingDetails.ratingStar
                }

        })       

            response(req, res, activity, 'Level-2', 'update-doctor-rating', true, 200, review, clientError.success.updateSuccess);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'update-doctor-rating', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'update-doctor-rating', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
} 
