var uitlService = require('../services/util.service');

exports.uploadimages = async function(req,res,next)
{    
    console.log('server request upload image');
    
    try {
        // Calling the Service function with the new object from the Request Body
        var createdPatient = await uitlService.uploadimagepostservice(req,res);
        return res.status(201).json({status: 201, data: createdPatient, message: "Succesfully uploaded"});
    } catch (error) {
        return res.status(400).json({status: 400, message: "Image upload was Unsuccesfull"});
    }
}