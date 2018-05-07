var PatientService = require('../services/patient.service');
var multer = require('multer');
_this = this;

exports.createPatient = async function(req,res,next)
{
    upload(req,res,function(err){
        console.log(req.file);
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
         res.json({error_code:0,err_desc:null});
    });
    var patient={
        patientid: req.body.patientid,
        patientname: req.body.patientname,
        email: req.body.email,
        dob :  req.body.dob,
        mobile: req.body.mobile,
        gender: req.body.gender,
        // nationality: req.body.nationality,
        address : req.body.address,
        pin: req.body.pin,
        image: upload(req.body.image),
        FkRegistrationID: req.body.fkRegistrationid
              
    }
    console.log('server request add new patient');
    console.log(patient);
    try {
        // Calling the Service function with the new object from the Request Body
        var createdPatient = await PatientService.createPatient(patient);
        return res.status(201).json({status: 201, data: createdPatient, message: "Succesfully Created Patient"});
    } catch (error) {
        return res.status(400).json({status: 400, message: "Patient Creation was Unsuccesfull"});
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
    console.log(req.body.patientid);
    if (!req.body.patientid) {
        return res.status(400).json({status:400,message:'PatientId must be present'});
    }

    var patientId = req.body.patientid;
    console.log(req.body);

    var patient ={
        patientId:req.body.patientid,
        //userId:req.body.userId
    }

    try {
        var updatePatient = await PatientService.updatePatient(patient);
        return res.status(200).json({status:200,data:updatePatient,message:'successfully update Patient'});
    } catch (e) {
        return res.status(400).json({status:400,message:e.message});
    }
}

exports.deletePatient = async function (req,res,next) {
    console.log(req.params.patientid)
    var patientId = req.params.patientid;

    try {
        var deletePatient = await PatientService.deletePatient(patientId);
        return res.status(204).json({status:204,message:"deleted Succesfully"});
    } catch (e) {
        return res.status(400).json({status:400,message:e.message});
    }
}

exports.getPatientReport = async function (req, res, next) {
    var id = _.toString(req.params.id)
    db.collection('reports').find({
        'FkPatientID': req.params.id
    }).toArray(function (err, result) {
        if (err) {
            throw err
        } else {
            res.send({ success: true, data: result })
        }
    })
   
}
var upload = multer({ //multer settings
    storage: storage
}).single('file');
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});
