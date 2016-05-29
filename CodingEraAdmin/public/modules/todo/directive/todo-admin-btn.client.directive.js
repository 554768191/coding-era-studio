/**
 * Created by Jason on 15/12/17.
 */
"use strict";
angular.module('todo').directive("addTaskButton", ['TodoCustomService',
    function (TodoCustomService) {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                element.bind("click", function () {
                    TodoCustomService.addTask({title: "Star Wars", members: "George Lucas"});
                    //事件传递
                    scope.$broadcast('tasks.update');
                });
            }
        };
    }]);