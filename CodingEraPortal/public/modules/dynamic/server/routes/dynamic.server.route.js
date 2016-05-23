'use strict';



var path = require('path');
var commonUtil = require(path.resolve('./public/modules/common/server/controllers/common-util.server.controller.js'));



module.exports = function(app) {

    var ctrl = commonUtil.getControllerByName('dynamic');
    app.route('/dynamic').get(ctrl.getDynamic);
};