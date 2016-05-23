'use strict';

/**
 *
 * request api
 *
 * Module dependencies.
 */
var _ = require('lodash');
var path = require('path');

exports.getControllerByName = function(moduleName) {
    return require(path.resolve('./public/modules/'+moduleName+'/server/controllers/'+moduleName+'.server.controller.js'));
};

exports.getRequest = function(){
    return require(path.resolve('./public/modules/common/server/controllers/request.server.controller.js'));
};