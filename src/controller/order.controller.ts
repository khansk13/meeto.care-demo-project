import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { generate, response, sendEmailOtp } from "../helper/commonResponseHandler";
import * as TokenManager from "../utils/tokenManager";
import { Order, orderDocument } from "../model/order.model";
import { User, UserDocument } from "../model/user.model";
import { product, productDocument } from "../model/product.model";


var activity = "order"

/**
 * @author Kaaviyan
 * @date 10-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to buy aproduct  .
 */ 

// 1. Rating  api 
export let buyProduct = async (req, res, next: any) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const userDetails: UserDocument = req.body;
            const orderDetails: orderDocument = req.body;
            const ordernum =   Math.floor(1000 + Math.random() * 10000000);
            orderDetails.orderNumber = ordernum;
            const createData = new Order(orderDetails);
            const insertData = await createData.save();            
           response(req, res, activity, 'Level-2', 'Save-order', true, 200, insertData, clientError.success.savedSuccessfully);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'Save-order', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Save-order', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}



/**
 * @author Kaaviyan
 * @date 10-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get all user  .
 */ 

// 2. all user  api 

export let getAllOrder = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const orderDetails: orderDocument = req.body;
            const user = await Order.find({isDeleted:false})
            response(req, res, activity, 'Level-2', 'get-all-order', true, 200, user, clientError.success.fetchedSuccessfully);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'get-all-order', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'get-all-order', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
} 

/**
 * @author Kaaviyan
 * @date 10-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get all user  .
 */ 

// 3. all user api 

export let getSingleOrder = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const orderDetails: orderDocument = req.body;
            const user = await Order.findOne({_id:orderDetails._id})

            response(req, res, activity, 'Level-2', 'get-Single-order', true, 200, user, clientError.success.fetchedSuccessfully);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'get-Single-order', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'get-Single-order', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
} 


/**
 * @author Kaaviyan
 * @date 10-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to update  order  .
 */ 

// 4. Update order api 

export let updateOrder = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const orderDetails: orderDocument = req.body; 
            const data = await Order.findByIdAndUpdate({_id:orderDetails._id},{$set:{
                productDetails:orderDetails.productDetails,
                deliveryCharges:orderDetails.deliveryCharges,
                totalPrice:orderDetails.totalPrice,
                totalAmount:orderDetails.totalAmount,
                shippingAddress:orderDetails.shippingAddress
                
            }                                     
            })
           
            response(req, res, activity, 'Level-2', 'update-order', true, 200, data, clientError.success.updateSuccess);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'update-order', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'update-order', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
} 


/**
 * @author Kaaviyan
 * @date 10-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to delete user  .
 */ 

// 5. delete user api 

export let deleteOrder = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const orderDetails: orderDocument = req.body;
            const userdelete = await Order.updateOne({_id:orderDetails._id},{$set:{isDeleted:true}})
            response(req, res, activity, 'Level-2', 'delete-order', true, 200, userdelete, clientError.success.deleteSuccess);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'delete-order', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'delete-order', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
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

// 6. user filter api 




export let getFilteredOrder = async (req, res, next) => {
    try{
    var findQuery;
    var andList: any = []
    var limit = req.body.limit ? req.body.limit : 0;
    var page = req.body.page ? req.body.page : 0;
    andList.push({isDeleted:false})
    andList.push({status:1})
   
    findQuery =(andList.length > 0) ? { $and: andList } : {}
    var orderList = await User.find(findQuery).sort({ createdOn: -1 }).limit(limit).skip(page)
    var orderCount = await User.find(findQuery).count()
    response(req, res, activity, 'Level-1', 'Get-FilterOrderr', true, 200, { orderList, orderCount }, clientError.success.fetchedSuccessfully);
}
    catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-FilterOrder', false, 500, {}, errorMessage.internalServer, err.message);
    }   
}