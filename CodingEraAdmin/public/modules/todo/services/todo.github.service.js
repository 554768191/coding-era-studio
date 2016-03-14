/**
 * Created by Jason.
 */
'use strict';
angular.module('todo').factory('GitHubService', ['$http', '$resource', '$log', 'ceConfig',
    function ($http, $resource, $log, ceConfig) {
        var service = {
            //利用GitHub API对库进行搜索,q参数属于搜索字符串
            searchRepos: function searchRepos(query, callback) {
                $http.get('https://api.github.com/search/repositories', {params: {q: query}})
                    .success(function (data) {
                        callback(null, data);
                    })
                    .error(function (e) {
                        callback(e);
                    });
            },
            //获取来自库的数据,name必须为完整名称（结构为：作者名称、斜杠、库名称——例如angular/angular.js）
            getRepo: function getRepo(name, callback) {
                $http.get('https://api.github.com/repos/'+ name)
                    .success(function (data) {
                        callback(null, data);
                    })
                    .error(function (e) {
                        callback(e);
                    });
            },
            //获取库中的README文件
            getReadme: function getReadme(name, callback) {
                $http.get('https://api.github.com/repos/'+ name +'/readme')
                    .success(function (data) {
                        //todo 中文乱码问题未解决
                        //atob()函数解码README文件的内容，因为它采用base64编码机制
                        callback(null, atob(data.content));
                    })
                    .error(function (e) {
                        callback(e);
                    });
            },
            //获取用户的库
            getUserRepos: function getUser(name, callback) {
                $http.get('https://api.github.com/users/'+ name +'/repos')
                    .success(function (data) {
                        callback(null, data);
                    })
                    .error(function (e) {
                        callback(e);
                    });
            }
        };
        return service;
    }
]);

