import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { generate, response, sendEmailOtp } from "../helper/commonResponseHandler";
import * as TokenManager from "../utils/tokenManager";
import { Post, PostDocument } from "../model/post.model";
import { User, UserDocument } from "../model/user.model";


var activity = "Post"

/**
 * @author Kaaviyan
 * @date 09-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to create user post  .
 */ 

export let postCreate = async (req, res, next: any) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const userDetails :UserDocument = req.body;
            const PostDetails: PostDocument = req.body;
            const createData = new Post(PostDetails);
            const insertData = await createData.save();
            const count = await User.findByIdAndUpdate({_id:userDetails.userId},{$inc:{postCount:1}})
            response(req, res, activity, 'Level-2', 'post-create', true, 200, count, clientError.success.savedSuccessfully);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'post-create', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'post-create', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}