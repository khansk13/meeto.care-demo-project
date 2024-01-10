import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { generate, response, sendEmailOtp } from "../helper/commonResponseHandler";
import * as TokenManager from "../utils/tokenManager";
import { Post, PostDocument } from "../model/post.model";
import { User, UserDocument } from "../model/user.model";


var activity = "Post"

/**
 * @author Kaaviyan
 * @date 08-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to create user list .
 */ 

// 1. create api 
export let postCreate = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
                const userDetails : UserDocument = req.body
                const PostDetails: PostDocument = req.body;
                const createPost = new Post(PostDetails);
                let insertData = await createPost.save();
                 const result = {}
                result['_id'] = insertData._id
                result['postTille'] = insertData.title;
                result['postType'] = insertData.media
                result['postMessage'] = insertData.description;
                let finalResult = {};
                finalResult["postCreate"] = 'Post';
                finalResult["postDetails"] = result;
                const count = await User.updateOne({_id:userDetails.userId},{$inc:{postCount:1}})
                response(req, res, activity, 'Level-2', 'Company-Profile', true, 200, result, clientError.success.registerSuccessfully);
     }         catch (err: any) {
            response(req, res, activity, 'Level-3', 'User-Profile', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'User-Profile', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}