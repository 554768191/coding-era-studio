/**
 * Created by Yan on 15/12/22.
 */
"use strict";

angular.module('core')
    .directive('ceGridPager', ['uiGridPaginationService', 'uiGridConstants', 'gridUtil', 'i18nService','ceConfig',
        function (uiGridPaginationService, uiGridConstants, gridUtil, i18nService,ceConfig) {
            return {
                priority: -200,
                scope: true,
                require: '^uiGrid',
                link: function ($scope, $elm, $attr, uiGridCtrl) {
                    var defaultFocusElementSelector = '.ui-grid-pager-control-input';
                    $scope.aria = i18nService.getSafeText('pagination.aria'); //Returns an object with all of the aria labels

                    $scope.paginationApi = uiGridCtrl.grid.api.pagination;
                    $scope.sizesLabel = i18nService.getSafeText('pagination.sizes');
                    $scope.totalItemsLabel = i18nService.getSafeText('pagination.totalItems');
                    $scope.paginationOf = i18nService.getSafeText('pagination.of');
                    $scope.paginationThrough = i18nService.getSafeText('pagination.through');

                    var options = uiGridCtrl.grid.options;

                    uiGridCtrl.grid.renderContainers.body.registerViewportAdjuster(function (adjustment) {
                        adjustment.height = adjustment.height - gridUtil.elementHeight($elm);
                        return adjustment;
                    });

                    var dataChangeDereg = uiGridCtrl.grid.registerDataChangeCallback(function (grid) {
                        if (!grid.options.useExternalPagination) {
                            grid.options.totalItems = grid.rows.length;
                        }
                    }, [uiGridConstants.dataChange.ROW]);

                    $scope.$on('$destroy', dataChangeDereg);

                    var setShowing = function () {
                        $scope.showingLow = ((options.paginationCurrentPage - 1) * options.paginationPageSize) + 1;
                        $scope.showingHigh = Math.min(options.paginationCurrentPage * options.paginationPageSize, options.totalItems);
                    };

                    var deregT = $scope.$watch('grid.options.totalItems + grid.options.paginationPageSize', setShowing);

                    var deregP = $scope.$watch('grid.options.paginationCurrentPage + grid.options.paginationPageSize', function (newValues, oldValues) {
                            if (newValues === oldValues || oldValues === undefined) {
                                return;
                            }

                            if (!angular.isNumber(options.paginationCurrentPage) || options.paginationCurrentPage < 1) {
                                options.paginationCurrentPage = 1;
                                return;
                            }

                            if (options.totalItems > 0 && options.paginationCurrentPage > $scope.paginationApi.getTotalPages()) {
                                options.paginationCurrentPage = $scope.paginationApi.getTotalPages();
                                return;
                            }

                            setShowing();
                            uiGridPaginationService.onPaginationChanged($scope.grid, options.paginationCurrentPage, options.paginationPageSize);
                        }
                    );

                    $scope.$on('$destroy', function() {
                        deregT();
                        deregP();
                    });

                    $scope.cantPageForward = function () {
                        if (options.totalItems > 0) {
                            return options.paginationCurrentPage >= $scope.paginationApi.getTotalPages();
                        } else {
                            return options.data.length < 1;
                        }
                    };

                    $scope.cantPageToLast = function () {
                        if (options.totalItems > 0) {
                            return $scope.cantPageForward();
                        } else {
                            return true;
                        }
                    };

                    $scope.cantPageBackward = function () {
                        return options.paginationCurrentPage <= 1;
                    };

                    var focusToInputIf = function(condition){
                        if (condition){
                            gridUtil.focus.bySelector($elm, defaultFocusElementSelector);
                        }
                    };

                    //Takes care of setting focus to the middle element when focus is lost
                    $scope.pageFirstPageClick = function () {
                        $scope.paginationApi.seek(1);
                        focusToInputIf($scope.cantPageBackward());
                    };

                    $scope.pagePreviousPageClick = function () {
                        $scope.paginationApi.previousPage();
                        focusToInputIf($scope.cantPageBackward());
                    };

                    $scope.pageNextPageClick = function () {
                        $scope.paginationApi.nextPage();
                        focusToInputIf($scope.cantPageForward());
                    };

                    $scope.pageLastPageClick = function () {
                        $scope.paginationApi.seek($scope.paginationApi.getTotalPages());
                        focusToInputIf($scope.cantPageToLast());
                    };

                    $scope.getMinPage = function(){
                        var currentPage = $scope.paginationApi.getPage();
                        var middelPage = ceConfig.showDisplayPage%2 == 0?ceConfig.showDisplayPage/2:(ceConfig.showDisplayPage+1)/2
                        if(currentPage<middelPage){
                            return 1;
                        }

                        if(currentPage >= ($scope.paginationApi.getTotalPages() - ceConfig.showDisplayPage + (middelPage-1)) ){
                            return $scope.paginationApi.getTotalPages() - ceConfig.showDisplayPage;
                        }

                        return currentPage - (middelPage-1);
                    };

                    $scope.getMaxPage = function(){
                        var currentPage = $scope.paginationApi.getPage();
                        var middelPage = ceConfig.showDisplayPage%2 == 0?ceConfig.showDisplayPage/2:(ceConfig.showDisplayPage+1)/2
                        if(currentPage<middelPage){
                            return ceConfig.showDisplayPage;
                        }
                        return currentPage + (middelPage-1);
                    };
                }
            };
        }
    ]);