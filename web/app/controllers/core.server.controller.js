'use strict';

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	//console.log('jason', res);
	console.log('jason', req.user);
	res.render('index', {
		user: req.user || null,
		request: req
	});
};
