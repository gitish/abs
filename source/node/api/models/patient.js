/**
 * Created by sshail on 20/01/2018.
 */

'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var patient = new Schema({
    patientId:String,
    userId:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    lastUpdated: {
        type: Date,
        default:Date.now
    },
    status:Boolean
});

/*
add another schema here
 */
module.exports = mongoose.model('patient', patient);