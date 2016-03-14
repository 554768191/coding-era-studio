/**
 * Created by Jason.
 *
 * 上传文件
 */
'use strict';
angular.module('todo').factory('FileUploadService', ['$http', '$log', 'ceConfig', 'Upload',
    function ($http, $log, ceConfig, Upload) {
        var service = {

            upload: function (file, task) {
                if (file) {
                    Upload.upload({
                        url: 'http://localhost:8999/api/fileUpload/uploadImage',
                        data: {'file': file}
                    }).then(function (resp) {
                        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                        file.status = "Success";

                        //返回markdown格式:
                        //![图片](https://dn-coding-net-production-pp.qbox.me/7f77e48e-be1f-48c0-a50b-6be7f3c75a56.png)

                        task.content += '![图片]('+'http://localhost:8999' + resp.data.data.path + ')';
                    }, function (resp) {
                        console.log('Error status: ' + resp.status);
                        file.status = resp.status;
                    }, function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        file.progressPercentage = progressPercentage;
                        //$scope.progressPercentage = progressPercentage;
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                    });
                }
            }

        };
        return service;
    }
]);

