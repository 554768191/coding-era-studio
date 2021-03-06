'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	path = require('path'),
	config = require('./config');

/**
 * Module init function.
 */
module.exports = function() {
	// Serialize sessions
	passport.serializeUser(function(user, done) {
		//done(null, user.id);
		done(null, user);
	});

	// Deserialize sessions
	passport.deserializeUser(function(id, done) {
		//User.findOne({
		//	_id: id
		//}, '-salt -password', function(err, user) {
		//	done(err, user);
		//});
		done(null, id);
	});

	// Initialize strategies
	config.getGlobbedFiles('./config/strategies/**/*.js').forEach(function(strategy) {
		require(path.resolve(strategy))();
	});
};
