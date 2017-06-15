 var app = angular.module('rajneethi');

 app.controller('manageBoothCtrl', function ($scope, $routeParams, $http) {
     var projectid = $routeParams.userId;
     var reqObj = {
         PRCID: "GETBOOTH",
         paramArray: [parseInt(projectid)]
     };

     executeApi(reqObj, function (data) {
         console.log(data);
         $scope.availableclients = _.filter(data, function (num) { return num.PreSelected == 0; });

         $scope.selectedclients = _.filter(data, function (num) { return num.PreSelected == 1; });
         if ($scope.selectedclients.length > 0) {
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
             swal("Oops !!!!", "Please select only one Booth", "error");			 
         } else {
             if ($scope.flag == true) {
                 if (selectedclients.length == 0) {
                     var selectdata = "-1";
                 } else {
                     var selectdata = selectedclients[0].booth_panchayat_name;
                 }

                 var reqObj = {
                     PRCID: "UPDATEBOOTH",
                     paramArray: [parseInt(projectid), selectdata]
                 };
                 executeApi(reqObj, function (data) {
                     swal("Success!", "Your Booth Add Sucessfully", "success");
                     window.location.href = "#user/1";
                     console.log(data);
                 });
             } else {
                 if (selectedclients.length == 0) {
                     //swal("Unsuccess", "Booth are not Selected", "success");
					 swal("Oops !!!!", "Booth are not Selected", "error");		
                     window.location.href = "#user/1";
                 } else{
                 var reqObj = {
                     PRCID: "INSERTBOOTH",
                     paramArray: [parseInt(projectid), selectedclients[0].booth_panchayat_name]
                 };

                 executeApi(reqObj, function (data) {
                     swal("Success!", "Your Booth Add Sucessfully", "success");
                     window.location.href = "#user/1";
                     console.log(data);
                 });
             }
             }
         }

     }



 });