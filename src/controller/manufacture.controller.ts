import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { generate, response, sendEmailOtp } from "../helper/commonResponseHandler";
import * as TokenManager from "../utils/tokenManager";
import { Rating, ratingDocument } from "../model/rating.model";
import { User, UserDocument } from "../model/user.model";
import { Manufacture, ManufactureDocument } from "../model/manufacture.model";


var activity = "product"

/**
 * @author Kaaviyan
 * @date 08-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to creat api   .
 */ 

// 1. manufacturing  api 

export let createProductManufacturing = async (req, res, next: any) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            let date = new Date()
            const manufactureDetails: ManufactureDocument = req.body;
            const createData = new Manufacture(manufactureDetails);
            const insertData = await createData.save();
            const result = {}
            result['_id'] = insertData._id
            result['productName'] = insertData.productName
            result['date'] = insertData.ExpDate;
            result['Contact'] = insertData.email;

            let finalResult = {};
            finalResult["manufacture"] = 'product';
            finalResult["manufactureDetails"] = result;
            response(req, res, activity, 'Level-2', 'create-product-Manufacturing', true, 200, result, clientError.success.savedSuccessfully);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'create-product-Manufacturing', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'create-product-Manufacturing', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}

/**
 * @author Kaaviyan
 * @date 08-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get all  manufacturing product list .
 */ 

// 2. all manufacturing product list  

export let getAlllist = async (req, res, next) => {
 
        try {
            const manufactureDetails: ManufactureDocument = req.body;
            const user = await Manufacture.find({isDeleted:false})
            response(req, res, activity, 'Level-2', 'get-All-list', true, 200, user, clientError.success.fetchedSuccessfully);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'get-all-list', false, 500, {}, errorMessage.internalServer, err.message);
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

export let getManufacturinglist = async (req, res, next) => {
        try {
            const manufactureDetails: ManufactureDocument = req.body;
            const user = await Manufacture.findOne({_id:manufactureDetails.productId})
            response(req, res, activity, 'Level-2', 'get-Manufacturing-list', true, 200, user, clientError.success.fetchedSuccessfully);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'get-Manufacturing-list', false, 500, {}, errorMessage.internalServer, err.message);
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

export let deleteProduct = async (req, res, next) => {
        try {
            const manufactureDetails: ManufactureDocument = req.body;
            const userdelete = await Manufacture.updateOne({_id:manufactureDetails.productId},{$set:{isDeleted:true}})
            response(req, res, activity, 'Level-2', 'delete-product', true, 200, userdelete, clientError.success.deleteSuccess);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'delete-product', false, 500, {}, errorMessage.internalServer, err.message);
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

export let getFilterProduct = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const manufactureDetails: ManufactureDocument = req.body;
            const user = await Manufacture.find({_id:manufactureDetails.productId},{
                productName:1,manufactureDate:1,ExpDate:1,email:1 ,_id:0

            })
            response(req, res, activity, 'Level-2', 'get-Filter-product', true, 200, user, clientError.success.fetchedSuccessfully);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'get-Filter-product', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'get-Filter-product', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
} 

/**
 * @author Kaaviyan
 * @date 08-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to update  manufacturing  .
 */ 

// 6. Update manufacturing api 

export let updateManufacturingProduct = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const manufactureDetails: ManufactureDocument = req.body;
            const data = await Manufacture.findByIdAndUpdate({_id:manufactureDetails.productId},{$set:{
                ManufactureOn:manufactureDetails.ManufactureOn,
                ExpDate:manufactureDetails.ExpDate,
                Address:manufactureDetails.Address,
                email:manufactureDetails.email,
                Country:manufactureDetails.country,
            }                                     
            })
           
            response(req, res, activity, 'Level-2', 'update-manufacture-product', true, 200, data, clientError.success.updateSuccess);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'update-manufacture-product', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'update-manufacture-product', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
} 
