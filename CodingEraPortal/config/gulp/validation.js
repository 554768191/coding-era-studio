///**
// * Created by Yan on 16/3/8.
// */
//var gulp = require('gulp');
//var allAssets = require('./../allAssets');
//var path = require('path');
//var $ = require('gulp-load-plugins')();
//var runSequence = require('run-sequence');
//
////编译sass
//gulp.task('sass', function () {
//    return gulp.src(allAssets.assets.sass)
//        .pipe($.sass())
//        .pipe($.rename(function (file) {
//            file.dirname = file.dirname.replace(path.sep + 'scss', path.sep + 'css');
//        }))
//        .pipe(gulp.dest('./public/modules/'));
//});
//
////CSS校验
//gulp.task('csslint', function (done) {
//    return gulp.src(allAssets.assets.css)
//        .pipe($.csslint('.csslintrc'))
//        .pipe($.csslint.reporter())
//        .pipe($.csslint.reporter(function (file) {
//            if (!file.csslint.errorCount) {
//                done();
//            }
//        }));
//});
//
////js校验
//gulp.task('jshint', function () {
//    return gulp.src(allAssets.assets.js)
//        .pipe($.jshint())
//        .pipe($.jshint.reporter('default'))
//        .pipe($.jshint.reporter('fail'));
//});
//
//
//
////齐齐校验
//gulp.task('lint', function (done) {
//    runSequence( 'sass', ['csslint', 'jshint'], done);
//});