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
exports.getCases = function(req, res, next) {


    var tagId ='';
    if(typeof req.query.tagId != 'undefined'){
        tagId = '?tagId=' + req.query.tagId;
    }

    request.get('/case/list' + tagId, function (body) {
        res.render('case/client/views/case',{resultData:body});
    });

};

exports.getCaseDetail = function(req, res, next) {
    var caseId = req.params.id;
    request.get('/case/'+caseId, function (body) {
        res.render('case/client/views/case-detail',{resultData:body});
    });

};

exports.getTags = function(req, res, next) {
    request.get('/tag', function (body) {
        res.json(body);
    });

};