
import { AnyBulkWriteOperation } from 'mongodb';
import mongoose from 'mongoose';


export interface ManufactureDocument  extends mongoose.Document {
    ProductName?: string;
    _id?:string;
    productId?:any;
    companyId?:any;
    companyName?:String;
    productName?:string;
    ManufactureOn:string ;
    ExpDate?:string;
    Address?:any;
    email?:string;
   country?:string;
   createdOn?: Date;
   createdBy?: string;
   modifiedOn?: Date;
   modifiedBy?: string;
   isdelete?:boolean ;
   status?:number;
};

const manufactureSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    productId:{type:mongoose.Types.ObjectId},
    companyId: {type:mongoose.Types.ObjectId,ref:'Company'},
    companyName:{type:String},
    productName:{type:String},
    ManufactureOn:{type:String},
    ExpDate:{type:String},
    Address:{
        name:{type:String},
        location:{type:String}
    },
    email:{type:String},
    Country:{type:String},
    createdOn:{type:Date},
    createdBy:{type:String},
    modifiedOn:{type:Date},
    modifiedBy:{type:String},
    isdelete:{type:Boolean,default:false},
    Status:{type:Number, default:1},
 
});

export const Manufacture = mongoose.model('manufacture', manufactureSchema);
   