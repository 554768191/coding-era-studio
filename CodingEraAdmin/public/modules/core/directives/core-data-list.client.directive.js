/**
 * Created by Yan on 15/12/3.
 */
"use strict";

angular.module('core')
    .directive('ceDataList', [
        function() {
            return {
                restrict:'E',
                scope:{
                    ceData:'=',
                    pagePreviousClick: '&',
                    pageNextClick: '&',
                    smallSize:'@',
                },
                priority:100,
                replace: true,
                transclude: true,
                template:['<div class="ce-data-list" >',

                                '<div class="ce-data-data-empty" ng-if="ceData.totalElements == 0"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> 目前没有数据  </div>',
                                '<div class="row data-row-container" >',
                                    '<div class="col-xs-12"  ng-class="{\'col-md-12\':!smallSize,\'col-md-6\':smallSize}" ng-repeat="item in ceData.content">',
                                        '<div class="ce-data-preview" ce-index="$index" ng-model="item" ng-transclude>',
                                        '</div>',
                                    '</div>',
                                '</div>',
                                '<nav ng-if="ceData.totalPages && (!ceData.first||!ceData.last)">',
                                    '<ul class="pager" >',
                                        '<li class="previous" ng-if="!ceData.first"><a ng-click="pagePreviousClick()"><span class="glyphicon glyphicon-menu-left" aria-hidden="true"></span> 上一页</a></li>',
                                        '<li class="next" ng-if="!ceData.last" ><a ng-click="pageNextClick()">下一页 <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></a></li>',
                                    '</ul>',
                                '</nav>',
                            '</div>',
                        ].join('')
            };
    }])
    .directive('ceDataToolbar', [
        function() {
            return {
                restrict:'E',
                replace: true,
                transclude: true,
                scope:{
                    statusKey:'@'
                },
                controller:['$scope',function($scope){
                    /**
                     * 不明白为什么是两个$parent.$parent才找到「 item 」
                     * (可能是因为使用了ngRepeat)
                     */

                     // 传值「 item 」到子指令 -> ceDataToolbarBtn
                    this.item =  $scope.$parent.$parent.item;

                    // 传值「 statusKey 」到子指令 -> ceDataToolbarBtn
                    this.statusKey = $scope.statusKey;

                    // 显示工具栏逻辑
                    $scope.itemBtnCount = 0;
                    this.countItemBtn = function (){
                        $scope.itemBtnCount ++;
                    };
                }],
                template:'<div ng-class="{\'show-btn\':itemBtnCount>0}"  class="ce-data-toolbar" ng-transclude></div>',
                link: function(scope, ele,attr,selfCtrl) {
                    // seflCtrl = 上面的 controller
                    // 获取自己的 Controller 中传入的值
                    scope.item = selfCtrl.item;
                }
            };
        }])
    .directive('ceDataToolbarBtn', [
        function() {
            return {
                restrict:'E',
                require: '^ceDataToolbar',
                replace: true,
                scope: {
                    eventHandler: '&ceClick',
                    title:'@',
                    icon:'@',
                    statusEquals:'@'
                },
                template:[
                    '<div class="toolbar-btn">',
                        '<a ng-if="showBtn" ng-click="eventHandler({obj:item})" title="{{title}}" >',
                            '<span class="glyphicon {{icon}}" aria-hidden="true"></span> {{title}}',
                        '</a>',
                    '</div>',
                ].join(''),
                link:function(scope,tElm,tAttrs,tbCtrl) {

                    // 父指令 <- ceDataToolbar 获取值「 item 」
                    scope.item = tbCtrl.item;
                    if(!!tbCtrl.statusKey){
                        scope.showBtn = !!scope.statusEquals ? (','+scope.statusEquals+',').indexOf((',\''+tbCtrl.item[tbCtrl.statusKey]+'\','))>=0 : true;
                    }else{
                        scope.showBtn = true;
                    }
                    // 根据状态判断该按钮是否显示
                    if(scope.showBtn){
                        // 显示工具栏逻辑
                        tbCtrl.countItemBtn();
                    }
                }
            };
        }])
    .directive('ceDataCustom',[function(){
        return {
            restrict:'E',
            transclude: true,
            replace: true,
            scope:false,
            controller:['$scope',function($scope){
                // 获取父指令的「 item 」
                $scope.item =  $scope.$parent.item;
            }],
            template:'<div class="ce-data-custom" ng-transclude></div>',
        };

    }])
    ;