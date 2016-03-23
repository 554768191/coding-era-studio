/**
 * Created by admin on 15/12/5.
 */

var gulp = require('gulp');
var runSequence = require('run-sequence');

//开发模式
gulp.task('dev', function (done) {
    process.env.NODE_ENV = 'development';
    runSequence('sass', 'csslint', 'jshint', ['browser-sync','watch'], done);
});

//生产模式
gulp.task('prod', function (done) {
    process.env.NODE_ENV = 'production';
    runSequence('css', 'scripts', 'html', ['browser-sync','watch'], done);
});