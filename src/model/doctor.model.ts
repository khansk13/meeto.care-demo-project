import * as mongoose from "mongoose";
export interface DoctorDocument extends mongoose.Document {
    _id?: any;
    userId?: any;
    doctorName? :String ;
    email?:String ;
    otp?:number ;
    phone?: String ;
    doctorBio?:string ;
    qualification?:any ;
    experience?: string ;
    specialization?: string ;
    language?:string;
    gender?:string ;
    address?:string;
    scheduleTime?:string ;
    scheduleDays?:string ;
    city?:string ;
    state?:string ;
    pincode? :number ;
    userCount?:number ;
    landLineNumber?:string ;
    fcmToken?:string ;
    reviews?:string ;
    averageRating?:string ;
    services?:string ;
    createdOn?: Date;
    createdBy?: string;
    modifiedOn?: Date;
    modifiedBy?: string;
};

const doctorSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    userId: { type: mongoose.Types.ObjectId },
    doctorName:{type:String},
    email:{type:String},
    otp:{type:Number},
    phone:{type:String},
    doctorBio:{type:String},
    qualification:{
        MBBS:{type:String},
        MD:{type:String}
    },
    experience:{type:String},
    specialization:{type:String},
    profileImage:{type:String},
    language:{type:String},
    gender:{type:String},
    address:{type:String},
    scheduleTime:{type:String},
    scheduleDays:{type:String},
    city:{type:String},
    state:{type:String},
    pincode:{type:Number},
    landLineNumber :{type:String},
    fcmToken:{type:String},
    reviews:{type:String},
    averageRating:{type:String},
    userCount:{type:Number},
    services:{type:String},
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
});

// doctorSchema.pre('save',async function(){
//     try {
//     const user = this 
//     const user1 = mongoose.model("userDetails")
//     const counts = await user1.countDocuments()
//     this.userCount=counts+1
//     } 
//     catch (error) {
//     console.log(error)
//    }
// })

//doctorSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'userId', startAt: 1 });

export const Doctor = mongoose.model("doctorslist", doctorSchema);
