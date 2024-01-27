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
            const user = await User.findOne({_id:req.body.userId})
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
             address:userDetails.address,
             city:userDetails.city,
             state:userDetails.state,
             pincode:userDetails.pincode,
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
            const userdelete = await User.updateOne({_id:req.body.userId},{
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
             const user = await User.updateOne({ _id: userDetails.userId }, { $push: { blockeduser:userDetails.blockeduser } })
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
            const remainingPosts = await Post.find({$and:[{$nin:user.blockeduser},{isDeleted:false}]})
            response(req, res, activity, 'Level-2', 'update-user', true, 200, remainingPosts, clientError.success.fetchedSuccessfully);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'update-user', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'update-user', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
} 


/**
 * @author kaaviyan 
 * @date 13-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is for follow.
 */
export let follow = async(req, res, next) =>{
    try{
        const follower = await User.findByIdAndUpdate({_id:req.body.userId},{$push:{follower:req.body.follow},$inc:{followersCount:1}})

        response(req, res, activity, 'Level-2', 'User-follow', true, 200, follower , clientError.success.updateSuccess);
    }catch(err){
        response(req, res, activity, 'Level-3', 'User-follow', false, 500, {}, errorMessage.internalServer, err.message);   
    }
}

/**
 * @author kaaviyan 
 * @date 13-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is for unfollow.
 */
export let unfollow = async(req, res, next) =>{
    try{
        const unfollow = await User.findByIdAndUpdate({_id:req.body.userId},{$pull:{followers:req.body.follow},$inc:{followersCount:-1}})
        response(req, res, activity, 'Level-2', 'User-unfollow', true, 200, unfollow , clientError.success.updateSuccess);
    }catch(err){
        response(req, res, activity, 'Level-3', 'User-unfollow', false, 500, {}, errorMessage.internalServer, err.message);   
    }
}



/**
 * @author kaaviyan 
 * @date 19-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is for follower details.
 */


export let userFollowersDetail = async (req, res, next) => {
    try {
        const userDetails: UserDocument = req.body;
        const findFollower = await User.findOne({ _id:userDetails.userId }).populate('follower',{userName:1,email:1,mobileNumber:1})
        
         response(req, res, activity, 'Level-2', 'Save-Company', true, 200, findFollower, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Save-Company', false, 500, {}, errorMessage.internalServer, err.message);
    }
} 


/**
 * @author kaaviyan 
 * @date 20-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is for following.
 */
export let following = async(req, res, next) =>{
    try{
        const follower = await User.findByIdAndUpdate({_id:req.body.userId},{$push:{following:req.body.followId}})

        response(req, res, activity, 'Level-2', 'User-follow', true, 200, follower , clientError.success.updateSuccess);
    }catch(err){
        response(req, res, activity, 'Level-3', 'User-follow', false, 500, {}, errorMessage.internalServer, err.message);   
    }
}

/**
 * @author kaaviyan 
 * @date 20-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is for savepost.
 */
export let savepost = async(req, res, next) =>{
    try{
        const follower = await User.findByIdAndUpdate({_id:req.body.userId},{$push:{savePost:req.body.postId}})

        response(req, res, activity, 'Level-2', 'User-follow', true, 200, follower , clientError.success.updateSuccess);
    }catch(err){
        response(req, res, activity, 'Level-3', 'User-follow', false, 500, {}, errorMessage.internalServer, err.message);   
    }
}

/**
 * @author kaaviyan 
 * @date 20-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is for unsavepost.
 */
export let unsavepost = async(req, res, next) =>{
    try{
        const follower = await User.findByIdAndUpdate({_id:req.body.userId},{$pull:{savePost:req.body.postId}})

        response(req, res, activity, 'Level-2', 'User-follow', true, 200, follower , clientError.success.updateSuccess);
    }catch(err){
        response(req, res, activity, 'Level-3', 'User-follow', false, 500, {}, errorMessage.internalServer, err.message);   
    }
}

/**
 * @author kaaviyan 
 * @date 20-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is for dashboard.
 */
export let userDashBoard = async(req, res, next) =>{
    try{
        const userDetails: UserDocument = req.body;
        const data  = await User.findOne({_id:userDetails.userId},{userName:1,follower:1,followersCount:1,postCount:1,DOB:1,_id:0})
        response(req, res, activity, 'Level-2', 'User-follow', true, 200, data , clientError.success.fetchedSuccessfully);
    }catch(err){
        response(req, res, activity, 'Level-3', 'User-follow', false, 500, {}, errorMessage.internalServer, err.message);   
    }
}