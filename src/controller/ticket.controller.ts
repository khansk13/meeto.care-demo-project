import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { generate, response, sendEmailOtp } from "../helper/commonResponseHandler";
import * as TokenManager from "../utils/tokenManager";
import { hashPassword } from "../helper/Encryption";
import { User, UserDocument } from "../model/user.model";
import { Post, PostDocument } from "../model/post.model";
import { ticketRaise, ticketDocumnet } from "../model/ticketraise.model";
import shortid = require("shortid");

import path = require("path");
import { supportAgent } from "../model/supportAgent.model";


var activity = 'Ticket';

/**
 * @author kaaviyan S
 * @date  28-12-2023
 * @param {Object} req bsx
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to create ticket.
 */


// 1. create api 
export let createTicket = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const userData = await User.findOne({ $and: [{ isDeleted: false }, { email: req.body.email }] });
            console.log(userData.userName);
            if (userData) {
                let date = new Date();
                const TicketDetails: ticketDocumnet = req.body;
                const generateId = generate(6);
                TicketDetails.ticketId = generateId
                TicketDetails.name= userData.userName ;
                const createData = new ticketRaise(TicketDetails);
                let insertData = await createData.save();
                 response(req, res, activity, 'Level-2', 'User-Profile', true, 200, insertData, clientError.success.registerSuccessfully);
                } else {
                    response(req, res, activity, 'Level-3', 'User-Profile', true, 422, {},clientError.email.emailNotVerified);
                }
            }
         catch (err: any) {
            response(req, res, activity, 'Level-3', 'User-Profile', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'User-Profile', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
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


// 4. Update ticket

export let updateTicket = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const TicketDetails: ticketDocumnet = req.body; 
            const data = await supportAgent.findOne({_id:req.body._id},{serviceAgentName:1,_id:0})
            console.log(data);
            if (data) {
                const data1 = await ticketRaise.updateMany({_id:req.body.ticketid},{$set:{
                    answers:TicketDetails.answers,
                    modifiedOn:new Date(),
                    agentName:data.serviceAgentName,         
              }})
              
            response(req, res, activity, 'Level-2', 'update-ticket', true, 200, data1, clientError.success.updateSuccess);
   
            } else {
                response(req, res, activity, 'Level-2', 'update-ticket', false, 422, {}, clientError.user.UserNotFound); 
            }
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'update-ticket', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'update-ticket', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
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


// 4. Update ticket

export let deleteTicket = async (req, res, next) => {
        try {
            const TicketDetails: ticketDocumnet = req.body; 
            const data = await ticketRaise.findOne({_id:req.body._id},{answers:1,_id:0})
            console.log(data);
            if (data) {
                const data1 = await ticketRaise.updateOne({_id:req.body.ticketid},{$set:{satisfied:TicketDetails.satisfied}})
            }
               else if(TicketDetails.satisfied===true){
                const data1 = await ticketRaise.updateOne({_id:req.body.ticketid},{$set:{
                    questions:TicketDetails.questions
                }})
               }
               else if(TicketDetails.satisfied===false){
                const data1 = await ticketRaise.updateOne({_id:req.body.ticketid},{$set:{
                        isDeleted:true,
                        messages:"your ticket will be closed"
                     }})
                    }
            else {
                response(req, res, activity, 'Level-2', 'delete-ticket', true, 200, {}, clientError.success.updateSuccess);
 
            }
        } catch (err:any) {
            response(req, res, activity, 'Level-3', 'delete-ticket', false, 500, {}, errorMessage.internalServer, err.message);
        }
} 
