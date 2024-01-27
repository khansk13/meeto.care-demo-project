import * as mongoose from "mongoose";

export interface UserDocument extends mongoose.Document {
    _id?: any;
    userId?:any ;
    userName?: string;
    mobileNumber?: number;
    DOB?: String;
    email?: string;
    referralCode?: String;
    myReferralCode?: String;
    bankDetails?: any;
    address?:string;
    city?:string;
    state?:string;
    pincode?:number;
    postCount?:number;
    follower?:any;
    following?:any;
    followersCount?:number;
    blockeduser?: any;
    savePost?:any;
    notification?: number;
    fcm_Token?: string;
    otp?: number;
    isDeleted?: boolean;
    status?: number;
    createdOn?: Date;
    createdBy?: string;
    modifiedOn?: Date;
    modifiedBy?: string;
};

const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    userId:{type:mongoose.Types.ObjectId},
    userName: { type: String },
    mobileNumber: { type: Number },
    DOB: { type: String },
    email: { type: String, lowercase: true, trim: true },
    profileUrl: { type: String },
    referralCode: { type: String },
    myReferralCode: { type: String },
    follower:{type:mongoose.Types.ObjectId,ref:'userList'},
    followersCount:{type:Number},
    bankDetails: [{
        accountNumber: { type: Number },
        ifsc: { type: String },
        accountHolderName: { type: String }
    }],
    following:{type:mongoose.Types.ObjectId,ref:'userList'},
    address:{type:String},
    city:{type:String},
    state:{type:String},
    pincode:{type:Number},
    blockeduser:{type:mongoose.Types.ObjectId,ref:'userList'},
    savePost:{type:mongoose.Types.ObjectId,ref:'post'},
    notification: { type: Number},
    fcm_Token: { type: String },
    postCount:{type:Number},
    otp: { type: Number },
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
});


export const User = mongoose.model("userList", userSchema);