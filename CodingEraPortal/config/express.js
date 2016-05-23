/**
 * Created by Yan on 16/3/8.
 */
'use strict';

var express = require('express');
var consolidate = require('consolidate');
var compression = require('compression');
var config = require('./config');
var path = require('path');

module.exports = function() {

    var app = express();

    //公用配置
    app.locals.title = config.app.title;
    app.locals.description = config.app.description;
    app.locals.keywords = config.app.keywords;
    app.locals.jsFiles = config.getJavaScriptAssets();
    app.locals.cssFiles = config.getCSSAssets();


    //配置模板引擎
    app.engine('client.view.html', consolidate['swig']);
    app.set('view engine', 'client.view.html');
    app.set('views', './public/modules/');

    //静态文件
    app.use('/static',express.static('./public/static'));
    app.use(express.static(path.resolve('./public')));


    require('../public/modules/home/server/routes/home.server.route')(app);

    //自动加载路由
    config.getGlobbedFiles('./public/modules/**/server/routes/*.server.route.js').forEach(function(routePath) {
        require(path.resolve(routePath))(app);
    });

    return app;
};