
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response } from "../helper/commonResponseHandler";
import { termsAndConditions, TermsDocumnet } from "../model/termsAndConditions.model";

var activity ='terms and conditions'

 /**
 * @author Kaaviyan
 * @date 20-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is for create policy.
 */

 export let createConditions = async (req, res, next) => {
    try {
        const termsDetails: TermsDocumnet = req.body;
        const createdate = new termsAndConditions(termsDetails);
        let insertData = await createdate.save();
        const result ={}
        result['_id']= insertData._id;
        result["Conditions"]=insertData.termsAndConditions; 
        let finalResult ={};      
        finalResult["TermsAndConditions"]=result;        
        response(req, res, activity, 'Level-2', 'create-policy', true, 200, result, clientError.success.savedSuccessfully);
    }
 catch (err: any) {
    response(req, res, activity, 'Level-3', 'create-policy', false, 500, {}, errorMessage.internalServer, err.message);
}
} 


 /**
 * @author Kaaviyan
 * @date 20-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is for delete details.
 */

 export let deleteConditions = async (req, res, next) => {
    try {
        
        const termsDetails: TermsDocumnet = req.body;
        const data = await termsAndConditions.findByIdAndUpdate({_id:req.body._id},{$set:{isDeleted:true,modifiedOn:new Date()}})
        response(req, res, activity, 'Level-2', 'get-delete-details', true, 200, data, clientError.success.updateSuccess);
    }
 catch (err: any) {
    response(req, res, activity, 'Level-3', 'get-delete-details', false, 500, {}, errorMessage.internalServer, err.message);
}
} 

/**
 * @author Kaaviyan
 * @date 30-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get all conditions  .
 */ 

// all  api 

export let getAllConditions = async (req, res, next) => {
    try {
        
        const user = await termsAndConditions.find({isDeleted:false})
        response(req, res, activity, 'Level-2', 'get-conditions', true, 200, user, clientError.success.fetchedSuccessfully);
    
        }    catch (err: any) {
        response(req, res, activity, 'Level-3', 'get-conditions', false, 500, {}, errorMessage.internalServer, err.message);
    }
}

/**
* @author Kaaviyan
* @date 30-01-2024
* @param {Object} req 
* @param {Object} res 
* @param {Function} next  
* @description This Function is used to get single conditions  .
*/ 

// single  api 

export let getSingleConditions = async (req, res, next) => {
    try {
        const user = await termsAndConditions.findOne({_id:req.body._id})
        response(req, res, activity, 'Level-2', 'get-Single-conditons', true, 200, user, clientError.success.fetchedSuccessfully);
    }
    catch (err: any) {
        response(req, res, activity, 'Level-3', 'get-Single-conditions', false, 500, {}, errorMessage.internalServer, err.message);
    }
} 

/**
 * @author Kaaviyan
 * @date 08-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to update  conditions  .
 */ 


//  Update conditions 

export let updateConditions = async (req, res, next) => {
   
        try {
            const termsDetails: TermsDocumnet = req.body; 
            const data = await termsAndConditions.findByIdAndUpdate({_id:req.body._id},{$set:{
             termsAndConditions:termsDetails.termsAndConditions,
             modifiedBy:termsDetails.modifiedBy,
             modifiedOn: new Date()
            }                                     
            })
           
            response(req, res, activity, 'Level-2', 'update-conditions', true, 200, data, clientError.success.updateSuccess);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'update-conditions', false, 500, {}, errorMessage.internalServer, err.message);
        }
     
} 
