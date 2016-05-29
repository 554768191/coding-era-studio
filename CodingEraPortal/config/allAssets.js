/**
 * Created by Yan on 16/3/8.
 */

'use strict';

module.exports = {
    app: {
        title: 'Coding Era - 编码时代工作室',
        description: 'Coding Era工作室',
        keywords: 'mongodb, express, angularjs, node.js, mongoose, passport'
    },
    port: 4000,
    templateEngine: 'swig',
    apiURL:'http://localhost:8080/api/open',
    assets: {
        lib: {
            css: [
                'public/components/bootstrap/dist/css/bootstrap.css'
            ],
            js: [
                'public/components/jquery/dist/jquery.js',
                'public/components/bootstrap/dist/js/bootstrap.js',
                //debug(生产时,记得换非debug的包)
                'public/components/artTemplate/dist/template-native-debug.js',
                //moment时间插件
                'public/components/moment/min/moment.min.js'
            ]
        },
        sass:['public/modules/**/client/scss/*.scss'],
        css: ['public/modules/**/client/css/*.css'],
        js: [
            'public/modules/**/client/controllers/*.js',
            'public/modules/*/*[!tests]*/*.js'
        ],
        server: {
            gulpConfig: 'gulpfile.js',
            allJs: [ 'config/**/*.js', 'public/modules/*/*.js','public/routes/*/*.js','public/**/client/controllers/**/*.js'],
            views: 'public/modules/**/*.html'
        }
    }
};
