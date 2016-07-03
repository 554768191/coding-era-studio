'use strict';

var _ = require('lodash');
var path = require('path');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var $ = require('gulp-load-plugins')();
var config = require('../config');
var plumber = require('gulp-plumber');

var assets = _.union(
    config.getJavaScriptAssets(),
    config.getCSSAssets()
);
function buildScripts() {
    return gulp.src(assets) // 要压缩的js文件
        .pipe(plumber())
        .pipe($.eslint())   // 校验
        .pipe($.eslint.format());
}


//js压缩
gulp.task('scripts-min', function () {
    del(['public/dist/js/*']);// 清空旧文件
    return buildScripts()
        .pipe(plumber())
        .pipe($.concat('all.js'))
        .pipe($.uglify()) // 压缩
        .pipe(gulp.dest('public/dist/js')); //压缩后的路径
});

//js校验
gulp.task('jshint', function () {
    return gulp.src(assets)
        .pipe(plumber())
        .pipe($.jshint())
        .pipe($.jshint.reporter('default'))
        .pipe($.jshint.reporter('fail'));
});


gulp.task('scripts', function (done) {
    runSequence('jshint', ['scripts-min'], done);
});