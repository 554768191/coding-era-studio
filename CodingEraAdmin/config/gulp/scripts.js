'use strict';

var _ = require('lodash');
var path = require('path');
var gulp = require('gulp');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var del = require('del');
var allAssets = _.extend(
    require('../env/all'),
    require('../env/development')
);

var $ = require('gulp-load-plugins')();

var assets = _.union(
    allAssets.assets.js
);

gulp.task('scripts-reload', function () {
    return buildScripts()
        .pipe(browserSync.stream());
});

gulp.task('scripts-min', function () {
    del(['public/dist/js/*']);// 清空旧文件
    return buildScripts()
        .pipe($.concat('all.js'))
        .pipe($.uglify()) // 压缩
        //.pipe($.rename(function (file) {
        //    file.extname = '.min' + file.extname;
        //}))
        .pipe(gulp.dest('public/dist/js')); //压缩后的路径
});

//js压缩
function buildScripts() {
    return gulp.src(assets) // 要压缩的js文件
        .pipe($.eslint())   // 校验
        .pipe($.eslint.format());
}

//js校验
gulp.task('jshint', function () {
    return gulp.src(assets)
        .pipe($.jshint())
        .pipe($.jshint.reporter('default'))
        .pipe($.jshint.reporter('fail'));
});


gulp.task('scripts', function (done) {
    runSequence('jshint', ['scripts-min'], done);
});