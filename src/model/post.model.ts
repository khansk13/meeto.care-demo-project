import * as mongoose from "mongoose";

export interface PostDocument extends mongoose.Document {
    _id?: any;
    userId?:any;
    title?:string;
    media?:string;
    description?:string;
    likecount?:number;
    Like?:any;
    report?:number;
    isDeleted?: boolean;
    status?: number;
    createdOn?: Date;
    createdBy?: string;
    modifiedOn?: Date;
    modifiedBy?: string;
};
 
   const postSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    userId:{type:mongoose.Types.ObjectId,ref:'user'},
    title:{type:String},
    media:{type:String},
    description:{type:String},
    likecount:{type:Number},
    Like:{type:mongoose.Types.ObjectId},
    comments:[{name:{type:String},comment:{type:String}}],
    isdelete:{type:Boolean,default:false},
    report:{type:Number},
    Status:{type:Number, default:1},
    createdOn:{type:Date},
    createdBy:{type:String},
    modifiedOn:{type:Date},
    modifiedBy:{type:String}
})
   

export const Post = mongoose.model("post", postSchema);
