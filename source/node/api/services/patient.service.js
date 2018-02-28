var Patient = require('../models/patient.model');

_this = this;


exports.createPatient = async function (patient) {
    
    var newPatient = new Patient({
        patientid : patient.patientid,
        patientname: patient.patientname,
        email: patient.email,
        dob : patient.dob,
        gender : patient.gender,
        nationality: patient.nationality,
        address: patient.address,
        pin : patient.pin,
        image: patient.image,
        FkRegistrationID: patient.FkRegistrationID,
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

exports.getPatient = async function () {
    try {
        var patients = await Patient.find();
        return patients;
    } catch (e) {
        throw Error("Error during Get Patient");
    }
}

exports.updatePatient = async function (patient) {
    var patientId = patient.patientId;
    try {
        var oldPatient = await Patient.findById(patientId);
    } catch (e) {
        throw Error('Error generate during finding the patient');
    }

    if (!oldPatient) {
        return false;
    }

    console.log(oldPatient);

    //oldPatient.patientId= patient.patientId;
    oldPatient.userId =  patient.userId;

    console.log(oldPatient);

    try {
        var savePatient = await oldPatient.save();
        return savePatient;

    } catch (e) {
           throw Error('error generate during update the patient');
    }

}

exports.deletePatient = async function (patientId) {
    //console.log(patientId);
    try {
        var deletedPatient = await Patient.remove({patientId : patientId});
        if (deletedPatient.result.n==0) {
            throw Error('Patient could not deleted');
        }
    } catch (e) {
        throw Error('Error Occured while deleting the patient'+e.message);
    }
}