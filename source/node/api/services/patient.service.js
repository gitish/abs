

var Patient = require('../models/patient.model');

_this = this;


exports.createPatient = async function (patient) {
    
    var newPatient = new Patient({
        patientId : patient.patientId,
        userId: patient.userId,
        lastUpdated : new Date(),
        status: true
    });

    try
    {
        var savePatient = await newPatient.save()
        return savePatient;
    }
    catch(e)
    {
        throw Error("Error during creating Patient");
    }

}