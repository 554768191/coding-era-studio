'use strict';


/**
 * Created by Yan on 16/4/12.
 */
var path = require('path');
var commonUtil = require(path.resolve('./public/modules/common/server/controllers/common-util.server.controller.js'));
var request = commonUtil.getRequest();




exports.getAbout = function(req, res, next) {
    request.get('/article/ABOUT', function (body) {
        res.render('about/client/views/about',{resultData:body});
    });

};