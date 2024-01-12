import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { generate, response, sendEmailOtp } from "../helper/commonResponseHandler";
import * as TokenManager from "../utils/tokenManager";
import { Rating, ratingDocument } from "../model/productrating.model";
import { User, UserDocument } from "../model/user.model";


var activity = "ratings"

/**
 * @author Kaaviyan
 * @date 10-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to Rating  .
 */ 

// 1. Rating  api 
export let saveProductRating = async (req, res, next: any) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const ratingDetails: ratingDocument = req.body;
            const userDetails: UserDocument = req.body;
            const createData = new Rating(ratingDetails);
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
 * @date 10-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get all user rating  .
 */ 

// 2. all user  rating 

export let getAllRating = async (req, res, next) => {
 
        try {
           
            const user = await Rating.find({isDeleted:false})
            response(req, res, activity, 'Level-2', 'get-All-Rating', true, 200, user, clientError.success.fetchedSuccessfully);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'get-All_Rating', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } 

/**
 * @author Kaaviyan
 * @date 10-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get single user rating .
 */ 

// 3. all single user rating 

export let getSingleProductRating = async (req, res, next) => {
        try {
            const user = await Rating.findOne({_id:req.body.ratingId})
            response(req, res, activity, 'Level-2', 'get-Single-User-Rating', true, 200, user, clientError.success.fetchedSuccessfully);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'get-Single-User-Rating', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } 


/**
 * @author Kaaviyan
 * @date 10-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to delete user rating  .
 */ 

// 4. delete user Rating 

export let deleteProductRating = async (req, res, next) => {
        try {
            const {modifiedOn, modifiedBy} = req.body
            const userdelete = await Rating.updateOne({_id:req.body.ratingId},{$set:{isDeleted:true}})
            response(req, res, activity, 'Level-2', 'delete-Product-Rating', true, 200, userdelete, clientError.success.deleteSuccess);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'delete-Product-Rating', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } 


/**
 * @author Kaaviyan
 * @date 10-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get filter details  .
 */ 

// 5. Rating filter api 

export let getFilterProduct = async (req, res, next) => {
    try{
    var findQuery;
    var andList: any = []
    var limit = req.body.limit ? req.body.limit : 0;
    var page = req.body.page ? req.body.page : 0;
    andList.push({isDeleted:false})
    andList.push({status:1})
   
    findQuery =(andList.length > 0) ? { $and: andList } : {}
    var ratinglist = await Rating.find(findQuery).sort({ createdOn: -1 }).limit(limit).skip(page)
    var ratiinglistcount = await Rating.find(findQuery).count()
    response(req, res, activity, 'Level-1', 'Get-Filter-product', true, 200, { ratinglist, ratiinglistcount }, clientError.success.fetchedSuccessfully);
}
    catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-Filter-product', false, 500, {}, errorMessage.internalServer, err.message);
    }   
}


/**
 * @author Kaaviyan
 * @date 10-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to update  user  .
 */ 

// 6.Update doctor rating  api 


export let updateProductRating = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const ratingDetails: ratingDocument = req.body;
            const UserDetails: UserDocument = req.body;
            const review = await Rating.findByIdAndUpdate({_id:req.body.ratingId},
                {$set:{ review:ratingDetails.review,
                        ratingstar:ratingDetails.ratingstar

                }})       

            response(req, res, activity, 'Level-2', 'update-doctor-rating', true, 200, review, clientError.success.updateSuccess);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'update-doctor-rating', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'update-doctor-rating', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
} 