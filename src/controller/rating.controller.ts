import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { generate, response, sendEmailOtp } from "../helper/commonResponseHandler";
import * as TokenManager from "../utils/tokenManager";
import { Rating, ratingDocument } from "../model/rating.model";
import { User, UserDocument } from "../model/usermodel";


var activity = "ratings"

/**
 * @author Kaaviyan
 * @date 08-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to Rating  .
 */ 

// 1. Rating  api 
export let userRating = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const userDetails: UserDocument = req.body;
            const productData = await User.findOne({ $and: [{ isDeleted: false }, {_id:userDetails.userId }] });
            if (productData) {
                const RatingDetails: ratingDocument = req.body;
                let uniqueid = Math.floor(10 + Math.random() * 999);
                RatingDetails.uniqueId = uniqueid;  
                const createData = new Rating(RatingDetails);
                let insertData = await createData.save();
                const result = {}
                result['_id'] = insertData._id
                result['productName'] = insertData.productId;
                result['userComments'] = insertData.comments;
                let finalResult = {};
                finalResult["Product"] = 'Products';
                finalResult["Ratings"] = result;
                response(req, res, activity, 'Level-2', 'User-Profile', true, 200, result, clientError.success.ratingsucces);
                } else {
                    response(req, res, activity, 'Level-3', 'User-Profile', true, 422, {},clientError.email.emailNotVerified);
                }
            }
         catch (err: any) {
            response(req, res, activity, 'Level-3', 'User-Profile', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'User-Profile', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}

/**
 * @author Kaaviyan
 * @date 08-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get all user rating  .
 */ 

// 2. all user  rating 

export let getAllRating = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const RatingDetails: ratingDocument = req.body;
            const user = await Rating.find({})
            response(req, res, activity, 'Level-2', 'get-All-Rating', true, 200, user, clientError.success.fetchedSuccessfully);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'get-All_Rating', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'get-All-Rating', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
} 

/**
 * @author Kaaviyan
 * @date 08-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get single user rating .
 */ 

// 3. all single user rating 

export let getSingleUserRating = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const RatingDetails: ratingDocument = req.body;
            const user = await Rating.findOne({_id:RatingDetails.productId})
            response(req, res, activity, 'Level-2', 'get-Single-User-Rating', true, 200, user, clientError.success.fetchedSuccessfully);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'get-Single-User-Rating', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'get-Single-User-Rating', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
} 


/**
 * @author Kaaviyan
 * @date 08-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to delete user rating  .
 */ 

// 4. delete user Rating 

export let deleteRating = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const RatingDetails: ratingDocument = req.body;
            const userdelete = await Rating.updateOne({_id:RatingDetails.productId},{$set:{isDeleted:true}})
            response(req, res, activity, 'Level-2', 'delete-Rating', true, 200, userdelete, clientError.success.deleteSuccess);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'delete-Rating', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'delete-Rating', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
} 


/**
 * @author Kaaviyan
 * @date 08-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get filter details  .
 */ 

// 5. Rating filter api 

export let getFilterRating = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const RatingDetails: ratingDocument = req.body;
            const user = await Rating.find({_id:RatingDetails.productId},{
                userName:1,mobileNumber:1 ,_id:0

            })
            response(req, res, activity, 'Level-2', 'get-Filter-Rating', true, 200, user, clientError.success.fetchedSuccessfully);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'get-Filter-Rating', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'get-Filter-Rating', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
} 