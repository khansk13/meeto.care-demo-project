import * as mongoose from "mongoose";

export interface ratingDocument extends mongoose.Document {
    _id?: any;
    productId?:any;
    comments?:any;
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
    comments:[{
        comment:{type:String},
        name:{type:String}
    }],
    ratingstar:{type:Number},
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
});


export const Rating = mongoose.model("rating", ratingSchema);