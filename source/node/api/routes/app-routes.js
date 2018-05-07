/**
 * Created by sshail on 03/06/2017.
 */
'use strict';
var multer = require('multer');
module.exports = function(app) {
    var userController = require('../controllers/user-controller.js');
    var drController = require('../controllers/dr-controller.js');
    var PatientController = require('../controllers/patient.controller');
    const passport = require('passport');
	/*
    var locationController = require('../controllers/location-controller.js');
	*/

    app.route('/user')
        .get(userController.list_all_users)
        .post(userController.create_new_user)
        .put(userController.update_user)
        .delete(userController.invalidate_user);
    app.route('/user/register')       
        .post(userController.create_new_user)
    // Authenticate
    app.post('/user/authenticate', userController.authenticateUser );
    //  Profile
    app.get('/user/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
        console.log('profile request');
        res.json({user: req.user});
      });
    app.route('/user/:userId')
        .get(userController.get_users);

    app.route('/dr')
        .get(drController.list_all_dr)
        .post(drController.insert_new_dr);

    app.route('/dr/search')
        .post(drController.find_dr);

    app.route('/dr/:drId')
        .get(drController.get_dr)
        .put(drController.update_a_dr)
        .delete(drController.delete_a_dr);
    
    app.route('/patient')
        .get(PatientController.getPatient)
        .post(PatientController.createPatient);

    app.route('/patient/:patientid')
        .get(PatientController.getPatient)
        .put(PatientController.updatePatient)
        .delete(PatientController.deletePatient);

    app.route('/patient/report/:id')
        .get(PatientController.getPatientReport)

        app.post('/upload', function(req, res) {
            upload(req,res,function(err){
                console.log(req.file);
                if(err){
                     res.json({error_code:1,err_desc:err});
                     return;
                }
                 res.json({error_code:0,err_desc:null});
            });
        });

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
        
     
};


  