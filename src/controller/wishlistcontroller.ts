
import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response, sendEmailOtp } from "../helper/commonResponseHandler";
import { User, UserDocument } from "../model/user.model";
import { WishList, wishListDocument } from "../model/whishlistmodel";
import { product } from "../model/product.model";


var activity = "wish list ";


export let createWishList = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
      try {
          const userDetails: UserDocument = req.body;
          const wishListDetails: wishListDocument = req.body;
          const result = await User.findOne({ $and: [{ isDeleted: false }, { email:userDetails.email }] })
          if (result) {
            const createData = new WishList(wishListDetails);
            let insertData = await createData.save();
            response(req, res, activity, 'Level-2', 'cart-product', true, 200,insertData, clientError.success.registerSuccessfully);
        
             }
                else{
                response(req, res, activity, 'Level-2', 'cart-product', true, 422,{}, clientError.user.UserNotFound);

          }
         
      } catch (err: any) {
          response(req, res, activity, 'Level-3', 'cart-product', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
      }
  }

}

export let addList = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const userDetails: UserDocument = req.body;
            const wishListDetails: wishListDocument = req.body;
            const data = await WishList.findOne({_id:wishListDetails._id},{userId:1})
            const data2 = await (await WishList.findOne({_id:wishListDetails._id})).populate("productlist",{productId:1})
            
            if (data2) {                                 
                response(req,res,activity,'Level-2','add-list',false,422,{},clientError.product.dublicate);
            } else {
                const data1  = await WishList.updateOne({_id:wishListDetails._id},{$push:{productList:wishListDetails.productList}}) 
                response(req,res,activity,'Level-2','add-list',true,200,{},data1,clientError.product.success);
            }
           
        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'add-list', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
        }
    }
  
  }

  export let deleteWishList = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const data = await WishList.find({_id:req.body.userId});
            const wishListDetails: wishListDocument = req.body;         
           const data2 = await WishList.findOne({_id:wishListDetails._id},{productList:{_id:req.body.productListId}})     
           console.log(data2);
           const data3 = await WishList.updateOne({_id:wishListDetails._id},{$pull:{}})
          response(req, res, activity, 'Level-2', 'delete-wish-list', true, 200,data2, clientError.success.deleteSuccess)      
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'delete-wish-list', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'delete-wish-list', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}