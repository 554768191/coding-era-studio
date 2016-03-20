'use strict';

/**
 *
 * 用户授权
 *
 * Module dependencies.
 */
var _ = require('lodash');

/**
 * Require login routing middleware
 */
exports.requiresLogin = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send({
            message: 'User is not logged in'
        });
    }
    next();
};

/**
 * User authorizations routing middleware
 */
exports.hasAuthorization = function (roles) {
    var that = this;
    return function (req, res, next) {
        that.requiresLogin(req, res, function () {
            if (_.intersection(req.user.roles, roles).length) {
                return next();
            } else {
                return res.status(403).send({
                    message: 'User is not authorized'
                });
            }
        });
    };
};
