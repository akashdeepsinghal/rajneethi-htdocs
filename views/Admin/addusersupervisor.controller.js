 var app = angular.module('rajneethi');

 app.controller('addusersupervisorCtrl', function ($scope, $routeParams, $http) {
     var projectid = $routeParams.userId;
     var reqObj = {
         PRCID: "GETUSERBYSUPERVISORID",
         paramArray: [parseInt(projectid)]
     };

     executeApi(reqObj, function (data) {
         console.log(data);
         $scope.availableclients = _.filter(data, function (num) { return num.PreSelected == 0; });

         $scope.selectedclients = _.filter(data, function (num) { return num.PreSelected == 1; });
         //if ($scope.selectedclients.length > 0) {
         //    $scope.flag = true;
         //} else {
         //    $scope.flag = false;
         //}
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
        
             
                 var reqObj = {
                     PRCID: "DELETEUSERBYSUPERVISORID",
                     paramArray: [parseInt(projectid)]
                 };
                 executeApi(reqObj, function (data) {
                    
                     console.log(data);
                     for (var i = 0; i < selectedclients.length;i++){

                         var reqObj = {
                             PRCID: "INSERTUSERBYSUPERVISORID",
                             paramArray: [parseInt(projectid), selectedclients[i].id]
                         };
                         executeApi(reqObj, function (data) {
                             swal("Success!", "Your PartyWorkers Add Sucessfully", "success");
                            // window.location.href = " #user/1";
                             console.log(data);
                         });
                     }
                     window.location.href = " #user/1";
                 });

                
             
             
         

     }



 });