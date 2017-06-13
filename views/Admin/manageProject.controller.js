 var app = angular.module('rajneethi');

 app.controller('manageProjectCtrl', function ($scope, $routeParams, $http) {
     var projectid =$routeParams.userId;
     var reqObj = {
         PRCID: "GETPROJECTNAME",
         paramArray: [parseInt(projectid)]
     };

     executeApi(reqObj, function (data) {
         console.log(data);
         $scope.availableclients = _.filter(data, function (num) { return num.PreSelected == 0; });
       
         $scope.selectedclients = _.filter(data, function (num) { return num.PreSelected == 1; });
         if($scope.selectedclients.length>0){
             $scope.flag = true;
         } else {
             $scope.flag = false;
         }
         $scope.$apply();
     });
     $scope.moveItem = function (item, from, to) {

     	var idx = from.indexOf(item);
     	if (idx != -1) {
     		from.splice(idx, 1);
     		to.push(item);
     	}
     };
     $scope.moveAll = function (from, to) {

     	console.log('Move all  From:: ' + from + ' To:: ' + to);
     
     	angular.forEach(from, function (item) {
     		to.push(item);
     	});
     	from.length = 0;
     };

     $scope.Saveselectedproject = function (selectedclients) {
         if (selectedclients.length > 1) {
             //swal("Message!", "Please select only one project", "success");
			 swal("Oops !!!!", "Please select only one project", "error");
         } else {
             if ($scope.flag == true) {
                 if (selectedclients.length == 0) {
                     var selectdata = "-1";
                 } else {
                     var selectdata = selectedclients[0].projectId;
                 }

                 var reqObj = {
                     PRCID: "REALLOCATEPROJECT",
                     paramArray: [parseInt(projectid), selectdata]
                 };
                 executeApi(reqObj, function (data) {
                     swal("Success!", "Your Project Add Sucessfully", "success");
                     window.location.href = "#user/1";
                     console.log(data);
                 });
             } else {
                 if (selectedclients.length == 0) {
                     swal("Oops !!!!", "Project are not Selected", "error");
                     window.location.href = "#user/1";
                 } else {
                 var reqObj = {
                     PRCID: "ALLOCATEPROJECT",
                     paramArray: [parseInt(projectid), selectedclients[0].projectId]
                 };

                 executeApi(reqObj, function (data) {
                     swal("Success!", "Your Project Add Sucessfully", "success");
                     window.location.href = "#user/1";
                     console.log(data);
                 });
             }
             }
         }

     }


 });