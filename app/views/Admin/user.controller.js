 var app = angular.module('rajneethi');

 app.controller('userCtrl', function ($scope, $routeParams, $http) {
     var projectId = $routeParams.id;
     $scope.super = "Supervisor";
     $scope.gridOptions = {
         paginationPageSizes: [5, 10, 20],
         paginationPageSize: 10,
         enableFiltering: false,
         enablePaging: true,
         onRegisterApi: function (gridApi) {
             $scope.gridApi = gridApi;
             $scope.gridApi.grid.registerRowsProcessor($scope.singleFilter, 200);
         },
         columnDefs: [
           { name: 'username', enableFiltering: false, cellClass: 'gridRowColumnDataItem', headerCellClass: 'gridHeaderRowColumnDataItem' },
         
           { name: 'role', enableFiltering: false, cellClass: 'gridRowColumnDataItem', headerCellClass: 'gridHeaderRowColumnDataItem', field: 'role' },
            {
                name: "     ", cellTemplate: '<div  style="text-align:center;" >' +
                        '<a ng-show={{row.entity.role=="Supervisor"}} href="#addusersupervisor/{{row.entity.id}}">Manage PartyWorker</a>' +
                        '</div>', enableFiltering: false
            },
           //{ name: '', enableFiltering: false, headerCellClass: 'blue', field: 'phonenumber' },
           //{ name: 'Voter ID', headerCellClass: 'blue', field: 'VoterID' },
           //{ name: 'Date', headerCellClass: 'blue', field: 'Date' },
           //{ name: 'Type', headerCellClass: 'blue', field: 'Type' },
           //{ name: 'Sub Type', enableFiltering: false, headerCellClass: 'blue', field: 'SubType' },
           //{ name: 'Remarks', enableFiltering: false, headerCellClass: 'blue', field: 'Remarks' },
           //{ name: 'Priority', enableFiltering: false, headerCellClass: 'blue', field: 'Priority' },
           //{ name: 'SLATime', enableFiltering: false, headerCellClass: 'blue', field: 'SLATime' },
           //{ name: 'Status', enableFiltering: false, headerCellClass: 'blue', field: 'Status' },
           //{ name: 'Rewards', enableFiltering: false, headerCellClass: 'blue', field: 'Rewards' },
           {
               name: " ", cellTemplate: '<div style="text-align:center;">' +
                       '<a href="#manageProject/{{row.entity.id}}">Maping Project</a>' +
                       '</div>', enableFiltering: false
           },
           {
               name: "  ", cellTemplate: '<div style="text-align:center;">' +
                       '<a href="#manageBooth/{{row.entity.id}}">Maping Booth</a>' +
                       '</div>', enableFiltering: false
           },
           {
               name: "   ", cellTemplate: '<div style="text-align:center;">' +
                       '<a href="#adduser/{{row.entity.id}}">Edit User Role</a>' +
                       '</div>', enableFiltering: false
           },
           {
               name: "    ", cellTemplate: '<div>' +
                    '<div>   <div ng-click="grid.appScope.RemoveUser(row,col)" class="" style="text-align:center;cursor:pointer;color:#f44336">Delete</div> </div>',
               eenableFiltering: false
           },

         ],

     };
     var reqObj = {
         PRCID: "GETUSERS",
         paramArray: ["-1"]
     };

     executeApi(reqObj, function (data) {
         console.log(data);
         $scope.gridOptions.data = data;
         $scope.$apply();
     });



     

     

     $scope.filterValue = '';
     $scope.Search = function () {
         $scope.filterValue = document.getElementById("search").value;
         $scope.gridApi.grid.refresh();
     }

     $scope.singleFilter = function (renderableRows) {

         var matcher = new RegExp($scope.filterValue);
         renderableRows.forEach(function (row) {

             var match = false;
             // Object.keys(row.entity).
             ['username', 'role'].forEach(function (field) {
                 try {
                     if (row && row.entity) {
                         if (row.entity[field]) {
                             if (row.entity[field].match(matcher)) {
                                 match = true;
                             }
                         }
                     }
                 }
                 catch (e) {
                     match = false;
                     console.log(e);
                 }
             });

             row.visible = match;

         });
         return renderableRows;
     }


     $scope.RemoveUser = function (row, col) {
         swal({
             title: "Are you sure?",
             text: "You Want to delete User!",
             type: "warning",
             showCancelButton: true,
             confirmButtonColor: '#3085d6',
             cancelButtonColor: '#d33',
             confirmButtonText: "Yes, delete it!",
             closeOnConfirm: false
         },
         function () {
             var reqObj = {
                 PRCID: "DELETEUSER",
                 paramArray: [parseInt(row.entity.id)]
             };

             executeApi(reqObj, function (data) {
                 console.log(data);
                // window.location.reload();
                
                 window.location.href = " #user/1";
                 //$scope.gridOptions.data = data;
                 //$scope.$apply();
             });


             swal("Deleted!", "User Deleted sucessfully !", "success");
         });

     }

    




 });