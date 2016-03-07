/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are splitted in several files in the gulp directory
 *  because putting all here was really too fucking long
 */

'use strict';

var gulp = require('gulp');
var wrench = require('wrench');//递归文件夹操作
var runSequence = require('run-sequence');

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./config/gulp').filter(function(file) {
    return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
    require('./config/gulp/' + file);
});

gulp.task('default', function (done) {
    //参数1:开发模式
    //参数2:校验
    //参数3:开启服务
    //runSequence('env:dev', 'lint',['nodemon','watch'], done);
    runSequence('env:dev', 'lint',['browser-sync','watch'], done);
});