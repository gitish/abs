var PatientService = require('../services/patient.service');

_this = this;

exports.createPatient = async function(req,res,next)
{
    var patient={
        patientId : req.body.patientId,
        userId: req.body.userId
    }

    try {
        // Calling the Service function with the new object from the Request Body
        var createdPatient = await PatientService.createPatient(patient);
        return res.status(201).json({status: 201, data: createdPatient, message: "Succesfully Created Patient"});
    } catch (error) {
        return res.status(400).json({status: 400, message: "Patient Creation was Unsuccesfull"})
    }
}