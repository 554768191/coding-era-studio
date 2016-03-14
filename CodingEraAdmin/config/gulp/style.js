/**
 * Created by admin on 15/12/5.
 */
var _ = require('lodash');
var gulp = require('gulp');
var server = require('gulp-express');
var runSequence = require('run-sequence');
var allAssets = require('../env/all');
var path = require('path');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');

//编译sass & 自动注入到浏览器
gulp.task('sass', function () {
    return gulp.src(allAssets.assets.sass)
        .pipe($.sass())
        // .pipe(plugins.autoprefixer())
        .pipe($.rename(function (file) {
            file.dirname = file.dirname.replace(path.sep + 'scss', path.sep + 'css');
        }))
        .pipe(gulp.dest('./public/modules/'))
        .pipe(browserSync.stream());
});

//CSS校验
gulp.task('csslint', function (done) {
    return gulp.src(allAssets.assets.css)
        .pipe($.csslint('.csslintrc'))
        .pipe($.csslint.reporter())
        .pipe($.csslint.reporter(function (file) {
            if (!file.csslint.errorCount) {
                done();
            }
        }));
});

//齐齐校验
gulp.task('lint', function (done) {
    runSequence( 'sass', ['csslint', 'jshint'], done);
});