import * as mongoose from "mongoose";

export interface ticketDocumnet extends mongoose.Document {
    _id?: any;
    userId?:any;
    companyName?:string;
    questions?:string;
    answers?:string;
    name?:string;
    ticketId?:string;
    companyId?:any;
    agentName?:string;
    isDeleted?: boolean;
    messages?:string;
    satisfied?:boolean;
    status?: number;
    createdOn?: Date;
    createdBy?: string;
    modifiedOn?: Date;
    modifiedBy?: string;
};

const ticketSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    companyId:{type:mongoose.Types.ObjectId},
    userId:{type:mongoose.Types.ObjectId,ref:'userlist'},
    companyName:{type:String},
    questions:{type:String},
    answers:{type:String},
    name:{type:String},
    messages:{type:String},
    satisfied:{type:Boolean,default:true},
    ticketId:{type:String}, 
    agentName:{type:String},  
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
});

export const ticketRaise = mongoose.model('ticket', ticketSchema);