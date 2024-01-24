import assert = require('assert');
import mongoose from 'mongoose';

export interface HelpDocument extends mongoose.Document {
    _id?:any;
    helpQuestions?:String;
    helpAnswers?:String;
    isDeleted?: Boolean;
    status?: Number;
    modifiedOn?: Date;
    modifiedBy?: string;
    createdOn?: Date;
    createdBy?: string;
    
};

const HelpSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    helpQuestions:{type:String},
    helpAnswers:{type:String},
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
    createdOn: { type: Date },
    createdBy: { type: String },
    

    yourNumberField: {
        type: Number,
        get: v => Math.floor(v), // Getter function to modify the retrieved value
        set: v => Math.round(v) // Setter function to modify the value before saving
      }

});

// const schema = new mongoose.Schema({name:"String"})
// schema.path('name') instanceof SchemaType ;




  mongoose.Schema.Types.Number.cast(function(v) {
    assert.ok(v === undefined || typeof v === 'number');
    return v;

  });
export const Help = mongoose.model('helpus', HelpSchema);