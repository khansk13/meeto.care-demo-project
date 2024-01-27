
import * as mongoose from "mongoose";

export interface AdvertiserDocument extends mongoose.Document {
   _id?:any;
   companyId?:any;
   companyName?:string;
   advertiserName?:string;
   mobileNumber?:number;
   productDetails?:any;
   email?:string;
   postCount?:number;
   profileUrl?:string;
   otp?:number;
   followers?:any;
   followersCount?:number;
   isDeleted?:boolean;
   status?: number;
   createdOn?: Date;
   createdBy?: string;
   modifiedOn?: Date;
   modifiedBy?: string;
};

const advertiserSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    companyId:{type:mongoose.Types.ObjectId,ref:'company'},
    companyName: { type: String },
    advertiserName: { type: String },
    mobileNumber: { type: Number },
    productDetails:[{
        productName:{type:String},
        productCost:{type:Number}
    }],
    email: { type: String, lowercase: true, trim: true },
    postCount:{type:Number},
    profileUrl: { type: String },
    otp: { type: Number },
    followers: [{ type: mongoose.Types.ObjectId, ref:'userList' }],
    followersCount: { type: Number },
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String }
})

export const Advertiser = mongoose.model("advertiser", advertiserSchema );