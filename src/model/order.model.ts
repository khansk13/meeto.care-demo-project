import * as mongoose from "mongoose";

export interface orderDocument extends mongoose.Document {
    _id?: any;
    productId?:any;
    userId?:any ;
    details?:any ;
    isDeleted?: boolean;
    status?: number;
    createdOn?: Date;
    createdBy?: string;
    modifiedOn?: Date;
    modifiedBy?: string;
};

const orderSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    productId:{type:mongoose.Types.ObjectId,ref:'product'},
    userId:{type:mongoose.Types.ObjectId},
    details:[{
        userName:{type:String},
        userMobile:{type:Number},
        userAddress:{type:String}
    }],
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
});


export const Order = mongoose.model("order", orderSchema);