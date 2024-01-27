import * as mongoose from "mongoose";

export interface ticketDocumnet extends mongoose.Document {
    _id?: any;
    ticketRaise?:any;
    isDeleted?: boolean;
    status?: number;
    createdOn?: Date;
    createdBy?: string;
    modifiedOn?: Date;
    modifiedBy?: string;
};

const ticketSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    ticketRaise:{   
         companyId:{type:mongoose.Types.ObjectId,ref:"company"},
         questions:{type:String},
         answers:{type:String},
         name:{type:String},
         ticketId:{type:String}    } ,   
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
});

export const ticketRaise = mongoose.model('ticket', ticketSchema);