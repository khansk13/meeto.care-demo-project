import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response, generate } from "../helper/commonResponseHandler";
import {Advertiser, AdvertiserDocument } from "../model/advertiser.model";
import { imageAd, imageDocument } from "../model/imageAd.model";
import * as TokenManager from "../utils/tokenManager";
import { User, UserDocument } from '../model/user.model';

var activity = "ImageAd"

/**
 * @author Kaaviyan
 * @date 20-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to create Post.
 */

export let savePost = async(req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const advertiserDetails: AdvertiserDocument = req.body;
            const userDetails: UserDocument = req.body;
            const userData = await User.findOne({ $and: [{ isDeleted: false }, { _id:userDetails.userId }]})
            if (userData) {
                const postDetails : imageDocument  = req.body;
                userData._id= postDetails.userId;
                const createData = new imageAd(postDetails);
                let insertData = await createData.save();
                const token = await TokenManager.CreateJWTToken({
                    id: insertData["_id"],
                    name: insertData["postUrl"],
                });
                const result = {}
                result['_id'] = insertData._id;
                result['title'] = insertData.title;
                result['description'] = insertData.description;
                result['advertiserId'] = insertData.advertiserId;
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
 * @author kaaviyan
 * @date 20-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to find single post.
 */

export let singleImagePost = async( req, res, next ) =>{
    try {
            const single = await imageAd.findOne({ $and: [{ isDeleted: false }, { _id: req.body.id }] })
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
 * @date 19-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to find all post.
 */

export let allImagePost = async( req, res, next) =>{
    try{

    const all = await imageAd.find({isDeleted:false})
    response(req, res, activity, 'Level-2', 'Fetch-Posts', true, 200, all, clientError.success.fetchedSuccessfully);
}
catch(err){
    response(req, res, activity, 'Level-3', 'Fetch-Posts', false, 500, {}, errorMessage.internalServer, err.message);
}
}

/**
 * @author Kaaviyan
 * @date 06-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to update post fields.
 */

export let updatePost = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
    try{
            const postData = await imageAd.findOne({ $and: [{ isDeleted: false }, { _id: req.body.postId }] })
            if(postData){
                const postDetails : imageDocument  = req.body;
                const imgData = await imageAd.updateOne({_id:req.body.postId},{ 
            $set:{
            productName:postDetails.productName,
            category: postDetails.category,
          }})
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
 * @description This Function is used to delete post.
 */

export let deleteImagePost = async( req, res, next) =>{
    try {
         const delPost = await imageAd.findByIdAndUpdate({_id:req.query.id},{$set:{isDeleted:true}})
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

export let imageLikes = async(req, res, next) =>{
    try{
        const likes = await imageAd.findByIdAndUpdate({_id:req.body.id},{$push:{likes:req.body.likes}})

        response(req, res, activity, 'Level-2', 'Post-likes', true, 200, likes , clientError.success.updateSuccess);
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
 export let unLikesImagePost = async(req, res, next) =>{
    try{
        
        const  data = await imageAd.updateMany({_id:req.body.postId},{$inc:{likeCount:-1},$pull:{likes:req.body.userId}})   

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
export let imageReport = async (req, res, next) => {
   
    try {
            
            const  data = await imageAd.findByIdAndUpdate({_id:req.body.postId},{$inc:{report:1}})   
            if (data.report===15) {
                const user = await imageAd.findByIdAndUpdate({_id:req.body.postId},{$set:{status:2,isDeleted:true}})
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
export let showreportImagePost = async (req, res, next) => {
   
    try {
            
            const  data = await imageAd.find({$and:[{isDeleted:true},{status:2}]})  
         
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


 export let imageComment = async (req, res, next) => {
   
    try {
        const userDetails:UserDocument= req.body;
        const user = await User.findOne({_id:userDetails.userId},{userName:1,_id:0})
        console.log(user);
                
        const  data = await imageAd.findByIdAndUpdate({_id:req.body.postId},{$push:{comments:[{comment:req.body.comment, name:user.userName}]}})   
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


 export let deleteImageComment = async (req, res, next) => {
   
    try {
        const userDetails:UserDocument= req.body;
        const user = await User.findOne({_id:userDetails.userId},{userName:1,_id:0})
        console.log(user);
                
        const  data = await imageAd.findByIdAndUpdate({_id:req.body.postId},{$push:{comments:[{comment:req.body.comment, name:user.userName}]}})   
        response(req, res, activity, 'Level-2', 'Save-Company', true, 200, data, clientError.success.updateSuccess);
        }
     catch (err: any) {
        response(req, res, activity, 'Level-3', 'Save-Company', false, 500, {}, errorMessage.internalServer, err.message);
        }
    }    
