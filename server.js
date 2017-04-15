// Include third-party dependencies
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var express = require('express');
var bodyParser = require('body-parser');

// Local dependencies
var configService = require('./services/configuration.js');
var apputil = require("./util.js");
var db = require('./db.js');

// Define constants
const STATIC_CONTENT_DIR = './public';

// Define globals


// Retrieve config
var config = configService.GetConfigurationSync();


// Begin Express handlers
var app = express();

// Install express middleware
app.use(express.static(STATIC_CONTENT_DIR));
app.use(bodyParser.json());

// Handle root
app.get('/', function(req, res) {
	res.redirect(`/index.html`);
});

// Get commands from MongoDB://commands and return in JSON
app.get('/commands', function(req, res) {	
	db.get().collection("commands").find().toArray(function(error, results) {
		if (error) {
			apputil.log(`Error retrieving commands: ${error}`);
		} else {
			res.setHeader('Content-Type', 'application/json');
			res.jsonp(results);
		}
	});
});

// Return log, should this be an admin call?
app.get('/log', function(req, res) {
	var logName = "server.log";
	apputil.readFile(logName, function(error, logData){
		if (error) {
			apputil.log(`Error retrieving log: \r\n ${error.stack}`);
			res.end(error);
		} else {
			// fs.readFileSync returns a buffer. Convert to string here
			res.send(logData.toString());
		}
	});
});

// Return web server status
app.get('/status', function(req, res) {
	res.send('UP');
});

// Arbitrary redirect hand-holder :)
app.get("/list", function(req, res) {
	res.redirect('/index.html');
});

// Handle Error response
app.use(function(err, req, res, next) {
	apputil.log("Error with server:\r\nError:\r\n" + err.stack + "\r\nStack:" + err.stack);
	res.status(500).send('Something broke!');
});

db.connect(config.mongoConnectionString, function(err) {
	if (err) {
		apputil.log(`Unable to connect to mongo. Error:\r\n${err}`);
		process.exit(1);
	}
	apputil.log("Opened db connection", null, true);

	app.listen(80, function () {
		apputil.log("Server listening on port 80", null, true);
	});
});