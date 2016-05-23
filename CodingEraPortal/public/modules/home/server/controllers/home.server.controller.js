/**
 * Created by Yan on 16/4/12.
 */
'use strict';

var path = require('path');
var commonUtil = require(path.resolve('./public/modules/common/server/controllers/common-util.server.controller.js'));
var request = commonUtil.getRequest();



/**
 * 获取案例(作品)数据
 * @param req
 * @param res
 */
exports.getHome = function(req, res, next) {
    res.render('home/client/views/home')
};