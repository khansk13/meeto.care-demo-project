
import mongoose from 'mongoose';


export interface DoctorDocument extends mongoose.Document {
    _id?: any;
    doctorName?: string;
    email?: string;
    phone?: number;
    otp?: number;
    userOtp?: number;
    password?: string;
    qualification?: string;
    experience?: string;
    doctorBio?: string;
    language?: string;
    gender?: string;
    profileImage?: string;
    address?: string;
    scheduleTime?: string;
    scheduleDays?: string;
    overAllQualification?: string;
    overAllExperience?: string;
    city?: string;
    state?: string;
    pincode?: string;
    landlineNumber?: string;
    fcmToken?: string;
    reviews?: string;
    averageRating?: string;
    service?: string;
    isDeleted?: boolean;
    status?: number;
    modifiedOn?: Date;
    modifiedBy?: string;
    createdOn?: Date;
    createdBy?: string;
    followers?: string;
    following?: string;
    followerscount?: Number;
    followingcount?: Number;
    skills?: string;
    blockuser?:string;
    unblockuser?:string
};

const DoctorSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    doctorName: { type: String },
    email: { type: String },
    phone: { type: Number },
    otp: { type: Number },
    userOtp:{type: Number},
    password:{type: String},
    qualification: { type: String },
    experience:{type:String},
    doctorBio:{type:String},
    language:{ type:String},
    gender:{type: String},
    profileImage:{type: String},
    address: {type:String},
    scheduleTime:{type: String},
    scheduleDays:{type: String},
    overAllQualification:{type: String},
    overAllExperience:{type: String},
    city:{type: String},
    state:{type: String},
    pincode:{type: String},
    landlineNumber:{type: String},
    fcmToken:{type: String},
    reviews: {type:String},
    averageRating:{type: String},
    service: {type:String},
    contactPerson: { type: String },
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
    createdOn: { type: Date },
    createdBy: { type: String },
    followers:[{ type: mongoose.Types.ObjectId}],
    following:[{ type: mongoose.Types.ObjectId,}],
    followerscount:{type: Number},
    followingcount:{type: Number},
    skills:{type:String},
    blockuser:{type:String},
    unblockuser:{type:String}
});

export const Doctor = mongoose.model('Doctor', DoctorSchema);