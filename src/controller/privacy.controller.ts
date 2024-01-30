
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
        result["Policy"]=insertData.privacyPolicy; 
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

 export let deletePolicy = async (req, res, next) => {
    try {
        
        const privacyDetails: PolicyDocument = req.body;
        const data = await privacyPolicy.findByIdAndUpdate({_id:req.body._id},{$set:{isDeleted:true,modifiedOn:new Date()}})
        response(req, res, activity, 'Level-2', 'delete-policy', true, 200, data, clientError.success.updateSuccess);
    }
 catch (err: any) {
    response(req, res, activity, 'Level-3', 'delete-policy', false, 500, {}, errorMessage.internalServer, err.message);
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

export let updatePolicy = async (req, res, next) => {
   
        try {
            const privacyDetails: PolicyDocument = req.body; 
            const data = await privacyPolicy.findByIdAndUpdate({_id:req.body._id},{$set:{
             privacyPolicy:privacyDetails.privacyPolicy,
             modifiedBy:privacyDetails.modifiedBy,
             modifiedOn: new Date()
            }                                     
            })
           
            response(req, res, activity, 'Level-2', 'update-policy', true, 200, data, clientError.success.updateSuccess);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'update-policy', false, 500, {}, errorMessage.internalServer, err.message);
        }
     
} 


