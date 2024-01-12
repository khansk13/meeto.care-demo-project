import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { generate, response, sendEmailOtp } from "../helper/commonResponseHandler";
import * as TokenManager from "../utils/tokenManager";
import { User, UserDocument } from "../model/user.model";

import { Post, PostDocument } from "../model/post.model";


var activity = "user"

/**
 * @author Kaaviyan
 * @date 08-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to create user list .
 */ 

// 1. create api 
export let userProfile = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const userData = await User.findOne({ $and: [{ isDeleted: false }, { email: req.body.email }] });
            if (!userData) {
                let date = new Date();
                const userDetails: UserDocument = req.body;
                userDetails.myReferralCode = generate(5);  
                const userotp =   Math.floor(1000 + Math.random() * 9999);
                userDetails.otp = userotp ;
                const createData = new User(userDetails);
                let insertData = await createData.save();
                userDetails.createdOn = date ; 
                const token = await TokenManager.CreateJWTToken({
                    id: insertData["_id"],
                    name: insertData["name"],
                 });
                const result = {}
                result['_id'] = insertData._id
                result['userName'] = insertData.userName;
                result['email'] = insertData.email;
                result['mobileNumber'] = insertData.mobileNumber;
                let finalResult = {};
                finalResult["SignUp"] = 'User';
                finalResult["UserDetails"] = result;
                finalResult["token"] = token;
                sendEmailOtp(insertData.email,insertData.otp)
                response(req, res, activity, 'Level-2', 'User-Profile', true, 200, result, clientError.success.registerSuccessfully);
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
 * @description This Function is used to get all user  .
 */ 

// 2. all user  api 

export let getDetails = async (req, res, next) => {
        try {
            
            const user = await User.find({isDeleted:false})
            response(req, res, activity, 'Level-2', 'get-Details', true, 200, user, clientError.success.fetchedSuccessfully);
        
            }    catch (err: any) {
            response(req, res, activity, 'Level-3', 'get-Details', false, 500, {}, errorMessage.internalServer, err.message);
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
        try {
            const user = await User.findOne({_id:req.body._id})
            response(req, res, activity, 'Level-2', 'get-Single-Details', true, 200, user, clientError.success.fetchedSuccessfully);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'get-Single-Details', false, 500, {}, errorMessage.internalServer, err.message);
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
            const userDetails: UserDocument = req.body; 
            const data = await User.findByIdAndUpdate({_id:userDetails.userId},{$set:{
             DOB:userDetails.DOB,
             bankDetails:userDetails.bankDetails,
             modifiedOn:new Date(),
             modifiedBy:userDetails.modifiedBy
            }                                     
            })
           
            response(req, res, activity, 'Level-2', 'update-user', true, 200, data, clientError.success.updateSuccess);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'update-user', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'update-user', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
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
        try {
            const {modifiedOn, modifiedBy} = req.body
            const userdelete = await User.updateOne({_id:req.body._id},{
                $set:{
                    isDeleted:true,
                    modifiedOn,
                    modifiedBy
                }})
            response(req, res, activity, 'Level-2', 'delete-user', true, 200, userdelete, clientError.success.deleteSuccess);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'delete-user', false, 500, {}, errorMessage.internalServer, err.message);
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


export let getFilteredUser = async (req, res, next) => {
    try{
    var findQuery;
    var andList: any = []
    var limit = req.body.limit ? req.body.limit : 0;
    var page = req.body.page ? req.body.page : 0;
    andList.push({isDeleted:false})
    andList.push({status:1})
    if (req.body.email) {
        andList.push({ email: req.body.email })
    }
    if (req.body.userName) {
        andList.push({ name: req.body.userName })
    }
    if (req.body.mobileNumber) {
        andList.push({ mobileNumber: req.body.mobileNumber })
    }
    findQuery =(andList.length > 0) ? { $and: andList } : {}
    var userList = await User.find(findQuery).sort({ createdOn: -1 }).limit(limit).skip(page)
    var userCount = await User.find(findQuery).count()
    response(req, res, activity, 'Level-1', 'Get-FilterUser', true, 200, { userList, userCount }, clientError.success.fetchedSuccessfully);
}
    catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-FilterUser', false, 500, {}, errorMessage.internalServer, err.message);
    }   
}

/**
 * @author Kaaviyan
 * @date 09-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to blocked user  .
 */ 

// 7. blocked user user api 

export let Blockeduser = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const userDetails: UserDocument = req.body;
             const user = await User.updateOne({ _id: userDetails._id }, { $push: { blockeduser:userDetails.blockeduser } })
            response(req, res, activity, 'Level-2', 'update-user', true, 200, user, clientError.account.inActive);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'update-user', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'update-user', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
} 


/**
 * @author Kaaviyan
 * @date 09-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to feed page  user  .
 */ 

// 7.  user feed page api 

export let feedpage = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const userDetails: UserDocument = req.body;
            const PostDetails: PostDocument = req.body;
            const user = await User.findOne({ _id: userDetails.userId },{blockeduser:1,_id:1})
            console.log(user);
            const blockeduser= user.blockeduser
            const userpost = await Post.find({$and:[{$nin:blockeduser},{isdelete:false}]})
            response(req, res, activity, 'Level-2', 'update-user', true, 200, userpost, clientError.success.fetchedSuccessfully);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'update-user', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'update-user', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
} 