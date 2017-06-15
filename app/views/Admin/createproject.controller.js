 var app = angular.module('rajneethi');

 app.controller('createprojectCtrl', function ($scope, $routeParams, $http) {
     var projectId = $routeParams.id;




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
              { name: 'Project Name', enableFiltering: false, cellClass: 'gridRowColumnDataItem', headerCellClass: 'gridHeaderRowColumnDataItem', field: 'name' },
           { name: 'Constituency Number', enableFiltering: false, cellClass: 'gridRowColumnDataItem', headerCellClass: 'gridHeaderRowColumnDataItem', field: 'number' },
           
           { name: 'User Name', enableFiltering: false, cellClass: 'gridRowColumnDataItem', headerCellClass: 'gridHeaderRowColumnDataItem', field: 'username' },
          
         {
             name: "   ", cellTemplate: '<div>' +
                  '<div>   <div ng-click="grid.appScope.DownloadVoterData(row,col)" class="" style="text-align:center;cursor:pointer;color:#337ab7;">Download Voter Data</div> </div>',
             eenableFiltering: false
         },
          {
              name: "     ", cellTemplate: '<div>' +
                   '<div>   <div ng-click="grid.appScope.DownloadSurveyData(row,col)" class="" style="text-align:center;cursor:pointer;color:#337ab7;">Download Survey Data</div> </div>',
              eenableFiltering: false
          }
          ,

           {
               name: " ", cellTemplate: '<div style="text-align:center;">' +
                       '<a href="#addcreateproject/{{row.entity.projectId}}">Edit</a>' +
                       '</div>', enableFiltering: false
           },

       {
               name: "  ", cellTemplate: '<div>' +
                    '<div>   <div ng-click="grid.appScope.Removeproject(row,col)" class="" style="text-align:center;    color:#f44336">Delete</div> </div>',
               eenableFiltering: false
           }
           

         ],

     };
     var reqObj = {
         PRCID: "GETPROJECTDETIALS",
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
           
             ['name', 'username', 'number'].forEach(function (field) {
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


     $scope.Removeproject = function (row, col) {
         swal({
             title: "Are you sure?",
             text: "You Want to delete Project!",
             type: "warning",
             showCancelButton: true,
             confirmButtonColor: '#3085d6',
             cancelButtonColor: '#d33',
             confirmButtonText: "Yes, delete it!",
             closeOnConfirm: false
         },
         function () {
             var reqObj = {
                 PRCID: "DELETEPROJECT",
                 paramArray: [parseInt(row.entity.projectId)]
             };

             executeApi(reqObj, function (data) {
                 console.log(data);
                 window.location.href = "#createproject/1";
                 
             });


             swal("Deleted!", "Your Project Deleted sucessfully !", "success");
         });

     }



     $scope.DownloadSurveyData = function (row, col) {
         var reqObj = {
             PRCID: "GETDISTINCTVOTERATTRIBUTEBYPROJECTID",
             paramArray: [parseInt(row.entity.projectId)]
         };
         executeApi(reqObj, function (data1) {
             console.log(data1);
             attributeobj = {};
             for (var i = 0; i < data1.length; i++) {
                 attributeobj[data1[i].pname] = "";
             }
             console.log(attributeobj);
             var reqObj = {
                 PRCID: "DownloadSurveyData",
                 paramArray: [parseInt(row.entity.projectId)]
             };
             executeApi(reqObj, function (data) {
                 console.log(data);
                 var getdata = _.groupBy(data, function (num) { return num.voterId; });
                 var getdataarray = $.map(getdata, function (value, index) { return [value]; });
                 $scope.surveyarray = [];
                 for (var i = 0; i < getdataarray.length; i++){
                     $scope.surveyobj = angular.copy(attributeobj);
                     for (var j = 0; j < getdataarray[i].length; j++) {
                         if (getdataarray[i][j].attribute in $scope.surveyobj) {
                             $scope.surveyobj[getdataarray[i][j].attribute] = getdataarray[i][j].value;
                         }
                         if (j == 0) {
                            
                             $scope.surveyobj["voterId"] = getdataarray[i][j].voterId;

                         }
                     }
                     $scope.surveyarray.push($scope.surveyobj);
                 }

                 JSONToCSVConvertor($scope.surveyarray, "Survey Data", true);
             });
             //JSONToCSVConvertor(data, "Survey Data", true);
         });












         //var reqObj = {
         //    PRCID: "DownloadSurveyData",
         //    paramArray: [parseInt(row.entity.projectId)]
         //};
         //executeApi(reqObj, function (data) {
         //    console.log(data);
         //    //var downloadData = $scope.getCurrentGridData();
         //    JSONToCSVConvertor(data, "Survey Data", true);
         //});
     }


     $scope.DownloadVoterData = function (row, col) {
         var reqObj = {
             PRCID: "DownloadVoterData",
             paramArray: [parseInt(row.entity.projectId)]
         };
         executeApi(reqObj, function (data) {
             console.log(data);
             //var downloadData = $scope.getCurrentGridData();
             JSONToCSVConvertor(data, "Voters Data", true);
         });
     }


 });