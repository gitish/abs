var http = require('http'),
    fs = require("fs"),
    express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    cors = require('cors');

   
var multer = require('multer');

mongoose.Promise = global.Promise;
global._ = require('lodash');
global.fs = require('fs');

const config = require('./config/database');
mongoose.connect(config.database,{ useMongoClient: true });
//mongoose.createConnection(config.database);
global.db = mongoose.connection;

//check db error
db.on('error', function(err) {
    console.log(err);
    process.exit();
});

//check connection
db.once('open', function() {
    console.log('connection to mongodb');
});

/**
 * Enabling CORS(Cross Origin Resource Sharing) on Node 
 */
app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    //res.header("Access-Control-Allow-Origin", "http://localhost:4201");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

var help = require("./modules/help/help.js"),
    users = require('./api/models/user.js'),
    dr = require('./api/models/dr.js');
    patient = require('./api/models/patient.model');

app.set('port', (process.env.PORT || 3061));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


var home = function(req, resp) {
    fs.readFile("./public/dist/index.html", function(err, data) {
        resp.writeHeader(200, { "Content-Type": "text/html" });
        resp.write(data);
        resp.end();
    });
};
/* this section handle all api */
app.get("/", home);
var routes = require("./api/routes/app-routes.js");
routes(app);
/*
general routes and UI path
 */
app.get("/help", help.f1);
app.use(express.static(__dirname + '/public/dist/'));
app.use(cors());
/*
finally start the server
 */
app.listen(app.get('port'), function() {
    console.log('Server listening to port http://localhost:' + app.get('port'));
});


