import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response, generate } from "../helper/commonResponseHandler";
import {User, UserDocument } from "../model/user.model";
import { videoAd, videoDocument } from "../model/videoAd.model";
import * as TokenManager from "../utils/tokenManager";


var activity = "videoAd"

/**
 * @author Kaaviyan
 * @date 20-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to create video post.
 */

export let savePost = async(req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const userData = await User.findOne({ $and: [{ isDeleted: false }, { _id:req.body.userId }]})
            if (userData) {
                const postDetails : videoDocument  = req.body;
                userData._id = postDetails.advertiserId
                const createData = new videoAd(postDetails);
                let insertData = await createData.save();
                const token = await TokenManager.CreateJWTToken({
                    id: insertData["_id"],
                    name: insertData["postUrl"],
                });
                const result = {}
                result['_id'] = insertData._id;
                result['title'] = insertData.title;
                result['description'] = insertData.description;
                result['advertisertId'] = insertData.advertiserId;
                let finalResult = {};
                finalResult['postDetails'] = result;
                finalResult['token'] = token;        
                const count = await User.updateOne({_id:req.body.userId },{$inc:{postCount:1}})
                response(req, res, activity, 'Level-2', 'Save-Post', true, 200, finalResult , clientError.success.registerSuccessfully); 
            } else {
                response(req, res, activity, 'Level-3', 'Save-Post', true, 422, {}, clientError.user.userExist);
            }
        } catch (err) {
            response(req, res, activity, 'Level-3', 'Save-Post', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Save-Post ', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}


/**
 * @author Kaaviyan
 * @date 20-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to update post fields.
 */
export let updatePost = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
    try{
            const postData = await videoAd.findOne({ $and: [{ isDeleted: false }, { _id: req.body.postId }] })
            if(postData){
                const postDetails : videoDocument  = req.body;
        const imgData = await videoAd.updateOne({_id:req.body.postId},{$set:{ category: postDetails.category}})
          response(req, res, activity, 'Level-2', 'Update-Post', true, 200, imgData, clientError.success.updateSuccess);
    }
    else {
        response(req, res, activity, 'Level-3', 'Update-Post', true, 422, {}, clientError.post.postnotExist);
    }
}
    catch(err){
        response(req, res, activity, 'Level-3', 'Update-Post', false, 500, {}, errorMessage.internalServer, err.message);
        }
    }
    else {
        response(req, res, activity, 'Level-3', 'Update-Post ', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}

/**
 * @author Kaaviyan
 * @date 20-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to find single post.
 */
export let singleVideoPost = async( req, res, next ) =>{
    try {
            const single = await videoAd.findOne({ $and: [{ isDeleted: false }, { _id: req.body.postId }] })
            if (single) {
                response(req, res, activity, 'Level-2', 'Fetch-Post', true, 200, single, clientError.success.fetchedSuccessfully);
            } else {
                response(req, res, activity, 'Level-3', 'Fetch-Post', true, 422, {}, clientError.post.postnotExist);
            }
            } 
    catch (err) {
            response(req, res, activity, 'Level-3', 'Fetch-Post', false, 500, {}, errorMessage.internalServer, err.message);
    }
}

/**
 * @author Kaaviyan
 * @date 20-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to find all post.
 */
export let allVideoPost = async( req, res, next) =>{
    try{

    const all = await videoAd.find({isDeleted:false})
    response(req, res, activity, 'Level-2', 'Fetch-Posts', true, 200, all, clientError.success.fetchedSuccessfully);
}
catch(err){
    response(req, res, activity, 'Level-3', 'Fetch-Posts', false, 500, {}, errorMessage.internalServer, err.message);
}
}


/**
 * @author Kaaviyan
 * @date 20-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to delete post.
 */
export let deleteVideoPost = async( req, res, next) =>{
    try {
         const delPost = await videoAd.findByIdAndUpdate({_id:req.body.postId},{$set:{isDeleted:true}})
           response(req, res, activity, 'Level-2', 'Delete-Post', true, 200, delPost , clientError.success.updateSuccess);
         } catch (err) {
         response(req, res, activity, 'Level-3', 'Delete-Post', false, 500, {}, errorMessage.internalServer, err.message);
     }
 } 

 /**
 * @author Kaaviyan
 * @date 20-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is for likes.
 */
export let videoLikes = async(req, res, next) =>{
    try{
        
        const  data = await videoAd.updateMany({_id:req.body.postId},{$inc:{likeCount:1},$push:{likes:req.body.userId}})   

        response(req, res, activity, 'Level-2', 'Post-likes', true, 200, data , clientError.success.updateSuccess);
    }catch(err){
        response(req, res, activity, 'Level-3', 'Post-likes', false, 500, {}, errorMessage.internalServer, err.message);   
    }
}

 /**
 * @author Kaaviyan
 * @date 20-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is for unlikes.
 */
 export let unLikesPost = async(req, res, next) =>{
    try{
        
        const  data = await videoAd.updateMany({_id:req.body.postId},{$inc:{likeCount:-1},$pull:{likes:req.body.userId}})   

        response(req, res, activity, 'Level-2', 'Post-likes', true, 200, data , clientError.success.updateSuccess);
    }catch(err){
        response(req, res, activity, 'Level-3', 'Post-likes', false, 500, {}, errorMessage.internalServer, err.message);   
    }
}


 /**
 * @author Kaaviyan
 * @date 20-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is for report.
 */
export let report = async (req, res, next) => {
   
    try {
            
            const  data = await videoAd.findByIdAndUpdate({_id:req.body.postId},{$inc:{report:1}})   
            if (data.report===15) {
                const user = await videoAd.findByIdAndUpdate({_id:req.body.postId},{$set:{status:2,isDeleted:true}})
                response(req, res, activity, 'Level-2', 'Save-Company', true, 200, user, clientError.success.deleteSuccess);
            } else {
                response(req,res,activity,'Level-2','report',true,200,data,clientError.account.report)
            }
            response(req, res, activity, 'Level-2', 'Save-Company', true, 200, data, clientError.success.deleteSuccess);
        }
     catch (err: any) {
        //  response(req, res, activity, 'Level-3', 'Save-Company', false, 500, {}, errorMessage.internalServer, err.message);
    }
}


 /**
 * @author Kaaviyan
 * @date 20-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is for report.
 */
export let showreport = async (req, res, next) => {
   
    try {
            
            const  data = await videoAd.find({$and:[{isDeleted:true},{status:2}]})  
         
            response(req, res, activity, 'Level-2', 'Save-Company',true, 200, data, clientError.success.registerSuccessfully);
        }
     catch (err: any) {
        response(req, res, activity, 'Level-3', 'Save-Company', false, 500, {}, errorMessage.internalServer, err.message);
     }
    } 
    

 /**
 * @author Kaaviyan
 * @date 20-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is for create comment.
 */


 export let videoComment = async (req, res, next) => {
   
    try {
        const userDetails:UserDocument= req.body;
        const user = await User.findOne({_id:userDetails.userId},{userName:1,_id:0})
        console.log(user);
                
        const  data = await videoAd.findByIdAndUpdate({_id:req.body.postId},{$push:{comments:[{comment:req.body.comment, name:user.userName}]}})   
        response(req, res, activity, 'Level-2', 'Save-Company', true, 200, data, clientError.success.updateSuccess);
        }
     catch (err: any) {
        response(req, res, activity, 'Level-3', 'Save-Company', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } 

 
 /**
 * @author Kaaviyan
 * @date 20-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is for delete comment.
 */


 export let deleteVideoComment = async (req, res, next) => {
   
    try {
        const userDetails:UserDocument= req.body;
        const user = await User.findOne({_id:userDetails.userId},{userName:1,_id:0})
        console.log(user);
                
        const  data = await videoAd.findByIdAndUpdate({_id:req.body.postId},{$push:{comments:[{comment:req.body.comment, name:user.userName}]}})   
        response(req, res, activity, 'Level-2', 'Save-Company', true, 200, data, clientError.success.updateSuccess);
        }
     catch (err: any) {
        response(req, res, activity, 'Level-3', 'Save-Company', false, 500, {}, errorMessage.internalServer, err.message);
        }
    }    