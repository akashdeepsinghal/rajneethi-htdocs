var app = angular.module('rajneethi');
app.directive("fileread", [function() {
    return {
        scope: {
            fileread: "=",
        },
        link: function(scope, element, attributes) {
            element.bind("change", function(changeEvent) {
                scope.fileread = changeEvent.target.files[0];
            })
        }
    }

}]);
