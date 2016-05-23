'use strict';


var path = require('path');
var commonUtil = require(path.resolve('./public/modules/common/server/controllers/common-util.server.controller.js'));
var request = commonUtil.getRequest();




exports.getContact = function(req, res, next) {
    //request.get('/article/ABOUT', function (body) {
        res.render('contact/client/views/contact');
    //});

};