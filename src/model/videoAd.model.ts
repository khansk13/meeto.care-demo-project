import * as mongoose from "mongoose";

export interface videoDocument extends mongoose.Document {
    _id?:any;
    postUrl?:string;
    title?:string;
    description?:string;
    category?:string;
    advertiserId?:any;
    userId?:any;
    likes?:any;
    likeCount?:number;
    report?:number;
    comments?:any;
    isDeleted?:boolean;
    status?: number;
    createdOn?: Date;
    createdBy?: string;
    modifiedOn?: Date;
    modifiedBy?: string;
}

const videoSchema = new mongoose.Schema({
    _id:{ type: mongoose.Types.ObjectId, required: true, auto: true },
    postUrl:{ type: String },
    userId:{type:mongoose.Types.ObjectId,ref:'userList'},
    title:{ type: String },
    description:{ type: String },
    category:{ type: String },
    advertiserId:{ type: mongoose.Types.ObjectId, ref:'advertisers' },
    likes:[{ type: mongoose.Types.ObjectId, ref:'users' }],
    likeCount:{type:Number},
    comments:[{
        name:{type:String},
        comment:{type:String}
}],
    report:{type:Number},
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String }
})

export const videoAd = mongoose.model("video",videoSchema)