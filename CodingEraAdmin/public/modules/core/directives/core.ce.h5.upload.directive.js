/**
 * Created by Yan on 15/12/22.
 */
"use strict";

angular.module('core')
    .directive('ceH5Upload', [ '$rootScope','$timeout','$log','leanCloud','ceUtil',
        function( $rootScope,$timeout,$log,leanCloud,ceUtil) {
        return {
            restrict: 'E',
            templateUrl:'modules/core/views/templates/core.ce.h5.upload.template.html',
            transclude: true,
            scope:true,
            require: 'ngModel',
            link: function($scope, el, attrs,ngModel) {

                $scope.showImage = false;
                var fileUploadObj = angular.element(document.querySelector('.ce-h5-upload'));
                var fileBtn = angular.element(document.querySelector('.ce-file-btn'));;
                var dropbox = fileUploadObj[0];



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
                    var name = file.name;
                    leanCloud.uploadImage(file).success(function(obj){
                        $log.debug('上传文件成功:',obj);
                        loadImageByUrl(obj.url());
                        ngModel.$setViewValue(obj.url());
                    });
                };

                var handleFiles = function(files) {
                    if(files.length>1){//暂时支持一张
                        ceUtil.toast('只能上传一张图片');
                        return;
                    }
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        uploadFile(file);

                    }
                };

                //点击删除
                $scope.onCleanImageClick = function($event){
                    $scope.showImage = false;
                    $event.stopPropagation();
                    $timeout(function(){
                        fileUploadObj.find('img').removeAttr('src');
                        ngModel.$setViewValue(null);
                        $scope.$apply();
                    });
                };

                //点击上传
                $scope.onUploadClick = function(){
                    console.log(fileBtn);
                    //fileBtn.triggerHandler('click');
                    //console.log(fileBtn[0]);
                   fileBtn[0].click();

                };
                console.log(fileBtn.test)
                $scope.$watch(fileBtn.test,function(test){
                    console.log(test);
                });
                $scope.onFileUpladChange = function($files){
                    console.log($files);
                };

                document.addEventListener("dragenter", function(e){

                    dropbox.style.borderColor = 'gray';
                }, false);
               document.addEventListener("dragleave", function(e){
                    dropbox.style.borderColor = 'silver';

                }, false);
                dropbox.addEventListener("dragenter", function(e){
                    dropbox.style.backgroundColor = 'white';

                }, false);
                dropbox.addEventListener("dragleave", function(e){

                    dropbox.style.backgroundColor = 'transparent';
                }, false);
                dropbox.addEventListener("dragenter", function(e){
                    e.stopPropagation();
                    e.preventDefault();
                }, false);
                dropbox.addEventListener("dragover", function(e){
                    e.stopPropagation();
                    e.preventDefault();
                }, false);
                dropbox.addEventListener("drop", function(e){
                    e.stopPropagation();
                    e.preventDefault();
                    dropbox.style.backgroundColor = 'transparent';
                    handleFiles(e.dataTransfer.files);

                    //submit.disabled = false;
                }, false);

            }
        };
    }]);