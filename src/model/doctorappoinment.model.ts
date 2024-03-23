import * as mongoose from "mongoose";


export interface AppoinmentDocument extends mongoose.Document {
    _id?: any;
    doctorId?: any;
    doctorName?:string;
    appoinmentId?:any;
    hospitatName?:string;
    appoinmentStatus?:boolean;
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
    doctorName:{type:String},
    hospitatName:{type:String},
    hospitalAddress:{type:String},
    hospitalContact:{type:String},
    appoinmentStatus:{type:Boolean, default:true},
    appoinmentId:{type:mongoose.Types.ObjectId},
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
