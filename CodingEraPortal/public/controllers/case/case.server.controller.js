/**
 * Created by Yan on 16/4/12.
 */
'use strict';

var request = require('../comment/request.server.controller.js');

/**
 * 获取案例(作品)数据
 * @param req
 * @param res
 */
exports.getCases = function(req, res, next) {
    request.get('/case/list', function (body) {
        console.log(body.data);
        res.render('case/view/case',{resultData:body});
    });

};