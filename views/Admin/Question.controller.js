 var app = angular.module('rajneethi');

 app.controller('QuestionCtrl', function ($scope, $routeParams, $http) {
     var projectId = $routeParams.id;

     $scope.gridOptions = {
         paginationPageSizes: [10,25, 50, 100],
         paginationPageSize: 25,
         enableFiltering: false,
         enablePaging: true,
         onRegisterApi: function (gridApi) {
             $scope.gridApi = gridApi;
             $scope.gridApi.grid.registerRowsProcessor($scope.singleFilter, 200);
         },
         columnDefs: [
              { name: 'constituencyName', enableFiltering: false, cellClass: 'gridRowColumnDataItem', headerCellClass: 'gridHeaderRowColumnDataItem', field: 'constituencyName' },
           { name: 'name', enableFiltering: false, cellClass: 'gridRowColumnDataItem', headerCellClass: 'gridHeaderRowColumnDataItem', field: 'name' },

           { name: 'DisplayType', enableFiltering: false, cellClass: 'gridRowColumnDataItem', headerCellClass: 'gridHeaderRowColumnDataItem', field: 'DisplayType' },
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
                       '<a href="#addQuestion/{{row.entity.id}}">Edit</a>' +
                       '</div>', enableFiltering: false
           },
           {
               name: "  ", cellTemplate: '<div>' +
                    '<div>   <div ng-click="grid.appScope.RemoveQuestion(row,col)" class="" style="text-align:center;cursor:pointer;color:#f44336">Delete</div> </div>',
               eenableFiltering: false
           },

         ],

     };
     var reqObj = {
         PRCID: "GETPROFILEEQUSTION",
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
        
         var matcher = new RegExp($scope.filterValue.toUpperCase());
         renderableRows.forEach(function (row) {

             var match = false;
             // Object.keys(row.entity).
             ['name', 'DisplayType', 'constituencyName'].forEach(function (field) {
                 try {
                     if (row && row.entity) {
                         if (row.entity[field]) {
                             if (row.entity[field].toUpperCase().match(matcher)) {
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

     $scope.RemoveQuestion = function (row, col) {
         swal({
             title: "Are you sure?",
             text: "You Want to delete Question!",
             type: "warning",
             showCancelButton: true,
             confirmButtonColor: '#3085d6',
             cancelButtonColor: '#d33',
             confirmButtonText: "Yes, delete it!",
             closeOnConfirm: false
         },
         function () {
             var reqObj = {
                 PRCID: "DELETEPROFILEEQUSTION",
                 paramArray: [parseInt(row.entity.id)]
             };

             executeApi(reqObj, function (data) {
                 console.log(data);
                  window.location.reload();

                // window.location.href = " #Question/1";
                 //$scope.gridOptions.data = data;
                 //$scope.$apply();
             });


             swal("Deleted!", "User Deleted sucessfully !", "success");
         });

     }

 });