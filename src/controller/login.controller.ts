
import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response, sendEmailOtp } from "../helper/commonResponseHandler";
import { User, UserDocument } from "../model/user.model";
import * as TokenManager from "../utils/tokenManager";


var activity = "login";

export let loginEmail = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
      try {
          const userDetails: UserDocument = req.body;
          const result = await User.findOne({ $and: [{ isDeleted: false }, { email:userDetails.email }] })
          if (result) {
            const otp = Math.floor(1000 + Math.random() * 9000);
             sendEmailOtp(userDetails.email,otp) 
             const user = await User.updateOne({_id:req.body._id}, { $set: { otp: userDetails.otp } })
                  const token = await TokenManager.CreateJWTToken({
                      id: result["_id"],
                      name: result["username"],
                  
                  });
                  const details = {}
                  details['_id'] = result._id
                  details['userName'] = result.userName;
                  details['userEmail'] = result.email;
                  details['userMobile'] = result.mobileNumber;
                  let finalResult = {};
                  finalResult["loginType"] = 'user';
                  finalResult["userDetails"] = details;
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


