import mongoose from 'mongoose';

export interface FaqDocument extends mongoose.Document {
    _id?:any;
    FaqQuestions?:String;
    FaqAnswers?:String;
    isDeleted?: Boolean;
    status?: Number;
    modifiedOn?: Date;
    modifiedBy?: string;
    createdOn?: Date;
    createdBy?: string;
    
};

const FaqSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    FaqQuestions:{type:String},
    FaqAnswers:{type:String},
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
    createdOn: { type: Date },
    createdBy: { type: String },
    

});

export const Faq = mongoose.model('Faq', FaqSchema);