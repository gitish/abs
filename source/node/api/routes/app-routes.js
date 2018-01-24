/**
 * Created by sshail on 03/06/2017.
 */
'use strict';

module.exports = function(app) {
    var userController = require('../controllers/user-controller.js');
    var drController = require('../controllers/dr-controller.js');
    var PatientController = require('../controllers/patient.controller');
	/*
    var locationController = require('../controllers/location-controller.js');
	*/

    app.route('/user')
        .get(userController.list_all_users)
        .post(userController.create_new_user)
        .put(userController.update_user)
        .delete(userController.invalidate_user);

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
        .post(PatientController.createPatient);
};