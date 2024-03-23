import mongoose, { Mongoose } from "mongoose";

export interface supportDocument extends mongoose.Document {
    _id?: any;
    companyId?;any;
    companyName?:string;
    serviceAgentName?:string;
    email?:string;
    isDeleted?: boolean;
    status?: number;
    modifiedOn?: Date;
    modifiedBy?: string;
    createdOn?: Date;
    createdBy?: string;
};


const supportSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    companyName:{type:String},
    companyId:{type:mongoose.Types.ObjectId,ref:"company"},
    serviceAgentName:{type:String},
    email:{type:String},
    isDeleted:{type:Boolean,default:false},
    status:{type:Number,default:1},
    createdOn:{type:Date},
    createdBy:{type:String},
    modifiedOn:{type:Date},
    modifiedBy:{type:String}

})

export const supportAgent = mongoose.model('customerService', supportSchema);