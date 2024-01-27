import mongoose from 'mongoose';

export interface PolicyDocument extends mongoose.Document {
    _id?:any;
    terms?:string;
    conditions?:string;
    isDeleted?: Boolean;
    status?: Number;
    modifiedOn?: Date;
    modifiedBy?: string;
    createdOn?: Date;
    createdBy?: string;
    
};

const policySchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    terms:{type:String},
    conditions:{type:String},
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
    createdOn: { type: Date },
    createdBy: { type: String },
    

});

export const privacyPolicy = mongoose.model('privacypolicy', policySchema);