'use strict';

/**
 *
 * 用户认证
 *
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller'),
	config = require('../../../config/config'),
	passport = require('passport');
var http = require('http');
var querystring = require('querystring');

/**
 * Signup
 */
exports.signup = function(req, res) {
	//TODO 用户注册功能待开发
	//// For security measurement we remove the roles from the req.body object
	//delete req.body.roles;
    //
	//// Init Variables
	//var user = new User(req.body);
	//var message = null;
    //
	//// Add missing user fields
	//user.provider = 'local';
	//user.displayName = user.firstName + ' ' + user.lastName;
    //
	//// Then save the user
	//user.save(function(err) {
	//	if (err) {
	//		return res.status(400).send({
	//			message: errorHandler.getErrorMessage(err)
	//		});
	//	} else {
	//		// Remove sensitive data before login
	//		user.password = undefined;
	//		user.salt = undefined;
    //
	//		req.login(user, function(err) {
	//			if (err) {
	//				res.status(400).send(err);
	//			} else {
	//				res.json(user);
	//			}
	//		});
	//	}
	//});
};

/**
 * Signin after passport authentication
 */
exports.signin = function(req, res, next) {
	//本地登录功能,暂时没用,我们用的是oauth
	console.log('signin route', req);
	//passport.authenticate('local', function(err, user, info) {
	//	if (err || !user) {
	//		res.status(400).send(info);
	//	} else {
	//		// Remove sensitive data before login
	//		user.password = undefined;
	//		user.salt = undefined;
    //
	//		req.login(user, function(err) {
	//			if (err) {
	//				res.status(400).send(err);
	//			} else {
	//				res.json(user);
	//			}
	//		});
	//	}
	//})(req, res, next);
};

/**
 * Signout
 */
exports.signout = function(req, res) {
	return function(req, res) {
		//todo 退出涉及到清除token,和浏览器重定向,这里还要优化
		var user = req.user;
		var url = config.codingera.logoutURL;
		if(user){
			//var contents = querystring.stringify({
			//	next : '123'
			//});
			var body = '';
			var req1 = http.request(url, function(res1) {
				console.log("响应：" + res1.statusCode);
				res1.on('data',function(d){
					body += d;
				}).on('end', function(){
					req.logout();
					res.redirect(url);
				});
			}).on('error', function(e) {
				console.log("错误：" + e.message);
			});
			req1.setHeader("Authorization", ' bearer ' + user.accessToken);
			//req1.write(contents);
			req1.end();  //不能漏掉，结束请求，否则服务器将不会收到信息。
		}else{
			//req.logout();
			res.redirect('/');
		}
	}(req, res);
};

/**
 * OAuth callback
 */
exports.oauthCallback = function(strategy) {
	return function(req, res, next) {
		//所有oauth登录的回到
		passport.authenticate(strategy, function(err, user, redirectURL) {
			console.log("oauthCallback err", err);
			if (err || !user) {
				return res.redirect('/#!/signin');
			}
			req.login(user, function(err) {
				if (err) {
					return res.redirect('/#!/signin');
				}
				return res.redirect(redirectURL || '/');
			});
		})(req, res, next);
	};
};

/**
 * Helper function to save or update a OAuth user profile
 */
exports.saveOAuthUserProfile = function(req, providerUserProfile, done) {
	//第三方登录时(github)要保存第三方用户信息
	console.log("providerUserProfile", providerUserProfile);
	console.log('req.user', req.user);
	if (!req.user) {
		// Define a search query fields
		var searchMainProviderIdentifierField = 'providerData.' + providerUserProfile.providerIdentifierField;
		var searchAdditionalProviderIdentifierField = 'additionalProvidersData.' + providerUserProfile.provider + '.' + providerUserProfile.providerIdentifierField;

		// Define main provider search query
		var mainProviderSearchQuery = {};
		mainProviderSearchQuery.provider = providerUserProfile.provider;
		mainProviderSearchQuery[searchMainProviderIdentifierField] = providerUserProfile.providerData[providerUserProfile.providerIdentifierField];

		// Define additional provider search query
		var additionalProviderSearchQuery = {};
		additionalProviderSearchQuery[searchAdditionalProviderIdentifierField] = providerUserProfile.providerData[providerUserProfile.providerIdentifierField];

		// Define a search query to find existing user with current provider profile
		var searchQuery = {
			//$or: [mainProviderSearchQuery, additionalProviderSearchQuery]
		};

		//User.findOne(searchQuery, function(err, user) {
		//	if (err) {
		//		return done(err);
		//	} else {
				var user =  providerUserProfile.user;
				if (!user) {
					return done(new Error('用户不存在'));
					//var possibleUsername = providerUserProfile.username || ((providerUserProfile.email) ? providerUserProfile.email.split('@')[0] : '');

					//User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
					//	user = new User({
					//		firstName: providerUserProfile.firstName,
					//		lastName: providerUserProfile.lastName,
					//		username: availableUsername,
					//		displayName: providerUserProfile.displayName,
					//		email: providerUserProfile.email,
					//		provider: providerUserProfile.provider,
					//		providerData: providerUserProfile.providerData
					//	});
                    //
					//	// And save the user
					//	user.save(function(err) {
					//		return done(err, user);
					//	});
					//});
				} else {
					var err = null;
					return done(err, user, "/#!/demo");
				}
			//}
		//});
	} else {
		// User is already logged in, join the provider data to the existing user
		var user = req.user;

		// Check if user exists, is not signed in using this provider, and doesn't have that provider data already configured
		//if (user.provider !== providerUserProfile.provider && (!user.additionalProvidersData || !user.additionalProvidersData[providerUserProfile.provider])) {
		//	// Add the provider data to the additional provider data field
		//	if (!user.additionalProvidersData) user.additionalProvidersData = {};
		//	user.additionalProvidersData[providerUserProfile.provider] = providerUserProfile.providerData;
        //
		//	// Then tell mongoose that we've updated the additionalProvidersData field
		//	user.markModified('additionalProvidersData');
        //
		//	// And save the user
		//	user.save(function(err) {
		//		return done(err, user, '/#!/settings/accounts');
		//	});
		//} else {
			return done(new Error('User is already connected using this provider'), user);
		//}
	}
};

/**
 * Remove OAuth provider
 */
exports.removeOAuthProvider = function(req, res, next) {
	//var user = req.user;
	//var provider = req.param('provider');
    //
	//if (user && provider) {
	//	// Delete the additional provider
	//	if (user.additionalProvidersData[provider]) {
	//		delete user.additionalProvidersData[provider];
    //
	//		// Then tell mongoose that we've updated the additionalProvidersData field
	//		user.markModified('additionalProvidersData');
	//	}
    //
	//	user.save(function(err) {
	//		if (err) {
	//			return res.status(400).send({
	//				message: errorHandler.getErrorMessage(err)
	//			});
	//		} else {
	//			req.login(user, function(err) {
	//				if (err) {
	//					res.status(400).send(err);
	//				} else {
	//					res.json(user);
	//				}
	//			});
	//		}
	//	});
	//}
};

exports.findOrCreate = function(url, token, done) {
	//todo Jason 获取当前登录用户信息,这里是否要加用户身份校验?
	var result = "";
	var req = http.request(url, function(res) {
		console.log("响应：" + res.statusCode);
		res.on('data',function(data){
			result += data;
		}).on('end', function(){
			done(JSON.parse(result));
		});
	}).on('error', function(e) {
		console.log("findOrCreate 错误：" + e.message);
	});
	req.setHeader("Authorization", ' bearer ' + token);
	req.end();  //不能漏掉，结束请求，否则服务器将不会收到信息。
};