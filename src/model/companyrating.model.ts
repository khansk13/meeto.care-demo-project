import * as mongoose from "mongoose";

export interface companyRatingDocument extends mongoose.Document {
    _id?: any;
    CompanyId?:any;
    userId?:any;
    reviews?:any ;
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
    userId:{type:mongoose.Types.ObjectId,ref:'user'},
    reviews:[{
        name:{type:String},
        Feedback:{type:String}
    }],
    ratingStar:{type:Number},
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
});


export const companyRating = mongoose.model("companyrating", companyRatingSchema);