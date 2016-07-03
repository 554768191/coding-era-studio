/**
 * Created by Yan on 16/3/8.
 */

'use strict';

module.exports = {
    apiURL:'http://ws.codingera.com/api/open',
    assets: {
        lib: {
            css: [
                'public/components/bootstrap/dist/css/bootstrap.css'
            ],
            js: [
                'public/components/jquery/dist/jquery.js',
                'public/components/bootstrap/dist/js/bootstrap.js',
                'public/components/artTemplate/dist/template-native.js',
                'public/components/moment/min/moment.min.js'
            ]
        },
        css: ['public/dist/css/*.css'],
        js: ['public/dist/js/*.js']
    }
};
