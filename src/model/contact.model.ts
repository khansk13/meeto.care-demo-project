import mongoose from 'mongoose';

export interface ContactDocument extends mongoose.Document {
    _id?:any;
    name?:String;
    email?:String;
    phoneNumber?:Number;
    location?:String;
    description?:String;
    isDeleted?: Boolean;
    status?: Number;
    modifiedOn?: Date;
    modifiedBy?: string;
    createdOn?: Date;
    createdBy?: string;
    
};

const contactSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    name: { type: String },
    email: { type: String },
    phoneNumber: { type: Number },
    location:{type:String},
    description:{type:String},
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
    createdOn: { type: Date },
    createdBy: { type: String },
    

});

export const contact = mongoose.model('Contactus', contactSchema);