import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { generate, response, sendEmailOtp } from "../helper/commonResponseHandler";
import { supportAgent, supportDocument } from "../model/supportAgent.model";



var activity = 'support';

/**
 * @author kaaviyan S
 * @date  28-12-2023
 * @param {Object} req bsx
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to create support Agent.
 */


// 1. create api 
export let createCustomerServiceAgent = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const data = await supportAgent.findOne({ $and: [{ isDeleted: false }, { email: req.body.email }] });
            if (!data) {
                const supportDetails: supportDocument = req.body;
                const createData = new supportAgent(supportDetails);
                let insertData = await createData.save();
                 response(req, res, activity, 'Level-2', 'customer-service', true, 200, insertData, clientError.success.registerSuccessfully);
                } else {
                    response(req, res, activity, 'Level-3', 'customer-service', true, 422, {},clientError.email.emailNotVerified);
                }
            }
         catch (err: any) {
            response(req, res, activity, 'Level-3', 'customer-service', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'customer-service', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}
