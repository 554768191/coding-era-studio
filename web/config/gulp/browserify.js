///*
///!**
// * Created by admin on 16/1/26.
// *
// *
// * 参考文章:
// *
// * 前端模块及依赖管理的新选择：Browserify
// * http://segmentfault.com/a/1190000002941361
// *
// * 在 Gulp 中使用 Browserify
// * http://csspod.com/using-browserify-with-gulp/
// *!/
//
//var init = require('../init')();
//var config = require('../config');
//
//var gulp = require("gulp");
//var browserify = require("browserify");//让原本属于服务器端的Node及npm，在浏览器端也可使用。怕了?!
//var sourcemaps = require("gulp-sourcemaps");//读取内联sourcemap,其转写为一个单独的sourcemap文件
//
//var source = require('vinyl-source-stream');//用于将Browserify的bundle()的输出转换为Gulp可用的vinyl（一种虚拟文件格式）流
//var buffer = require('vinyl-buffer');//用于将vinyl流转化为buffered vinyl文件（gulp-sourcemaps及大部分Gulp插件都需要这种格式）。
//
//var uglify = require('gulp-uglify');
//var through2 = require('through2');
//
//gulp.task("browserify", function () {
//    //var b = browserify({
//    //    //
//    //    entries: "./javascripts/src/main.js",
//    //
//    //    //告知Browserify在运行同时生成内联sourcemap用于调试
//    //    debug: true
//    //});
//    //
//    //return b.bundle()
//    //    .pipe(source("bundle.js"))
//    //    .pipe(buffer())
//    //    .pipe(sourcemaps.init({loadMaps: true}))
//    //    .pipe(sourcemaps.write("."))
//    //    .pipe(gulp.dest("./javascripts/dist"));
//
//
//    var files = config.getJavaScriptAssets(null, true);
//    console.log('Jason test', files);
//    var b = browserify();
//    files.forEach(function(file) {
//        b.add(file);
//    });
//    b.bundle()
//        .pipe(source('output.js'))
//        .pipe(buffer())
//        .pipe(uglify())
//        .pipe(gulp.dest('./public/dist'));
//
//    //return gulp.src('./src/js/app.js')
//    //    .pipe(through2.obj(function (file, enc, next) {
//    //        browserify(file.path)
//    //            .bundle(function (err, res) {
//    //                if(err) console.log(err.stack);
//    //                file.contents = res;
//    //                next(null, file);
//    //            });
//    //    }))
//    //    .pipe(uglify()) // uglify
//    //    .pipe(gulp.dest('./dist/js'));
//});
//
//*/
