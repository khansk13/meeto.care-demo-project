import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response, sendEmailOtp } from "../helper/commonResponseHandler";
import * as TokenManager from "../utils/tokenManager";
import { Doctor, DoctorDocument } from "../model/doctor.model";


var activity = "Doctor"

/**
 * @author Kaaviyan
 * @date 08-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to create doctor list .
 */ 

// 1. create api 
export let doctorProfile = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const companyData = await Doctor.findOne({ $and: [{ isDeleted: false }, { email: req.body.email }] });
            if (!companyData) {
                const DoctorDetails: DoctorDocument = req.body;
                const userotp =   Math.floor(1000 + Math.random() * 9999);
                DoctorDetails.otp = userotp ;
                const createData = new Doctor(DoctorDetails);
                let insertData = await createData.save();
                const token = await TokenManager.CreateJWTToken({
                    id: insertData["_id"],
                    name: insertData["name"],
                 });
                const result = {}
                result['_id'] = insertData._id
                result['DoctorName'] = insertData.doctorName;
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

export let getDetails = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const DoctorDetails: DoctorDocument = req.body;
            const user = await Doctor.find({_id:DoctorDetails.userId})
            response(req, res, activity, 'Level-2', 'User-save', true, 200, user, clientError.success.fetchedSuccessfully);
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

// 3. all user api 

export let getSingleDetails = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const DoctorDetails: DoctorDocument = req.body;
            const user = await Doctor.findOne({_id:DoctorDetails.userId})
            response(req, res, activity, 'Level-2', 'User-save', true, 200, user, clientError.success.fetchedSuccessfully);
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
 * @description This Function is used to update  user  .
 */ 

// 4. Update user api 

export let updateUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const DoctorDetails: DoctorDocument = req.body; 
            const data = await Doctor.findByIdAndUpdate({_id:DoctorDetails.userId},{$set:{
                doctorBio:DoctorDetails.doctorBio,
                qualification:DoctorDetails.qualification,
                experience:DoctorDetails.experience,
                specialization:DoctorDetails.specialization,
                language:DoctorDetails.language,
                gender:DoctorDetails.gender,
                address:DoctorDetails.address,
                city:DoctorDetails.city,
                state:DoctorDetails.state,
                pincode:DoctorDetails.pincode,
                landLineNumber :DoctorDetails.landLineNumber,
            }                                     
            })
           
            response(req, res, activity, 'Level-2', 'Save-Company', true, 200, data, clientError.success.updateSuccess);
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
 * @description This Function is used to delete user  .
 */ 

// 5. delete user api 

export let deleteUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const DoctorDetails: DoctorDocument = req.body;
            const user = await Doctor.updateOne({_id:DoctorDetails.userId},{$set:{isDeleted:true}})
            response(req, res, activity, 'Level-2', 'User-save', true, 200, user, clientError.success.deleteSuccess);
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
 * @description This Function is used to get filter details  .
 */ 

// 6. user filter api 

export let getuserDetails = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const DoctorDetails: DoctorDocument = req.body;
            const user = await Doctor.findOne({_id:DoctorDetails.userId},{
                doctorName:1,email:1,specialization:1 ,_id:0

            })
            response(req, res, activity, 'Level-2', 'User-save', true, 200, user, clientError.success.fetchedSuccessfully);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'User-save', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'User-save', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
} 