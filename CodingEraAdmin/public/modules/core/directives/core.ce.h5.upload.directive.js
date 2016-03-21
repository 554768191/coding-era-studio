/**
 * Created by Yan on 15/12/22.
 */
"use strict";

angular.module('core')
    .directive('ceH5Upload', [ '$rootScope','ceUtil', function( $rootScope,ceUtil) {
        return {
            restrict: 'E',
            templateUrl:'modules/core/views/templates/core.ce.h5.upload.template.html',
            transclude: true,
            scope:true,
            require: 'ngModel',
            link: function($scope, el, attrs,ngModel) {
                $scope.showImage = false;
                var fileUploadObj = angular.element(document.querySelector('.ce-h5-upload'));
                var dropbox = fileUploadObj[0];

                var handleFiles = function(files) {
                    if(files.length>1){
                        ceUtil.toast('只能上传一张图片');
                        return;
                    }

                   // for (var i = 0; i < files.length; i++) {
                        var file = files[0];
                        console.log(file);
                        var name = file.name;
                        //$rootScope.$emit("startLoading");
                        ceUtil.loading();
                        var avFile = new AV.File(name, file);
                        avFile.save().then(function(obj) {
                            ceUtil.loading();
                            // 数据保存成功
                            console.log(obj.url());
                           // fileUploadObj.append('<img src="'+obj.url()+'" />');
                            $scope.showImage = true;
                            $scope.$apply();
                            fileUploadObj.find('img').attr('src',obj.url());
                            ngModel.$setViewValue(obj.url());

                        }, function(err) {
                            ceUtil.loading();
                            // 数据保存失败
                            console.log(err);
                        });
                   // }
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