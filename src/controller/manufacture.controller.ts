import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { generate, response, sendEmailOtp } from "../helper/commonResponseHandler";
import * as TokenManager from "../utils/tokenManager";
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
 * @date 09-01-2024
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
 * @date 09-01-2024
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
 * @date 09-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to delete user rating  .
 */ 

// 4. delete user Rating 

export let deleteProduct = async (req, res, next) => {
        try {
            const manufactureDetails: ManufactureDocument = req.body;
            const userdelete = await Manufacture.updateOne({companyName:manufactureDetails.companyName},{$set:{isDeleted:true}})
            response(req, res, activity, 'Level-2', 'delete-product', true, 200, userdelete, clientError.success.deleteSuccess);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'delete-product', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } 


/**
 * @author Kaaviyan
 * @date 09-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get filter details  .
 */ 

// 5. Rating filter api 

export let getFilteredManufacture = async (req, res, next) => {
    try{
    var findQuery;
    var andList: any = []
    var limit = req.body.limit ? req.body.limit : 0;
    var page = req.body.page ? req.body.page : 0;
    andList.push({isDeleted:false})
    andList.push({status:1})
   
    findQuery =(andList.length > 0) ? { $and: andList } : {}
    var manufactureList = await Manufacture.find(findQuery).sort({ createdOn: -1 }).limit(limit).skip(page)
    var manufactureListCount = await Manufacture.find(findQuery).count()
    response(req, res, activity, 'Level-1', 'Get-Filter-manufacture', true, 200, { manufactureList, manufactureListCount }, clientError.success.fetchedSuccessfully);
}
    catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-Filter-Manufacture', false, 500, {}, errorMessage.internalServer, err.message);
    }   
}
/**
 * @author Kaaviyan
 * @date 09-01-2024
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
