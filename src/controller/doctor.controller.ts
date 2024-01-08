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
 

