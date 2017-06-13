var app = angular.module('rajneethi');

app.controller('jobsCtrl', function ($scope, $routeParams, $http) {
  var projectId = $routeParams.id;
         $scope.gridOptions =    {
         paginationPageSizes: [5, 10, 20],
         paginationPageSize: 10,
         enableFiltering: false,
         enablePaging: true,
         onRegisterApi: function (gridApi) {
             $scope.gridApi = gridApi;
             $scope.gridApi.grid.registerRowsProcessor($scope.singleFilter, 200);
         },
         columnDefs: [
           { name: 'project id', enableFiltering: false, headerCellClass: 'blue' ,field: 'projectID'},
            { name: 'Title', enableFiltering: false, headerCellClass: 'blue', field: 'Title' },
           { name: 'Type', enableFiltering: false, headerCellClass: 'blue', field: 'Type' },
           { name: 'Name', headerCellClass: 'blue', field: 'Name' },
           { name: 'Voter id', headerCellClass: 'blue',field: 'VoterID'},
            { name: 'Date', headerCellClass: 'blue', field: 'Date' },
           {
               name: " ", cellTemplate: '<div style="text-align:center;">' +
                       '<a href="#addbeneficiary/{{row.entity.id}}">Edit</a>' +
                       '</div>', enableFiltering: false
           },
           {
               name: "  ", cellTemplate: '<div>' +
                    '<div>   <div ng-click="grid.appScope.Removebeneficiary(row,col)" class="" style="text-align:center;cursor:pointer;color:#337ab7">Delete</div> </div>',
               eenableFiltering: false
           },

         ],

     };
     var reqObj = {
         PRCID: "GETBENEFICIARYDETAILS",
         paramArray: ["-1"]
     };

     $scope.gridData = [];
     executeApi(reqObj, function (data) {
         console.log(data);
         $scope.gridOptions.data = data;
         $scope.gridData = data;
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
             ['projectID', 'Title', 'Type', 'Name', 'VoterID', 'Date'].forEach(function (field) {
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
    
     $scope.getBackGroundColor = function (index) {
         if (index % 2 == 0)
             return "blue";
         else
             return "green";
     }

     $scope.Removebeneficiary = function (row, col) {
         swal({
             title: "Are you sure?",
             text: "You Want to delete horse!",
             type: "warning",
             showCancelButton: true,
             confirmButtonColor: '#3085d6',
             cancelButtonColor: '#d33',
             confirmButtonText: "Yes, delete it!",
             closeOnConfirm: false
         },
         function () {
             var reqObj = {
                 PRCID: "DELETEBENEFICIARYDETAILS",
                 paramArray: [parseInt(row.entity.id)]
             };

             executeApi(reqObj, function (data) {
                 console.log(data);
                 window.location.reload();
                 //$scope.gridOptions.data = data;
                 //$scope.$apply();
             });
             

             swal("Deleted!", "Your Beneficiary Deleted sucessfully !", "success");
         });

     }
    
        
    
 });
