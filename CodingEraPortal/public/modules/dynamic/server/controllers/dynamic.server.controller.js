'use strict';



var path = require('path');
var commonUtil = require(path.resolve('./public/modules/common/server/controllers/common-util.server.controller.js'));
var request = commonUtil.getRequest();


exports.getDynamic = function(req, res, next) {
    //TODO
    //静态处理已记录在v2.0任务中,这里1.0暂时获取前15页
    request.get('/dynamic/list?size=15&page=0', function (body) {
        res.render('dynamic/client/views/dynamic',{resultData:body});
    });

};