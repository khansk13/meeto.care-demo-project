import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response } from "../helper/commonResponseHandler";
import { userData, userDataDocument } from "../model/userdata.model";
import * as TokenManager from "../utils/tokenManager";
import { encrypt, hashPassword } from "../helper/Encryption";

var activity = "userData"
/**
 * @author Ponjothi S
 * @date 07-09-2023
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to create Company.
 */
export let saveCompany = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const companyData = await userData.findOne({ $and: [{ isDeleted: false }, { email: req.body.email }] });
            if (!companyData) {
                req.body.password = await hashPassword(req.body.password)
                const userDataDetails: userDataDocument = req.body;
                const createData = new userData(userDataDetails);
                let insertData = await createData.save();
                const token = await TokenManager.CreateJWTToken({
                    companyId: insertData["_id"],
                    companyName: insertData["name"],
                });
                const result = {}
                result['_id'] = insertData._id
                result['sign up'] = insertData.name;


                let finalResult = {};
                finalResult["sign up"] = 'company';
                finalResult["user details"] = result;
                finalResult["token"] = token;
                response(req, res, activity, 'Level-2', 'Save-Company', true, 200, finalResult, clientError.success.registerSuccessfully);
            }
            else {
                response(req, res, activity, 'Level-3', 'Save-Company', true, 422, {}, 'Email already registered');
            }

        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Save-Company', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Save-Company', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};

const resetPassword = async (req, res) => {
    try {
        const user1 = await userData.findOne({ _id: req.body.id }, { password: 1, _id: 0 })
        console.log(user1);
        if(user1){

            }
            else {
                res.json("previous password is wrong")
            }
       
        
    }
       catch (err) {
        // response(req, res, activity, 'Level-3', 'Save-Company', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
       }
    }