// Include third-party dependencies
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var express = require('express');
var bodyParser = require('body-parser');

var configService = require('./services/configuration.js');
var apputil = require("./util.js");

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
app.get('*', function(req, res) {
	res.redirect(`http://${config.domain}/index.html`);
});

// Return log, should this be an admin call?
app.get('/log', function(req, res) {
	var logName = "server.log";
	util.readFile(logName, function(error, logData){
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
	res.redirect('/list.html');
});

// Handle Error response
app.use(function(err, req, res, next) {
	apputil.log("Error with server:\r\nError:\r\n" + err.stack + "\r\nStack:" + err.stack);
	res.status(500).send('Something broke!');
});

app.listen(config.port, function () {
	apputil.log("Server listening on port " + config.port, null, true);
});
