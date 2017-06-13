 var app = angular.module('rajneethi');
 
 app.controller('adduserCtrl', function ($scope, $routeParams, $http, userService) {
     var projectId = $routeParams.id;
     if (projectId == '-1') {
         $scope.adduser = {
             username: '',
             password: '',
             role: ''
            
         }
         $scope.buttonshow = true;
     }
     else {
         $scope.buttonshow = false;
         var reqObj = {
             PRCID: "GETUSERS",
             paramArray: [projectId]
                 };

                 executeApi(reqObj, function (data){
                     console.log(data);
                     $scope.adduser = data[0];
                     $scope.$apply();
                 });
     }
    
    
     $scope.Role = ['PartyWorker', 'Supervisor'];
    
     
     //$scope.InsertData = function () {
     //    var data = _.values($scope.grievienceDetails);
     //    var reqObj = {
     //        PRCID: "CREATEGRIVIENCE",
     //        paramArray: data
     //    };

     //    executeApi(reqObj, function (data){
     //        console.log(data);
     //   });
     //}

     $scope.InsertData = function () {
         $("#loadingModal").show();
         userService.createUserDetails($scope.adduser)
             .success(function (data) {
                 var token = '40efaaf9-0849-4038-935f-8ed1f1201be8';
                 var value = [data.id, $scope.adduser.role, token];
                       var reqObj = {
                           PRCID: "INSERTUSER",
                             paramArray: value
                         };

                         executeApi(reqObj, function (data){
                             console.log(data);
                             $("#loadingModal").hide();
                             swal("Sucess!", "User Create sucessfully !", "success");
                             window.location.href = " #user/1";
                        });

                 console.log(data);
             })
             .error(function (data) {
                 console.log('Error: ' + data);
                 $("#loadingModal").hide();
                 swal("Unsucess!", "Occured Some Error Please Try Again !", "error");
                 window.location.href = " #user/1";
             });
     }

     $scope.UpdateData = function () {
         var aaa = _.values($scope.adduser);
         var data = [parseInt(projectId),$scope.adduser.role  ]
         var reqObj = {
             PRCID: "UPDATEROLE",
             paramArray: data
         };
         console.log(reqObj);
         executeApi(reqObj, function (data) {
             window.location.href = " #user/1";
             console.log(data);
         });
     }
     
     $scope.reload = function () {
         window.location.href = " #user/1";
     }

 });