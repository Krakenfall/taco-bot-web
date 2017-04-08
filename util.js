var fs = require('fs');
var http = require('http');
var request = require('request');
var configService = require('./services/configuration.js');

var log = function(data, file, logInConsole) {
	var logFile = "";
	if (file) {
		logFile = file;
	} else {
		logFile = "server.log";
	}
	try {
		fs.appendFileSync(logFile, new Date() + "\r\n");
		if (logInConsole) { console.log(data); }
		fs.appendFileSync(logFile, data + "\r\n\r\n");
	} catch (error) {
		console.log("Error: Failed to log data in " + file + "\r\nData: " + data);
	}
};

var getFileContents = function(filename, callback) {
	var contents = null;
	try {
		contents = fs.readFileSync(filename);
		callback(null, contents);
	} catch(err) {
		callback("Error: Could not read file " + filename + "\r\n" + err);
	}
};

// TODO: streamline this out with promises
function announceError(source, message, callback) {
	var logMessage = `${source}:\r\n${message}`;

	log(message);
	callback(logMessage);
}

module.exports = {
	readFile: getFileContents,
	log: log
};
