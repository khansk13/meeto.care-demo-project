import * as mongoose from "mongoose";


export interface AppoinmentDocument extends mongoose.Document {
    _id?: any;
    doctorId?: any;
    appoinmentId?;any ;
    doctorName?:string;
    hospitatName?:string;
    appoinmentStatus?:string;
    hospitalAddress?:string;
    hospitalContact?:string;
    patientDetails?:any;
    createdOn?: Date;
    createdBy?: string;
    modifiedOn?: Date;
    modifiedBy?: string;
};

const AppoinmentSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    doctorId:{type:mongoose.Types.ObjectId,ref:'doctorslist'},
    appoinmentId:{type:mongoose.Types.ObjectId},
    doctorName:{type:String},
    hospitatName:{type:String},
    hospitalAddress:{type:String},
    hospitalContact:{type:String},
    appoinmentStatus:{type:String},
    patientDetails:[{
        patientName:{type:String},
        patientId:{type:mongoose.Types.ObjectId,ref:'userlist'},
        patientMobile:{type:String},
        patientType:{type:String},
        reason:{type:String},
        description:{type:String},
        Time:{type:String},
        date:{type:String},
        appoinmentNumber:{Number},
    }],
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
});



export const Appoinment = mongoose.model("Appoinmentlist", AppoinmentSchema);
