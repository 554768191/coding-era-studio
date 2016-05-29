/**
 * Created by Yan on 15/12/22.
 */
"use strict";

angular.module('core')
    .directive('ceH5Upload', [
        '$rootScope','$timeout','$log','Upload','leanCloud','ceUtil',
        function( $rootScope,$timeout,$log,Upload,leanCloud,ceUtil) {
        return {
            restrict: 'E',
            template:[
                '<div class="ce-h5-upload-container">',
                    '<input ngf-select="onFileUpladChange($files)"  class="ce-file-btn" name="attachment" type="file" accept="image/gif, image/jpeg, image/png,image/jpg">',
                    '<div class="ce-h5-upload" ngf-drop="onFileUpladChange($files)" ngf-pattern="\'image/*\'" >',
                        '<div class="ce-h5-upload-tips"  ng-transclude  ng-if="!showImage" ng-click="onUploadClick()"></div>',
                        '<img  ng-if="showImage && !ceCrop"  />',
                        '<div class="crop-area" ng-show="ceCrop">',
                            '<img-crop image="cropImage " result-image="croppedImage" ></img-crop>',
                        '</div>',
                        '<a class="clean-image-btn" ng-click="onCleanImageClick()" ng-if="showImage">',
                            '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>',
                        '</a>',
                    '</div>',
                '</div>'
            ].join(''),
            transclude: true,
            scope:{
                ceCrop:'@'
            },
            require: 'ngModel',
            link: function($scope, el, attrs,ngModel) {
                $scope.croppedImage='';
                $scope.showImage = false;
                $scope.cropImage = '';
                var fileUploadObj = angular.element(document.querySelector('.ce-h5-upload'));
                var fileBtn = angular.element(document.querySelector('.ce-file-btn'));

                var loadImageByUrl = function(url){
                    $scope.showImage = true;
                    $timeout(function(){
                        fileUploadObj.find('img').attr('src',url);
                        $scope.$apply();
                    });
                };

                ngModel.$render =function(){
                    var url = ngModel.$viewValue || '';
                    if(url.length>0){
                        loadImageByUrl(url);
                    }
                };

                var uploadFile = function(file){
                    //不需要裁剪图片,直接上传
                    if(angular.isUndefined($scope.ceCrop) || $scope.ceCrop === false){
                        leanCloud.uploadImage(file).success(function(obj){
                            $log.debug('上传文件成功:',obj);
                            loadImageByUrl(obj.url());
                            ngModel.$setViewValue(obj.url());
                        });
                    }else{
                        //转base64图片
                        Upload.base64DataUrl(file).then(function(urls){
                            $scope.showImage = true;
                            $scope.cropImage=urls;
                            //把裁剪后的值,传回到ngModel
                            $scope.$watch('croppedImage',function(newValue){
                                ngModel.$setViewValue(newValue);
                            });
                        });
                    }

                };



                //点击删除
                $scope.onCleanImageClick = function($event){
                    $scope.showImage = false;
                    $timeout(function(){
                        fileUploadObj.find('img').removeAttr('src');
                        ngModel.$setViewValue(null);
                        $scope.$apply();
                    });
                };

                //点击上传
                $scope.onUploadClick = function(){
                   fileBtn[0].click();//模拟点击文件上传

                };

                $scope.onFileUpladChange = function($files){
                    if($files.length>1){//暂时支持一张
                        ceUtil.toast('只能上传一张图片');
                        return;
                    }
                    for (var i = 0; i < $files.length; i++) {
                        var file = $files[i];
                        uploadFile(file);

                    }
                };


            }
        };
    }]);