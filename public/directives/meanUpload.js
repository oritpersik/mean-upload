'use strict';

angular.module('mean.mean-upload').directive('meanUploadImg', function($upload) {
    return {
        templateUrl: 'mean-upload/views/upload.html',
        scope: {
            imgDest: '=',
            uploadCallback: '&',
            uploadImgCallback: '&'
        },
        restrict: 'E',
        replace: true,
        link: function($scope, element, attrs) {
            $scope.onFileSelect = function($files) {
                $scope.images = [];
                $scope.files = $files;
                var fileNames = [];
                //$files: an array of files selected, each file has name, size, and type.
                for (var i = 0; i < $files.length; i++) {
                    var file = $files[i];
                    fileNames.push(file.name);
                    $scope.upload = $upload.upload({
                        url: 'meanUpload/upload',
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        data: {
                            dest: $scope.imgDest
                        },
                        file: file
                    }).progress(function(evt) {
                        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    }).success(function(data, status, headers, config) {
                        if (data.success) {
                            if (angular.isDefined(attrs.uploadImgCallback)) {
                                $scope.uploadImgCallback({
                                    file: data.img.name
                                });
                            }
                            $scope.images.push(data.img.src);
                        }
                        if ($scope.images.length === $files.length) {
                            if (angular.isDefined(attrs.uploadCallback)) {
                                $scope.uploadCallback({
                                    files: fileNames
                                });
                            }
                        }
                    });
                }
            };
        }
    };
});