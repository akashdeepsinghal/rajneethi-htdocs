 var app = angular.module('rajneethi');
 
 app.controller('addcreateprojectCtrl', function ($scope, $routeParams, $http, userService) {
     var projectId = $routeParams.id;
     if (projectId == '-1') {
         $scope.createproject = {
             name: '',
             number: '',
             username: '',
             DisplayType: '',
             flag: '1',
             password: '',
             isform6required:''
            
         }
         $scope.buttonshow = true;
     }
     else {
         $scope.buttonshow = false;
         var reqObj = {
             PRCID: "GETPROJECTDETIALS",
             paramArray: [projectId]
                 };

                 executeApi(reqObj, function (data){
                     console.log(data);
                     $scope.createproject = data[0];
                    
                     $scope.$apply();
                 });
     }
     $scope.form6 = ['0', '1'];

     
     //$scope.InsertData = function () {
     //    var data = _.values($scope.createproject);
     //    var reqObj = {
     //        PRCID: "INSERTPROFILEEQUSTION",
     //        paramArray: data
     //    };

     //    executeApi(reqObj, function (data) {
     //        swal("Saved!", "Your Project Create sucessfully !", "success");
     //        window.location.href = "#createproject/1";
     //        console.log(data);
     //   });
     //}

     $scope.validation = function () {
         if ($scope.createproject.name == "" || $scope.createproject.username == "" || $scope.createproject.number == "" || $scope.createproject.DisplayType == "" || $scope.createproject.password == "" || $scope.createproject.isform6required=="") {
             swal("Oops...!", "Fields Can not be null!", "error");
             return;
         }else{
             var data = [$scope.createproject.name, $scope.createproject.username]
         var reqObj = {
             PRCID: "VALIDATION",
             paramArray: data
         };

         executeApi(reqObj, function (data) {
             if (data[0].validation == "User and Project not Exist") {
                 $scope.InsertData();
             } else {
                 swal("", data[0].validation, "error");

                 console.log(data);
             }
         });
     }
     }


     $scope.InsertData = function () {
         $scope.adduser = {
             username: $scope.createproject.username.replace(/\s/g, ''),
             password: $scope.createproject.password.replace(/\s/g,''),
             role: 'Client'

         }

         
         $("#loadingModal").show();
        

         var data1 = [$scope.createproject.name, $scope.createproject.number, $scope.createproject.isform6required];
         
         var reqObj = {
         PRCID: "CREATEPROJECT",
         paramArray: data1
         };

         executeApi(reqObj, function (data) {
             var projectId = data[0].projectId;
             if (projectId) {
                 userService.createUserDetails($scope.adduser)
                  .success(function (data) {
                      if (data.id!=undefined) {
                          var token = '40efaaf9-0849-4038-935f-8ed1f1201be8';
                          var value = [data.id, $scope.adduser.role, token, projectId];
                          var reqObj = {
                              PRCID: "UPDATEUSERPROJECTUSER",
                              paramArray: value
                          };

                          executeApi(reqObj, function (data) {
                              console.log(data);
                              $("#loadingModal").hide();
                              swal("Sucess!", "User Create sucessfully !", "success");
                              window.location.href = "#createproject/1";
                          });
                      }
                      console.log(data);
                  })
                  .error(function (data) {
                      console.log('Error: ' + data);
                      $("#loadingModal").hide();
                      swal("Unsucess!", "Occured Some Error Please Try Again !", "success");
                      window.location.href = "#createproject/1";
                  });
             }
             });

         
     }

     $scope.UpdateData = function () {
         //delete $scope.createproject.flag; 
        // var data = _.values($scope.createproject);
        // var data = ;
         var reqObj = {
             PRCID: "UPDATEPROJECT",
             paramArray: [parseInt(projectId), $scope.createproject.name, $scope.createproject.number, $scope.createproject.isform6required]
         };

         executeApi(reqObj, function (data) {
             swal("Saved!", "Your Update saved sucessfully !", "success");
             window.location.href = "#createproject/1";
             console.log(data);
         });
     }
     
     $scope.reload = function () {
         window.location.href = "#createproject/1";
     }
   
 });