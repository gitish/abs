/**
 * Created by sshail on 20/01/2018.
 */

'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var patientSchema = new Schema({
    patientid:String,    
    patientname:String,
    email:String,   
    dob: {
        type: Date
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    // nationality:{
    //     type:String,
    //     default:'Indian'
    // },
    address:String,
    pin:Number,
    image:String,
    FkRegistrationID:String,
    lastUpdated: {
        type: Date,
        default:Date.now
    },
    status:Boolean
    // userId:{
    //     type:Schema.Types.ObjectId,
    //     ref:"user"
    // },
});

/*
add another schema here
 */
module.exports = mongoose.model('patient', patientSchema);