import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response, generate } from "../helper/commonResponseHandler";
import {User, UserDocument} from "../model/user.model";
import {Advertiser, AdvertiserDocument } from "../model/advertiser.model";
import * as TokenManager from "../utils/tokenManager";

var activity = "Advertiser"

/**
 * @author Kaaviyan 
 * @date 19-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to create Advertiser.
 */

// 11.create Advertiser

export let saveAdvertiser = async(req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const advertiserData = await Advertiser.findOne({ $and: [{ isDeleted: false }, { mobileNumber: req.body.mobileNumber }] })
            const usersData = await User.findOne({ $and: [{ isDeleted: false }, { mobileNumber: req.body.mobileNumber }] })
            if (!advertiserData && !usersData) {
                const advertiserDetails : AdvertiserDocument  = req.body;
                let otp = Math.floor(1000 + Math.random() * 9000);
                advertiserDetails.otp = otp ;
                const createData = new Advertiser(advertiserDetails);
                let insertData = await createData.save();
                const token = await TokenManager.CreateJWTToken({
                    id: insertData["_id"],
                    name: insertData["advName"],
                });
                const result = {}
                result['_id'] = insertData._id;
                result['name'] = insertData.companyName;
                result['advName'] = insertData.advertiserName;
                result['mobileNumber'] = insertData.mobileNumber;
                result['otp'] = otp
                let finalResult = {};
                finalResult['loginType'] = 'advertiser';
                finalResult['advertiserDetails'] = result;
                finalResult['token'] = token;        
                response(req, res, activity, 'Level-2', 'Save-Advertisers', true, 200, finalResult , clientError.success.registerSuccessfully); 
            } else {
                response(req, res, activity, 'Level-3', 'Save-Advertisers', true, 422, {}, clientError.mobile.mobileExist);
            }
        } catch (err) {
            response(req, res, activity, 'Level-3', 'Save-Advertisers', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Save-Advertisers ', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}


/**
 * @author Kaaviyan
 * @date 19-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to update  profile  .
 */ 

//  update Advertiser profile  

export let updateAdd = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const advertiserDetails: AdvertiserDocument = req.body; 
            const data = await Advertiser.updateMany({_id:advertiserDetails._id},{
                $set:{
                    companyId:advertiserDetails.companyId,
                    companyName:advertiserDetails.companyName,
                    productDetails:advertiserDetails.productDetails
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
 * @author kaaviyan 
 * @date 19-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is for follow.
 */

// 11.followers

export let followers = async(req, res, next) =>{
    try{
        const userDetails: UserDocument = req.body;

        const follower = await Advertiser.findByIdAndUpdate({_id:req.body.advertiserId},{$push:{followers:req.body.userId},$inc:{followersCount:1}})

        const showfollow = await Advertiser.find({_id:req.body.id},{followers:1,_id:0})

        response(req, res, activity, 'Level-2', 'User-follow', true, 200, showfollow , clientError.success.updateSuccess);
    }catch(err){
        response(req, res, activity, 'Level-3', 'User-follow', false, 500, {}, errorMessage.internalServer, err.message);   
    }
}

/**
 * @author kaaviyan 
 * @date 19-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is for unfollow.
 */



export let unfollowuser = async(req, res, next) =>{
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
 * @description This Function is for following user.
 */


export let followingUser = async(req, res, next) =>{
    try{
        const unfollow = await User.findByIdAndUpdate({_id:req.body.userId},{$push:{following:req.body.followid}})
        response(req, res, activity, 'Level-2', 'following', true, 200, unfollow , clientError.success.updateSuccess);
    }catch(err){
        response(req, res, activity, 'Level-3', 'following', false, 500, {}, errorMessage.internalServer, err.message);   
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


export let followersdetail = async (req, res, next) => {
    try {
        const advertiserDetails: AdvertiserDocument = req.body;
     const findFollower = await Advertiser.findOne({ _id:req.body.advertiserId }).populate("followers",{userName:1,email:1,mobileNumber:1})
        
         response(req, res, activity, 'Level-2', 'Save-Company', true, 200, findFollower, clientError.success.updateSuccess);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Save-Company', false, 500, {}, errorMessage.internalServer, err.message);
    }
} 