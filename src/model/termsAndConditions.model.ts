import mongoose from 'mongoose';

export interface TermsDocumnet extends mongoose.Document {
    _id?:any;
    privacyPolicy?:string;
    termsAndConditions?:string;
    isDeleted?: Boolean;
    status?: Number;
    modifiedOn?: Date;
    modifiedBy?: string;
    createdOn?: Date;
    createdBy?: string;
    
};

const termsSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    privacyPolicy:{type:String},
    termsAndConditions:{type:String},
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
    createdOn: { type: Date },
    createdBy: { type: String },
    

});

export const termsAndConditions = mongoose.model('terms', termsSchema);