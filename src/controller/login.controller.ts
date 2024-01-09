import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response, sendEmailOtp } from "../helper/commonResponseHandler";
import { loginUser, loginUserDocument } from "../model/login.model";
import { Doctor, DoctorDocument } from "../model/doctor.model";
import * as TokenManager from "../utils/tokenManager";
import * as nodemailer from "nodemailer";
import { Hash, verify } from "crypto";
import { openStdin } from "process";


var activity = "User";

export let loginEmail = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
      try {
          let { email ,password,otp} = req.body;
          const result = await Doctor.findOne({ $and: [{ isDeleted: false }, { email:email }] })
          if (result) {
        
            const otp = Math.floor(1000 + Math.random() * 9000);
            // result.otp=otp
            const user = await Doctor.updateOne({_id:req.body._id}, { $set: { otp: otp } })
          
             sendEmailOtp(  req.body.email,otp) 
                  const token = await TokenManager.CreateJWTToken({
                      doctorId: result["_id"],
                      doctorName: result["doctorName"],
                  
                  });
                  const details = {}
                  details['_id'] = result._id
                  details['doctorName'] = result.doctorName;
                  let finalResult = {};
                  finalResult["loginType"] = 'company';
                  finalResult["doctorDetails"] = details;
                  finalResult["token"] = token;
                  response(req, res, activity, 'Level-2', 'Login-Email', true, 200, finalResult, clientError.otp.otpSent);
                }
                else{
                response(req, res, activity, 'Level-2', 'Login-Email', true, 200,{}, clientError.user.UserNotFound);

          }
         
      } catch (err: any) {
          response(req, res, activity, 'Level-3', 'Login-Email', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
      }
  }

}

//verifyotp
export let verificationEmail = async (req,res,next) =>{
  const errors = validationResult(req);
  if (errors.isEmpty()) {
      try {
       
        const defin = await Doctor.findOne({ $and: [{ isDeleted: false }, { email:req.body.email }] })
        if (defin) {
          const dataDate=await Doctor.findOne({_id:req.body._id},{otp:1})
           if (dataDate.otp == req.body.otp) {

              response(req, res, activity, 'Level-2', 'verify-otp', true, 200,dataDate, clientError.otp.otpVerifySuccess);
          }
          else {
              response(req, res, activity, 'Level-3', 'verify-otp', false, 403, {}, clientError.otp.otpDoestMatch);
        }
        }
          else{
            response(req, res, activity, 'Level-2', 'Login-Email', true, 200,{}, clientError.user.UserNotFound);
      }
    } catch (err: any) {
      response(req, res, activity, 'Level-3', 'Verify-LoginOtp', false, 500, {}, errorMessage.internalServer, err.message);
  }
} else {
  response(req, res, activity, 'Level-3', 'Verify-LoginOtp', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
  }
};
    

