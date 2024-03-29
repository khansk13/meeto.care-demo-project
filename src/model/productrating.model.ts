import * as mongoose from "mongoose";

export interface ratingDocument extends mongoose.Document {
    _id?: any;
    productId?:any;
    userName:{type:String},
    review:{type:String}
    userId?:any;
    reviews?:any ;
    ratingstar?:any ;
    isDeleted?: boolean;
    status?: number;
    createdOn?: Date;
    createdBy?: string;
    modifiedOn?: Date;
    modifiedBy?: string;
};

const ratingSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    productId:{type:mongoose.Types.ObjectId,ref:'products'},
    userId:{type:mongoose.Types.ObjectId,ref:'userlist'},
    userName:{type:String},
    review:{typr:String},
    ratingstar:{type:Number},
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
});


export const Rating = mongoose.model("productrating", ratingSchema);