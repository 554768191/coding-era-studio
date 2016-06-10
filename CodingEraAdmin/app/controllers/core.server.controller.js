'use strict';

/**
 * Module dependencies.
 *
 */
var config = require('../../config/config');

exports.indexOpen = function(req, res) {
	res.render('index-open', {});
};

exports.index = function(req, res) {
	//req.user在调用passport的login之后才有值
	var user = req.user || null;
	var apiURL = config.codingera.apiURL;
	if(user){
		res.render('index', {
			user: user,
			apiURL : apiURL,
			request: req
		});
	}else{
		res.redirect('/auth/provider');
	}
};

exports.login = function(req, res) {
	res.render('login', {});
};