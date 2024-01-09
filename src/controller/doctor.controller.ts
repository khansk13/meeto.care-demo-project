import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response, sendEmailOtp } from "../helper/commonResponseHandler";
import { Doctor, DoctorDocument } from "../model/doctor.model";
import * as TokenManager from "../utils/tokenManager";

var activity = "Doctor"

/**
 * @author Kaaviyan
 * @date 09-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to create doctor list .
 */ 

// 1. create api 
export let doctorPanel = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const DoctorData = await Doctor.findOne({ $and: [{ isDeleted: false }, { email: req.body.email }] });
            if (!DoctorData) {
                const DoctorDetails: DoctorDocument = req.body;
                const userotp =   Math.floor(1000 + Math.random() * 9999);
                DoctorDetails.otp = userotp ;
                const uniqueId =   Math.floor(Math.random() * 10000);
                const createData = new Doctor(DoctorDetails);
                let insertData = await createData.save();
                const token = await TokenManager.CreateJWTToken({
                    id: insertData["_id"],
                    name: insertData["name"],
                 });
                const result = {}
                result['_id'] = insertData._id
                result['DoctorName'] = insertData.doctorName;
                result['doctorEmail'] = insertData.email;
                let finalResult = {};
                finalResult["SignUp"] = 'Doctor';
                finalResult["DoctorDetails"] = result;
                finalResult["token"] = token;
                sendEmailOtp(insertData.email,insertData.otp)
                response(req, res, activity, 'Level-2', 'User-save', true, 200, result, clientError.success.registerSuccessfully);
                } else {
                    response(req, res, activity, 'Level-3', 'User-save', true, 422, {},clientError.email.emailNotVerified);
                }
            }
           

         catch (err: any) {
            response(req, res, activity, 'Level-3', 'User-save', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'User-save', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}
 

/**
 * @author Kaaviyan
 * @date 08-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get all user  .
 */ 

// 2. all user  api 

export let getAllPanel = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const DoctorDetails: DoctorDocument = req.body;
            const user = await Doctor.find({})
            response(req, res, activity, 'Level-2', 'get-all-Panel', true, 200, user, clientError.success.fetchedSuccessfully);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'get-all-Panel', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'get-all-Panel', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
} 

/**
 * @author Kaaviyan
 * @date 08-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get all user  .
 */ 

// 3. all user api 

export let getSinglePanel = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const DoctorDetails: DoctorDocument = req.body;
            const user = await Doctor.findOne({_id:DoctorDetails.userId})
            response(req, res, activity, 'Level-2', 'get-Single-Panel', true, 200, user, clientError.success.fetchedSuccessfully);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'get-Single-Panel', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'get-Single-Panel', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
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

export let updatePanel = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const DoctorDetails: DoctorDocument = req.body; 
            const data = await Doctor.findByIdAndUpdate({_id:DoctorDetails.userId},{$set:{
            
            }                                     
            })
           
            response(req, res, activity, 'Level-2', 'update-Panel', true, 200, data, clientError.success.updateSuccess);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'update-Panel', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'update-Panel', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
} 


/**
 * @author Kaaviyan
 * @date 08-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to delete user  .
 */ 

// 5. delete user api 

export let deletePanel = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const DoctorDetails: DoctorDocument = req.body;
            const userdelete = await Doctor.updateOne({_id:DoctorDetails.userId},{$set:{isDeleted:true}})
            response(req, res, activity, 'Level-2', 'delete-Panel', true, 200, userdelete, clientError.success.deleteSuccess);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'delete-Panel', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'delete-Panel', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
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

// 6. user filter api 

export let getFilterPanel = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const DoctorDetails: DoctorDocument = req.body;
            const user = await Doctor.findOne({email:DoctorDetails.email},{
                userName:1,mobileNumber:1 ,_id:0

            })
            response(req, res, activity, 'Level-2', 'get-Filter-Panel', true, 200, user, clientError.success.fetchedSuccessfully);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'get-Filter-Panel', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'get-Filter-Panel', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
} 