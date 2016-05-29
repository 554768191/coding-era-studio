/**
 * Created by Yan on 15/12/3.
 */
"use strict";

angular.module('core')
    .directive('ceGrid', [
        function() {
            return {
                restrict:'E',
                scope:{
                    cePageData:'=',
                    ceOptions: '=',
                    ceColumns: '=',
                    ceGrid:'='
                },
                priority:100,
                replace: true,
                link:function($scope,ele,attr){
                    var cePageData = $scope.cePageData || {};
                    var options = $scope.ceOptions;
                    var columns = $scope.ceColumns;

                    // 好吧,你看到这里,我估计你会想知道option 怎么配置了
                    // 看这个链接吧 https://github.com/mleibman/SlickGrid/wiki/Grid-Options
                    var option = {
                        enableCellNavigation: false,
                        enableColumnReorder: false,
                        forceFitColumns:true
                    };
                    angular.extend(option,options);

                    //自动把 columns 的 field 设置成id
                    angular.forEach(columns,function(column){
                        column.id = column.field;
                    });

                    //这里可能还有执行效率问题
                    $scope.$watch('cePageData',function(newData){
                        if(!angular.isUndefined(newData) && !angular.isUndefined(newData.content)){
                            $scope.ceGrid = new window.Slick.Grid(ele, newData.content, columns, option);
                        }
                    });
                },
                template:['<div  class="slick-wrap" ></div>',
                        ].join('')
            };
    }]);