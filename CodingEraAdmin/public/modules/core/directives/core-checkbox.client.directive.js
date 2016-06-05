/**
 * Created by Jason on 16/06/04.
 *
 * checkbox多级联指令
 *
 * @see https://github.com/Luxiyalu/angular-checkbox-set/
 *
 * DEMO:
 *<ce-checkbox key="'r'" status-stored-in="role"></ce-checkbox>r
 *<ce-checkbox key="'r1'" parent="'r'" status-stored-in="resources[0]"></ce-checkbox>r1
 *<ce-checkbox key="'r11'" parent="'r1'" status-stored-in="permissions[0]"></ce-checkbox>r11
 *<ce-checkbox key="'r12'" parent="'r1'" status-stored-in="permissions[1]"></ce-checkbox>r12
 *<ce-checkbox key="'r2'" parent="'r'" status-stored-in="resources[1]"></ce-checkbox>r2
 *<ce-checkbox key="'r21'" parent="'r2'" status-stored-in="permissions[3]"></ce-checkbox>r21
 *<ce-checkbox key="'r22'" parent="'r2'" status-stored-in="permissions[4]"></ce-checkbox>r22
 *
 */
"use strict";
    angular.module('core')

        .value('checkboxs', {})

        .directive('ceCheckbox', [
        '$rootScope','$timeout','$uibPosition','ceUtil','checkboxs',
        function($rootScope,$timeout,$uibPosition,ceUtil,checkboxs) {
        return {
            restrict: 'E',
            scope:{
                key: '=',
                parent: '=',
                statusStoredIn: '='
            },
            template:'<input type="checkbox" ng-click="toggleCheck();" ng-checked="statusStoredIn.checked">',
            //replace:true,
            link: function(scope, element, attrs) {
                var broadcastUpdate, emitUpdate, key, parent, pcb, checkbox, statusObj;
                checkbox = {};
                key = scope.key;
                parent = scope.parent;
                statusObj = angular.isDefined(scope.statusStoredIn) ? scope.statusStoredIn : scope.statusStoredIn = {isNew:true};
                statusObj.checked = angular.isDefined(statusObj.checked) ? statusObj.checked : false;

                // if my parent already exists, check its status, follow its status
                // and broadcast my status to my potential children at the end
                // (my scope toggleCheck hasn't been defined yet)
                if (angular.isDefined(parent)) {
                    if (angular.isDefined(checkboxs[parent])) {
                        pcb = checkboxs[parent];
                        statusObj.checked = pcb.scope.statusStoredIn.checked;
                    } else {
                        pcb = checkboxs[parent] = {};
                    }
                    checkbox.scope = scope;
                    checkbox.parent = parent;
                    checkbox.statusObj = statusObj;
                    if (angular.isUndefined(pcb.children)) {
                        pcb.children = [];
                    }
                    pcb.children.push(checkbox);
                }
                if (angular.isDefined(key)) {
                    checkbox = angular.isDefined(checkboxs[key]) ? checkboxs[key] : checkboxs[key] = {};
                    if (angular.isUndefined(checkbox.scope)) {
                        checkbox.scope = scope;
                    }
                    checkbox.parent = parent;

                    // as a parent, have an api to check if all its children is of a certain state.
                    // If they're all checked, check itcheckbox.
                    scope.checkIfAll = function(state) {
                        var result;
                        result = checkbox.children.every(function(e, i, a) {
                            return e.statusObj.checked === state;
                        });
                        return result;
                    };
                }
                scope.toggleCheck = function(specify, direction) {
                    statusObj.checked = angular.isDefined(specify) ? specify : !statusObj.checked;
                    // if specify exists then this is not user action
                    if (angular.isUndefined(specify)) {
                        broadcastUpdate();//通知子
                        return emitUpdate();//通知父
                    } else if (direction === 'broadcast') {
                        return broadcastUpdate();
                    } else if (direction === 'emit') {
                        return emitUpdate();
                    }
                };

                // parent ask children
                // everything below me should update their status to my status
                broadcastUpdate = function() {
                    //console.log('broadcastUpdate');
                    var child, _i, _len, _ref, _results;
                    // 有children才继续广播
                    if (angular.isUndefined((angular.isDefined(checkbox) ? checkbox.children : void 0))) {
                        return;
                    }
                    _ref = checkbox.children;
                    _results = [];
                    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                        child = _ref[_i];
                        _results.push(child.scope.toggleCheck(statusObj.checked, 'broadcast'));
                    }
                    return _results;
                };

                // child ask parents
                // everything above me:
                // if i'm unchecked, uncheck all the way up
                // if i'm checked, ask my parents to check. If its children (my siblings) are all checked, check my parent, then contunue emitting.
                emitUpdate = function() {
                    //console.log('emitUpdate');
                    if (angular.isUndefined(parent)) {
                        return;
                    }
                    if (!statusObj.checked) {
                        return pcb.scope.toggleCheck(false, 'emit');
                    } else {
                        if (!pcb.scope.checkIfAll(true)) {
                            return;
                        }
                        return pcb.scope.toggleCheck(true, 'emit');
                    }
                };

                if (angular.isDefined(key)) {

                    //该事件会自动把勾选状态传播到子级
                    scope.$on('checkboxChangedToChildren', function(event, data) {
                        if(key === data) {
                            //console.log('checkboxChanged', data);
                            scope.toggleCheck(statusObj.checked, 'broadcast');
                        }
                    });

                    //该事件会自动把勾选状态传播到父级
                    scope.$on('checkboxChangedToParents', function(event, data) {
                        if(key === data){
                            //console.log('checkboxChanged' + key, data);
                            scope.toggleCheck(statusObj.checked, 'emit');
                        }
                    });

                    //recycle my position in checkboxHooks if I'm destroyed
                    return scope.$on('$destroy', function() {
                        return delete checkboxs[key];
                    });
                }
            }
        };
    }]);