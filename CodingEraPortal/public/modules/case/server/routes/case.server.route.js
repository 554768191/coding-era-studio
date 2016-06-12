'use strict';

var path = require('path');
var commonUtil = require(path.resolve('./public/modules/common/server/controllers/common-util.server.controller.js'));



module.exports = function(app) {

    var caseController = commonUtil.getControllerByName('case');
    app.route('/case').get(caseController.getCases);
    app.route('/case/:id').get(caseController.getCaseDetail);
};
