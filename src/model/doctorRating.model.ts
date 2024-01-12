import * as mongoose from "mongoose";

export interface doctorRatingDocument extends mongoose.Document {
    _id?: any;
    doctorId?:any;
    doctorName?:string;
    userId?:any;
    title?:string;
    Reviews?:string;
    ratingStar?:number;
    isDeleted?: boolean;
    status?: number;
    createdOn?: Date;
    createdBy?: string;
    modifiedOn?: Date;
    modifiedBy?: string;
};

const doctorratingSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    doctorId:{type:mongoose.Types.ObjectId,ref:'doctorslist'},
    userId:{type:mongoose.Types.ObjectId,ref:'user'},
    doctorName:{type:String},
    title:{type:String},
    Reviews:{type:String},
    ratingStar:{typr:Number},
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
});


export const DoctorRating = mongoose.model("doctorrating", doctorratingSchema);