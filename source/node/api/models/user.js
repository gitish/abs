/**
 * Created by sshail on 10/01/2018.
 */

'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var user = new Schema({
    userId:{
        type: String,
        required: true,
        unique: true
    },
    name: String,
    mobile:{
        type: String,
        required: true,
        unique: true
    },
    userType: {
        type: String,
        enum: ["patient", "doctor","compounder"],
        default: "patient"
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    address:String,
    pin:Number,
    nationality:{
        type:String,
        default:'Indian'
    },
    email:String,
    dob: {
        type: Date
    },
    otherContact:[String],
    password:{
        type:String,
        default:'password@123'
    },
    image:String,
    lastUpdated:{
        type:Date,
        default:Date.now
    },
    status: {
        type: [{
            type: String,
            enum: ['unregistered','registered', 'active', 'inactive','blocked']
        }],
        default: ['registered']
    }
});

module.exports = mongoose.model('user', user);
/*
add another schema here
 */
