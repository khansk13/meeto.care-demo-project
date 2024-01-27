import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response } from "../helper/commonResponseHandler";
import * as TokenManager from "../utils/tokenManager";
import { hashPassword } from "../helper/Encryption";
import { User, UserDocument } from "../model/user.model";
import { Post, PostDocument } from "../model/post.model";
import { ticketRaise, ticketDocumnet } from "../model/ticketraise.model";
import shortid = require("shortid");

import path = require("path");


var activity = 'Ticket';

/**
 * @author kaaviyan S
 * @date  28-12-2023
 * @param {Object} req bsx
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to un save post.
 */



export let saveCompanyId = async (req, res, next) => {
    try {
        const ticketDetails: ticketDocumnet = req.body;
        const createData = new User(ticketDetails);
        const code = await createData.save();
         response(req, res, activity, 'Level-2', 'Save-Company', true, 200, code, clientError.success.updateSuccess);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Save-Company', false, 500, {}, errorMessage.internalServer, err.message);
    }
} 

export let createTicket = async (req, res, next) => {
    try {
        const userDetails: UserDocument = req.body;
        const ticketDetails: UserDocument = req.body;
        const createData = new User(ticketDetails);
        const data = await User.findOne({_id:userDetails.userId},{userName:1})
        console.log(data);
        const generateid =  Math.floor(100000000 + Math.random() * 99999999999999);
        const user = await ticketRaise.updateMany({_id:req.body._id},{$push:{ticketRaise:[{name:data.userName,ticketId:generateid,questions:req.body.question}]}})
         response(req, res, activity, 'Level-2', 'Save-Company', true, 200, user, clientError.success.updateSuccess);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Save-Company', false, 500, {}, errorMessage.internalServer, err.message);
    }
} 
