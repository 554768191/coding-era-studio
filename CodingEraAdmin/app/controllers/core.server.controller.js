'use strict';

/**
 * Module dependencies.
 *
 * req.user:调用passport的login之后才有值
 *
 */
exports.index = function(req, res) {
	var user = req.user || null;
	if(user){
		res.render('index', {
			user: user,
			request: req
		});
	}else{
		res.redirect('/auth/provider');
	}
};

exports.login = function(req, res) {
	res.render('login', {});
};