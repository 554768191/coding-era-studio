/**
 * Created by Yan on 15/12/3.
 */
'use strict';

angular.module('core').run(['ContentHead',
    function(ContentHead) {
        ContentHead.setTitle('Dashboard');
    }
]);