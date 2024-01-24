import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response } from "../helper/commonResponseHandler";
import { contact, ContactDocument } from "../model/contact.model";
4
var activity ='contact'

 /**
 * @author Kaaviyan
 * @date 20-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to create contact.
 */

 export let contactdetails = async (req, res, next) => {
    try {
        const dates = new Date()
        const contactDetails: ContactDocument = req.body;
        const createdate = new contact(contactDetails);
        let insertData = await createdate.save();
        const result ={}
        result['_id']= insertData._id;
        result["name"]=insertData.name; 
        result["mobile"] =insertData.phoneNumber;
        result["email"]=insertData.email;
        let finalResult ={}; 
        finalResult["ContactDetails"]=result;        
        response(req, res, activity, 'Level-2', 'contact-details', true, 200, result, clientError.success.registerSuccessfully);
    }
 catch (err: any) {
    response(req, res, activity, 'Level-3', 'contact-details', false, 500, {}, errorMessage.internalServer, err.message);
}
} 

 /**
 * @author Kaaviyan
 * @date 20-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is for get All details.
 */

export let getDetails = async (req, res, next) => {
    try {
        
        const contactDetails: ContactDocument = req.body;
        const data = await contact.find({isDeleted:false})
        response(req, res, activity, 'Level-2', 'get-details', true, 200, data, clientError.success.registerSuccessfully);
    }
 catch (err: any) {
    response(req, res, activity, 'Level-3', 'get-details', false, 500, {}, errorMessage.internalServer, err.message);
}
} 


 /**
 * @author Kaaviyan
 * @date 20-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is for get single details.
 */

export let getSingleDetails = async (req, res, next) => {
    try {
        
        const contactDetails: ContactDocument = req.body;
        const data = await contact.findOne({_id:req.body.id})
        response(req, res, activity, 'Level-2', 'get-single-details', true, 200, data, clientError.success.registerSuccessfully);
    }
 catch (err: any) {
    response(req, res, activity, 'Level-3', 'get-single-details', false, 500, {}, errorMessage.internalServer, err.message);
}
} 



 /**
 * @author Kaaviyan
 * @date 20-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is for delete details.
 */

 export let deleteDetails = async (req, res, next) => {
    try {
        
        const contactDetails: ContactDocument = req.body;
        const data = await contact.findByIdAndUpdate({_id:req.body._id},{$set:{isDeleted:true,modifiedOn:new Date()}})
        response(req, res, activity, 'Level-2', 'get-delete-details', true, 200, data, clientError.success.updateSuccess);
    }
 catch (err: any) {
    response(req, res, activity, 'Level-3', 'get-delete-details', false, 500, {}, errorMessage.internalServer, err.message);
}
} 


/**
 * @author Kaaviyan
 * @date 20-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get filter details  .
 */ 

//  user filter contact 


export let getFilteredContact = async (req, res, next) => {
    try{
    var findQuery;
    var andList: any = []
    var limit = req.body.limit ? req.body.limit : 0;
    var page = req.body.page ? req.body.page : 0;
    andList.push({isDeleted:false})
    andList.push({status:1})

    findQuery =(andList.length > 0) ? { $and: andList } : {}
    var contactList = await contact.find(findQuery).sort({ name: -1 }).limit(limit).skip(page)
    var contactCount = await contact.find(findQuery).count()
    response(req, res, activity, 'Level-1', 'Get-FilterUser', true, 200, { contactList, contactCount }, clientError.success.fetchedSuccessfully);
}
    catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-FilterUser', false, 500, {}, errorMessage.internalServer, err.message);
    }   
}


/**
 * @author Kaaviyan
 * @date 24-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to update  user  .
 */ 

// get update contact 

export let updateContact = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const contactDetails: ContactDocument = req.body;
            const data = await contact.findByIdAndUpdate({_id:contactDetails._id},{$set:{
                location:contactDetails.location,
                description:contactDetails.description                              
        }})
           
            response(req, res, activity, 'Level-2', 'update-user', true, 200, data, clientError.success.updateSuccess);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'update-user', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'update-user', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
} 