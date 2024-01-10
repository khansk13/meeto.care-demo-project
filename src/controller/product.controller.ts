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
                const medico ={}
                medico['_id']= insertData._id;
                medico["producttitle"]=insertData.title; 
                let finalResult ={};      
                finalResult["productDetail"]=medico;  

        response(req, res, activity, 'Level-2', 'Save-product', true, 200,finalResult,clientError.success.savedSuccessfully);
            }
         catch (err: any) {
            response(req, res, activity, 'Level-3', 'Save-product', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } 

}
  



export let getSingleuser = async (req, res, next) => {
      
    try {
        
        const dataDate=await product.findOne({_id:req.body._id})
        response(req, res, activity, 'Level-3', 'getSingleuser-User', true, 200, dataDate, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'getSingleuser-User', false, 500, {}, errorMessage.internalServer, err.message);
    }
}



export let getAllUser = async (req, res, next) => {
       
    try {
   
   const dataDate=await product.find({isDeleted:false})
        response(req, res, activity, 'Level-3', 'getAllUser-User', true, 200, dataDate, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'getAllUser-User', false, 500, {}, errorMessage.internalServer, err.message);
       }
    }


export let deleteUser= async (req, res, next) => {

    try {
   const dataDate=await product.findByIdAndUpdate({_id:req.body.id},{$set:{isDeleted:true}})
        response(req, res, activity, 'Level-3', 'deleteUser-User', true, 200, dataDate, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'deleteUser-User', false, 500, {}, errorMessage.internalServer, err.message);
       }
    }




export let filter = async (req, res, next) => {

try {

const dataDate=await product.find({isDeleted:false},{email:1,doctorName:1})
    response(req, res, activity, 'Level-3', 'getAllUser-User', true, 200, dataDate, clientError.success.fetchedSuccessfully);
} catch (err: any) {
    response(req, res, activity, 'Level-3', 'getAllUser-User', false, 500, {}, errorMessage.internalServer, err.message);
       }
    }