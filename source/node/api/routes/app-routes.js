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
        .get(PatientController.getPatientReport);
        
    app.route('/uploadimage')
        .post(utilController.uploadimages);
    
        // var url = 'mongodb://localhost:27017/abs';        
        // var MongoClient = require('mongodb').MongoClient;
        // var assert = require('assert');
        // var multer = require('multer');
        // var storage = multer.diskStorage({
            
        //     destination: (req, file, cb) => {
        //       console.log('store multer');
        //       cb(null, 'public/images/uploads')
        //     },
        //     filename: (req, file, cb) => {
        //         console.log('filename Cb file'+file.filename);
        //       cb(null, file.fieldname + '-' + Date.now()+"."+file.exten)
        //     }
        // });
        // var upload = multer({storage: storage});
    // app.route('/upload').post(upload.single('image'), (req, res, next) => {
    //     console.log('upload method');
    //    // MongoClient.connect(url, (err, db) => {
    //         // assert.equal(null, err);
    //         // insertDocuments(db, 'public/images/uploads/' + req.file.filename, () => {
    //         //     db.close();
    //         //     res.json({'message': 'File uploaded successfully'});
    //         // });
    //     //});
    // });

    // var insertDocuments = function(db, filePath, callback) {
    //     console.log('insert funtion');
    //     // var collection = db.collection('user');
    //     // collection.insertOne({'imagePath' : filePath }, (err, result) => {
    //     //     // assert.equal(err, null);
    //     //     callback(result);
    //     // });
    // };
        
     
};


  