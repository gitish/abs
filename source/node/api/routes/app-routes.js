/**
 * Created by sshail on 03/06/2017.
 */
'use strict';
var multer = require('multer');
module.exports = function(app) {
    var userController = require('../controllers/user-controller.js');
    var drController = require('../controllers/dr-controller.js');
    var PatientController = require('../controllers/patient.controller');
    var utilController = require('../controllers/util.controller');
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
<<<<<<< HEAD
        .get(PatientController.getPatientReport);
        
    app.route('/uploadimage')
        .post(utilController.uploadimages);
};
=======
        .get(PatientController.getPatientReport)

    app.route('/patient/doctor/:value')
        .get(PatientController.getDoctorList)
>>>>>>> master

};

