import * as mongoose from "mongoose";

export interface orderDocument extends mongoose.Document {
    _id?: any;
    userid?:any;
    userName?:string ;
    orderNumber?:number ;
    productDetails?:any ;
    compnayId?:any ;
    deliveryCharges?: number ;
    totalPrice?:number ;
    totalAmount?:string;
    shippingAddress?:any;   
    isDeleted?: boolean;
    status?: number;
    createdOn?: Date;
    createdBy?: string;
    modifiedOn?: Date;
    modifiedBy?: string;
};

const orderSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    orderNumber:{type:Number},
    userId:{type:mongoose.Types.ObjectId},
    userName:{type:String},
    productDetails:[{
        productName:{type:String},
        productImage:{type:String},
        quantity:{type:Number},
        trackingNumber:{type:String},
        price:{type:Number},
        taxPrice:{type:Number},
        discountPrice:{type:Number},
        finalPrice:{type:Number},
        originalPrice:{type:Number},
        invoice:{type:String}
    }],
    companyId:{type:mongoose.Types.ObjectId,ref:'company'},
    deliveryCharges:{type:Number},
    totalPrice:{type:Number},
    totalAmount:{type:String},
    shippingAddress:[{
        name:{type:String},
        mobile:{type:String},
        email:{type:String},
        address:{type:String},
        cuty:{type:String},
        state:{type:String},
        pincode:{type:Number},
        alternateNumber:{type:String},
        landMark:{type:String}
    }],
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
});


export const Order = mongoose.model("order", orderSchema);