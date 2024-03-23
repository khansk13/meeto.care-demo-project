
import mongoose from 'mongoose';


export interface productDocument extends mongoose.Document {
    ProductName?: string;
    _id?:string;
    userId?:any;
    companyId?:any;
    ProductImage?: string;
    ProductGif?: string;
    Specifications?: string;
    inStock?: Boolean;
    shipping?: String;
    OriginalPrice?: number;
    Quantity?: number;
    Selling?: number;
    Category?: string;
    ProductDescription ?: string;
    title?: string;
   
};

const productSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    userId:{type:mongoose.Types.ObjectId},
    companyId: {type:mongoose.Types.ObjectId,ref:'Company'},
    ProductName: { type: String },
    ProductImage: { type: String },
    ProductGif: { type: String },
    Specifications: {type:String},
    instock:{type:Boolean , default :true},
    quantity:{ type: Number},
    Shipping:{ type: String},
    OriginalPrice: { type: Number },
    Selling:{type: Number},
    Category:{type: String},
    ProductDescription: { type: String },
    title: {type:String}
   
 
});

export const product = mongoose.model('product', productSchema);
   