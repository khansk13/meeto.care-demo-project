import * as mongoose from "mongoose";

export interface companyRatingDocument extends mongoose.Document {
    _id?: any;
    CompanyId?:any;
    manufactureId?:any;
    companyName?:string ;
    productName?:string ;
    reviews?:String ;
    ratingStar?:any ;
    isDeleted?: boolean;
    status?: number;
    createdOn?: Date;
    createdBy?: string;
    modifiedOn?: Date;
    modifiedBy?: string;
};

const companyRatingSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    companyId:{type:mongoose.Types.ObjectId,ref:'doctorslist'},
    manufactureId:{type:mongoose.Types.ObjectId,ref:'manufacture'},
    companyName:{type:String},
    productName:{type:String},
    reviews:{type:String},
    ratingStar:{type:Number},
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
});


export const companyRating = mongoose.model("companyrating", companyRatingSchema);