'use strict';
/**
 * Module dependencies.
 */
var allAssets = require('./config/allAssets'),
	chalk = require('chalk');


// Init the express application
var app = require('./config/express')();

// Start the app by listening on <port>
app.listen(allAssets.port);

// Expose app
//exports = module.exports = app;

// Logging initialization
console.log('--');
console.log(chalk.green(' application started'));
console.log(chalk.green('Environment:\t\t\t' + process.env.NODE_ENV));
console.log(chalk.green('Port:\t\t\t\t' + allAssets.port));
if (process.env.NODE_ENV === 'secure') {
	console.log(chalk.green('HTTPs:\t\t\t\ton'));
}
console.log('--');
