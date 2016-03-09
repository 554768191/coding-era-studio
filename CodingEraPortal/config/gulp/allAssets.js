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
    port: 3000,
    templateEngine: 'swig',
    assets: {
        lib: {
            css: [
                'public/components/bootstrap/dist/css/bootstrap.css'
            ],
            js: [
                'public/components/jquery/dist/jquery.js',
                'public/components/bootstrap/dist/js/bootstrap.js'

            ]
        },
        sass:['public/modules/**/scss/*.scss'],
        css: ['public/modules/**/css/*.css'],
        js: [
            'public/modules/*/*.js',
            'public/modules/*/*[!tests]*/*.js'
        ],
        server: {
            gulpConfig: 'gulpfile.js',
            allJs: [ 'config/**/*.js', 'public/modules/*/*.js'],
            views: 'public/modules/**/*.html'
        }
    }
};
