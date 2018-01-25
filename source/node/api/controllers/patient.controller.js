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

exports.getPatient = async function (req, res, next) {
    console.log('get patient');
    try {
        var patient = await PatientService.getPatient();
        return res.status(200).json({status: 200, data: patient, message: "Succesfully patient Recieved"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.updatePatient = async function (req, res,next) {
    if (!req.body._patientId) {
        return res.status(400).json({status:400,message:'PatientId must be present'});
    }

    var patientId = req.body._patientId;
    console.log(req.body);

    var patient ={
        patientId:req.body.patientId,
        userId:req.body.userId
    }

    try {
        var updatePatient = await PatientService.updatePatient(patient);
        return res.status(200).json({status:200,data:updatePatient,message:'successfully update Patient'});
    } catch (e) {
        return res.status(400).json({status:400,message:e.message});
    }
}