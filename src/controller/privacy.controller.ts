
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response } from "../helper/commonResponseHandler";
import { privacyPolicy, PolicyDocument } from "../model/privacyPolicy.model";

var activity ='privacy policy'

 /**
 * @author Kaaviyan
 * @date 20-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is for create policy.
 */

 export let createPolicy = async (req, res, next) => {
    try {
        const privacyDetails: PolicyDocument = req.body;
        const createdate = new privacyPolicy(privacyDetails);
        let insertData = await createdate.save();
        const result ={}
        result['_id']= insertData._id;
        result["terms"]=insertData.terms; 
        result["condition"] =insertData.conditions;
        let finalResult ={};      
        finalResult["PrivacyPolicy"]=result;        
        response(req, res, activity, 'Level-2', 'create-policy', true, 200, result, clientError.success.registerSuccessfully);
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
        
        const privacyDetails: PolicyDocument = req.body;
        const data = await privacyPolicy.findByIdAndUpdate({_id:req.body._id},{$set:{isDeleted:true,modifiedOn:new Date()}})
        response(req, res, activity, 'Level-2', 'get-delete-details', true, 200, data, clientError.success.updateSuccess);
    }
 catch (err: any) {
    response(req, res, activity, 'Level-3', 'get-delete-details', false, 500, {}, errorMessage.internalServer, err.message);
}
} 

