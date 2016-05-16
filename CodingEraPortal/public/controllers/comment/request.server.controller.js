'use strict';

/**
 *
 * request api
 *
 * Module dependencies.
 */
var _ = require('lodash');
var request = require('request');
var config = require('../../../config/config');


exports.get = function (url, done) {
    function callback(error, response, body) {
        //我们后台不标准,暂时修改
        //if (!error && response.statusCode == 200) {
        //    done(null, JSON.parse(body));
        //} else {
        //    done(JSON.parse(body));
        //}

        if (!error && response.result == 'error') {
            done(null, JSON.parse(body));
        } else {
            done(JSON.parse(body));
        }
    }
    request(config.apiURL + url, callback);
};
exports.getWithToken = function (url, token, done) {
    var options = {
        url: url,
        headers: {
            "Authorization": ' bearer ' + token
        }
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            done(null, JSON.parse(body));
        } else {
            done(JSON.parse(body));
        }
    }

    request(options, callback);
};
exports.postWithToken = function (url, data, token, done) {
    var options = {
        url: url,
        form: data,
        headers: {
            "Authorization": ' bearer ' + token
        }
    };
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            done(null, JSON.parse(body));
        } else {
            done(JSON.parse(body));
        }
    }

    request.post(options, callback);

};
exports.post = function (url, data, done) {
    var options = {
        url: url,
        form: data
    };
    function callback(error, response, body) {
        if(error){
            return done(error);
        }else{
            if(!response)
                return done(500);
            if(response.statusCode == 200)
                return done(null, JSON.parse(body));
            if(body){
                done(body);
            }else{
                done(response.statusCode);
            }
        }
    }
    request.post(options, callback);

};

