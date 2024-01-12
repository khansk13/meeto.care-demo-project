import { clientError, errorMessage } from "../helper/ErrorMessage";
import { validationResult } from "express-validator";
import { response } from "../helper/commonResponseHandler";
import { product,productDocument } from "../model/product.model";
import {Doctor,DoctorDocument } from "../model/doctor.model";

var activity = "productCreate"


export let productcreate = async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            let {companyId} = req.body;
            const productDetail: productDocument = req.body;
    
          const user1 = await product.findOne({ $and: [{ isDeleted: false }, {_id:productDetail.companyId }] })
                const productcreate = new product(productDetail);
                let insertData = await productcreate.save();
                const bikeSpare ={}
                bikeSpare['_id']= insertData._id;
                bikeSpare["producttitle"]=insertData.title; 
                let finalResult ={};      
                finalResult["productDetail"]=bikeSpare;  

        response(req, res, activity, 'Level-2', 'Save-product', true, 200,finalResult,clientError.success.savedSuccessfully);
            }
         catch (err: any) {
            response(req, res, activity, 'Level-3', 'Save-product', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } 

}
  



export let getSingleProduct = async (req, res, next) => {
      
    try {
        const productDetail: productDocument = req.body;
        const dataDate=await product.findOne({_id:req.body.productId})
        response(req, res, activity, 'Level-3', 'getSingleuser-User', true, 200, dataDate, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'getSingleuser-User', false, 500, {}, errorMessage.internalServer, err.message);
    }
}


/**
 * @author Kaaviyan
 * @date 08-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to update  user  .
 */ 


// 4. Update user api 

export let updateProduct = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const productDetail: productDocument = req.body; 
            const data = await product.findByIdAndUpdate({_id:req.body.productId},{$set:{
                Specifications:productDetail.Specifications,
                OriginalPrice:productDetail.OriginalPrice,
                Selling:productDetail.Selling,
                Category:productDetail.Category,
                ProductDescription:productDetail.ProductDescription,
                title:productDetail.title
            }                                     
            })
           
            response(req, res, activity, 'Level-2', 'update-user', true, 200, data, clientError.success.updateSuccess);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'update-user', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'update-user', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
} 


export let getAllProduct = async (req, res, next) => {
       
    try {
        const productDetail: productDocument = req.body;
   const dataDate=await product.find({isDeleted:false})
        response(req, res, activity, 'Level-3', 'getAllUser-User', true, 200, dataDate, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'getAllUser-User', false, 500, {}, errorMessage.internalServer, err.message);
       }
    }


export let deleteproduct= async (req, res, next) => {

    try {
        const productDetail: productDocument = req.body;
   const dataDate=await product.findByIdAndUpdate({_id:productDetail.userId},{$set:{isDeleted:true}})
        response(req, res, activity, 'Level-3', 'deleteUser-User', true, 200, dataDate, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'deleteUser-User', false, 500, {}, errorMessage.internalServer, err.message);
       }
    }




export let getFilterProduct = async (req, res, next) => {
    try{
    var findQuery;
    var andList: any = []
    var limit = req.body.limit ? req.body.limit : 0;
    var page = req.body.page ? req.body.page : 0;
    andList.push({isDeleted:false})
    andList.push({status:1})
    if (req.body.email) {
        andList.push({ email: req.body.email })
    }
    if (req.body.userName) {
        andList.push({ name: req.body.userName })
    }
    if (req.body.mobileNumber) {
        andList.push({ mobileNumber: req.body.mobileNumber })
    }
    findQuery =(andList.length > 0) ? { $and: andList } : {}
    var productList = await product.find(findQuery).sort({ createdOn: -1 }).limit(limit).skip(page)
    var productCount = await product.find(findQuery).count()
    response(req, res, activity, 'Level-1', 'Get-FilterProduct', true, 200, { productList, productCount }, clientError.success.fetchedSuccessfully);
}
    catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-FilterProduct', false, 500, {}, errorMessage.internalServer, err.message);
    }   
}
