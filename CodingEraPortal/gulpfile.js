var gulp = require('gulp');
var runSequence = require('run-sequence');
var server = require('./config/gulp/server');
var validation = require('./config/gulp/validation');
var watch = require('./config/gulp/watch')

gulp.task('default', function(done) {
    // 将你的默认的任务代码放在这

    runSequence('lint','server','watch', done);
});