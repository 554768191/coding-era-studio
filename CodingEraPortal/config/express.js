/**
 * Created by Yan on 16/3/8.
 */
'use strict';

var express = require('express');
var consolidate = require('consolidate');
var homeRoute = require('../public/routes/home/home.routes');
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
    app.engine('.view.html', consolidate['swig']);
    app.set('view engine', '.view.html');
    app.set('views', './public/modules');


    //静态文件
    app.use('/static',express.static('./public/static'));
    app.use(express.static(path.resolve('./public')));

    //首页路由
    app.use('/', homeRoute);


    return app;
};