/**
 * Created by Jason.
 */
'use strict';
angular.module('todo').factory('TodoCustomService', ['$rootScope',
    function ($rootScope) {
        var service = {
            tasks: [
                {title: "Magician", members: "Raymond E. Feist"},
                {title: "The Hobbit", members: "J.R.R Tolkien"}
            ],
            addTask: function (task) {
                service.tasks.unshift(task);
                //service.tasks.push(task);
                //$rootScope.$broadcast('tasks.update');
            },
            createTask: function () {
                var task = {
                    id:null,
                    title:"",
                    members:"Jason",
                    content:"",
                    date:null,
                    status:false
                };
                return task;
            },
            toggleTaskStatus: function (task) {
                task.status = !task.status;
            }
        };
        return service;
    }]);

