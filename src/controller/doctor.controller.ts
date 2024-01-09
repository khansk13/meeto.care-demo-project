import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response, sendEmailOtp } from "../helper/commonResponseHandler";
import { Doctor, DoctorDocument } from "../model/doctor.model";
//import {signup,signupDocument} from "..model/signup"
import * as TokenManager from "../utils/tokenManager";
import { hashPassword } from "../helper/Encryption";
import { ConnectionStates } from "mongoose";

var activity = "signup"
export let doctorProfile = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const companyData = await Doctor.findOne({ $and: [{ isDeleted: false }, { email: req.body.email }] });
            if (!companyData) {
                const DoctorDetails: DoctorDocument = req.body;
             const createData = new Doctor(DoctorDetails);
                let insert = await createData.save();
                const userotp = await Math.floor(1000 + Math.random() * 9999);
              const id = insert.id;
                const user = await Doctor.updateOne({_id:id}, { $set: { otp: userotp } })
                const insertData = await Doctor.findOne({_id:id})
                const token = await TokenManager.CreateJWTToken({
                    DoctorId: insertData["_id"],
                    DoctorName: insertData["name"],
                 });
                const result = {}
                result['_id'] = insertData._id
                result['DoctorName'] = insertData.doctorName;
                let finalResult = {};
                finalResult["SignUp"] = 'Doctor';
                finalResult["DoctorDetails"] = result;
                finalResult["token"] = token;
                // sendEmail(insertData.email,insertData.otp)
                response(req, res, activity, 'Level-2', 'User-save', true, 200, finalResult, clientError.success.registerSuccessfully);
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



export let updateAll = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const DoctorDetails: DoctorDocument = req.body;
            const data=await Doctor.updateMany({_id:DoctorDetails.id},{$set:{doctorName:DoctorDetails.doctorName,
                email:DoctorDetails.email,
                phone:DoctorDetails.phone,
                address:DoctorDetails.address,
                state:DoctorDetails.state,
                pincode:DoctorDetails.pincode}})
            response(req, res, activity, 'Level-3', 'Update-User', true, 200, data, clientError.success.updateSuccess);
        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Update-User', false, 500, {}, errorMessage.internalServer, err.message);
        }
    }
}


    export let getSingleuser = async (req, res, next) => {
      
            try {
                
                const dataDate=await Doctor.findOne({_id:req.body._id})
                response(req, res, activity, 'Level-3', 'getSingleuser-User', true, 200, dataDate, clientError.success.fetchedSuccessfully);
            } catch (err: any) {
                response(req, res, activity, 'Level-3', 'getSingleuser-User', false, 500, {}, errorMessage.internalServer, err.message);
            }
        }
    
    export let getAllUser = async (req, res, next) => {
       
            try {
           
           const dataDate=await Doctor.find({isDeleted:false})
                response(req, res, activity, 'Level-3', 'getAllUser-User', true, 200, dataDate, clientError.success.fetchedSuccessfully);
            } catch (err: any) {
                response(req, res, activity, 'Level-3', 'getAllUser-User', false, 500, {}, errorMessage.internalServer, err.message);
            }
        }


    export let deleteUser= async (req, res, next) => {
      
            try {
           const dataDate=await Doctor.findByIdAndUpdate({_id:req.body.id},{$set:{isDeleted:true}})
                response(req, res, activity, 'Level-3', 'deleteUser-User', true, 200, dataDate, clientError.success.fetchedSuccessfully);
            } catch (err: any) {
                response(req, res, activity, 'Level-3', 'deleteUser-User', false, 500, {}, errorMessage.internalServer, err.message);
            }
        }
    



    export let filter = async (req, res, next) => {
       
        try {
       
       const dataDate=await Doctor.find({isDeleted:false},{email:1,doctorName:1})
            response(req, res, activity, 'Level-3', 'getAllUser-User', true, 200, dataDate, clientError.success.fetchedSuccessfully);
        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'getAllUser-User', false, 500, {}, errorMessage.internalServer, err.message);
        }
    }
