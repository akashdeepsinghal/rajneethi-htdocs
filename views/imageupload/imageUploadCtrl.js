var app = angular.module('rajneethi');
app.controller('imageUploadCtrl', ['$scope', 'Upload', '$timeout', function($scope, Upload, $timeout) {
    $scope.uploadPic = function(file) {
        file.upload = Upload.upload({
            url: 'http://52.66.83.57:80/api/v1/imageupload/byMobile/image',
            data: { file: file },
        });

        file.upload.then(function(response) {
            $timeout(function() {
                file.result = response.data;
                console.log(response)
            });
        }, function(response) {
            console.log(response);
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        }, function(evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    }
}]);
