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



 /**
 * @author kaaviyan S
 * @date 13-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is for deletePost.
 */
export let deletePost= async (req, res, next) => {
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
 * @author kaaviyan
 * @date 13-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to find single post.
 */
export let singlePost = async( req, res, next ) =>{
    try {
            const single = await Post.findOne({ $and: [{ isDeleted: false }, { _id: req.body.postId }] })
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
 * @date 10-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to update  post  .
 */ 


// 4. Update post api 

export let updatePost = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const userDetails: UserDocument = req.body; 
            const user = await User.findOne({_id:req.body.userId},{userName:1,_id:0})
            console.log(user);
            const data = await Post.findByIdAndUpdate({_id:req.body.postId},{$set:{
                comments:[{name:user.userName,comment:req.body.comment}]
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
 * @author kaaviyan S
 * @date 13-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is for likes.
 */
export let likes = async(req, res, next) =>{
    try{
        const likes =await Post.updateMany({_id:req.body.postId},{$inc:{likecount:1},$push:{Like:req.body.userId}})

        response(req, res, activity, 'Level-2', 'Post-likes', true, 200, likes , clientError.success.updateSuccess);
    }catch(err){
        response(req, res, activity, 'Level-3', 'Post-likes', false, 500, {}, errorMessage.internalServer, err.message);   
    }
}



 /**
 * @author kaaviyan S
 * @date 13-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is for filterPost.
 */


export let getFilteredPost = async (req, res, next) => {
    try{
    var findQuery;
    var andList: any = []
    var limit = req.body.limit ? req.body.limit : 0;
    var page = req.body.page ? req.body.page : 0;
    andList.push({isDeleted:false})
    andList.push({status:1})
   
    findQuery =(andList.length > 0) ? { $and: andList } : {}
    var postList = await User.find(findQuery).sort({ createdOn: -1 }).limit(limit).skip(page)
    var postCount = await User.find(findQuery).count()
    response(req, res, activity, 'Level-1', 'Get-FilterOrderr', true, 200, { postList, postCount}, clientError.success.fetchedSuccessfully);
}
    catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-FilterOrder', false, 500, {}, errorMessage.internalServer, err.message);
    }   
}


 /**
 * @author kaaviyan S
 * @date 13-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is for likes.
 */

 export let unLikes = async(req, res, next) =>{
    try{
        const likes =await Post.updateMany({_id:req.body.postId},{$inc:{likecount:-1},$pull:{Like:req.body.userId}})

        response(req, res, activity, 'Level-2', 'Post-likes', true, 200, likes , clientError.success.updateSuccess);
    }catch(err){
        response(req, res, activity, 'Level-3', 'Post-likes', false, 500, {}, errorMessage.internalServer, err.message);   
    }
}



 /**
 * @author kaaviyan S
 * @date 13-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is for reportPost.
 */

 export let reportPost = async(req, res, next) =>{
    try{
        const data= await Post.updateOne({_id:req.body.postId},{$inc:{report:1}})
        const value = await Post.findOne({_id:req.body.postId},{report:1,_id:0})
        if(value.report===15){
        const set= await Post.updateOne({_id:req.body.postId},{$set:{isdelete:true,Status:2}})
        }
        response(req, res, activity, 'Level-2', 'Post-likes', true, 200, value , clientError.success.updateSuccess);
    }catch(err){
        response(req, res, activity, 'Level-3', 'Post-likes', false, 500, {}, errorMessage.internalServer, err.message);   
    }
}


 /**
 * @author kaaviyan S
 * @date 13-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is for reportPost.
 */

 export let showreportPost = async(req, res, next) =>{
    try{
        const reportedPost=await Post.find({$and:[{report:{$gte:15}},{status:2}]})

        response(req, res, activity, 'Level-2', 'Post-likes', true, 200, reportedPost , clientError.success.fetchedSuccessfully);
    }catch(err){
        response(req, res, activity, 'Level-3', 'Post-likes', false, 500, {}, errorMessage.internalServer, err.message);   
    }
}