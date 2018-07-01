
var multer = require('multer');
exports.uploadimagepostservice = async function(req,res) { 
    try
    {

        console.log('upload call ');
        var storage = multer.diskStorage({ //multers disk storage settings
            destination: function (req, file, cb) {
                cb(null, './uploads/');
            },
            filename: function (req, file, cb) {
                var datetimestamp = Date.now();
                cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
            }
        });
        
        var upload = multer({ //multer settings
            storage: storage
        }).single('file');

        upload(req,res,function(err){
            console.log(req.file);
            if(err){
                return res.json({error_code:1,err_desc:err});
                 
            }
            return res.json({error_code:0,err_desc:null});
        });
    }
    catch(e)
    {
        throw Error("Error during upload image");
    }
}