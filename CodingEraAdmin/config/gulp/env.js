/**
 * Created by admin on 15/12/5.
 */

var gulp = require('gulp');

//开发模式
gulp.task('env:dev', function () {
    process.env.NODE_ENV = 'development';
});

//生产模式
gulp.task('env:prod', function () {
    process.env.NODE_ENV = 'production';
});