
import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response, sendEmailOtp } from "../helper/commonResponseHandler";
import { User, UserDocument } from "../model/user.model";
import * as TokenManager from "../utils/tokenManager";
import { AddToCart, cartDocument } from "../model/addToCart.model";
import { product } from "../model/product.model";
import { toNamespacedPath } from "path";


var activity = "Add to cart";


export let cartProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
      try {
          const userDetails: UserDocument = req.body;
          const cartDetails: cartDocument = req.body;
          const result = await User.findOne({ $and: [{ isDeleted: false }, { email:userDetails.email }] })
          if (result) {
            const createData = new AddToCart(cartDetails);
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

export let updateCart = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const cartDetails: cartDocument = req.body; 
            const data = await AddToCart.updateOne({_id:cartDetails._id},{$push:{ productList:req.body.productList }})
            const prices = await product.findOne({_id:req.body.productsId},{Selling:1,_id:0})
           if (data) {
               let sub= prices.Selling ;
               const find = await AddToCart.findOne({_id:cartDetails._id},{totalCost:1, totalProduct:1})
               if (find.totalCost>=0) {
                const cost1 = find.totalCost
                const list2 = find.totalProduct
                const price =  cost1 + sub *req.body.items
                const list1 = list2  + req.body.items
                const data3 = await AddToCart.updateOne({_id:cartDetails._id},{$set:{totalCost:price, totalProduct:list1}})
                response(req, res, activity, 'Level-2', 'Login-Email', true, 200,data3, clientError.success.updateSuccess); 
               } else {
                const costs = sub * req.body.items
                console.log(costs);
                
                const list = req.body.items
                console.log(list);
                
                const data2 = await AddToCart.updateOne({_id:cartDetails._id},{$set:{totalCost:costs, totalProduct:list}})
                response(req, res, activity, 'Level-2', 'Login-Email', true, 200,data2, clientError.success.updateSuccess);
               }
            
           } else {
            response(req, res, activity, 'Level-2', 'Login-Email', true, 422,{}, clientError.success.productNotExist);
           }
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'update-user', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'update-user', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
} 

export let deleteCart = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            // const cartDetails: cartDocument = req.body;
            const data = await AddToCart.find({_id:req.body.userId});
          //  console.log(data);
            
           response(req, res, activity, 'Level-2', 'delete-cart', true, 200,data, clientError.success.fetchedSuccessfully);

        //     const cartDetails: cartDocument = req.body;           
        //    const data2 = await AddToCart.findOne({_id:cartDetails._id},{productList:{_id:req.body.productListId}})     
        //    console.log(data2);
        //    response(req, res, activity, 'Level-2', 'Login-Email', true, 200,data2, clientError.success.updateSuccess);

                 
        //    if (data) {
        //        let sub= data.price;
        //        const find = await AddToCart.findOne({_id:cartDetails._id},{totalCost:1, totalProduct:1})
        //        if (find.totalCost>=0) {
        //         const cost1 = find.totalCost
        //         const list2 = find.totalProduct
        //         const price =  cost1 - sub *req.body.items          
        //         const list1 = list2 - req.body.items
        //         const data3 = await AddToCart.updateOne({_id:cartDetails._id},{$set:{totalCost:price, totalProduct:list1}})
        //         response(req, res, activity, 'Level-2', 'Login-Email', true, 200,data3, clientError.success.updateSuccess);
        //        } else {
        //         const costs = sub * req.body.items
        //         const list = req.body.items
        //         const data2 = await AddToCart.updateOne({_id:cartDetails._id},{$unset:{totalCost:costs, totalProduct:list}})
        //         response(req, res, activity, 'Level-2', 'Login-Email', true, 200,data2, clientError.success.updateSuccess);
        //        }
            
        //    } else {
        //     response(req, res, activity, 'Level-2', 'Login-Email', true, 422,{}, clientError.success.productNotExist);
        //    }
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'update-user', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'update-user', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
} 