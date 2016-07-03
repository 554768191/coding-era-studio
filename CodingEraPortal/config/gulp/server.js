/**
 * Created by Yan on 16/3/8.
 */
"use strict";

var gulp = require('gulp');
var allAssets = require('./../allAssets');
var chalk = require('chalk');
var $ = require('gulp-load-plugins')();
var _ = require('lodash');

var app = require('../express')();


//启动express
gulp.task('server', function () {

    app.listen(allAssets.port);

    console.log('--');
    console.log(chalk.green(' application started'));
    console.log(chalk.green('Port:\t\t\t\t' + allAssets.port));
    console.log('--');
});