import * as mongoose from "mongoose";

export interface wishListDocument extends mongoose.Document {   
    _id?:any;
    userId?:any;
    productId?:any;
    productList?:any;
    productName?:string;
    isDeleted?: boolean;
    status?: number;
    createdOn?: Date;
    createdBy?: string;
    modifiedOn?: Date;
    modifiedBy?: string;

};

const wishlistSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    userId:{type:mongoose.Types.ObjectId,ref:'userlist'},
    productId:{type:mongoose.Types.ObjectId,ref:"product"},
    productList:[{
        productId:{type:mongoose.Types.ObjectId,ref:'product'},
        productName:{type:String},
        Quantity:{type:Number},
        color:{type:String},
        price:{type:Number},
        freeShipping:{type:Number},
        styleName:{type:String},
        instock:{type:Boolean ,default :true},
    }],
  
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
});


export const WishList = mongoose.model("wishlist", wishlistSchema);