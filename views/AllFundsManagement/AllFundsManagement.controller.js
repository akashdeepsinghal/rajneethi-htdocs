 var app = angular.module('rajneethi');

 app.controller('AllFundsManagementCtrl', function ($scope, $routeParams, $http) {
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
           { name: 'project id', enableFiltering: false, headerCellClass: 'blue' ,field: 'projectID'},
            { name: 'Title', enableFiltering: false, headerCellClass: 'blue', field: 'ProjectTitle' },
           { name: 'Project Type', enableFiltering: false, headerCellClass: 'blue', field: 'ProjectType' },
           { name: 'Project SubType', headerCellClass: 'blue', field: 'ProjectSubType' },
           { name: 'Start Date', headerCellClass: 'blue', field: 'StartDate' },
           { name: 'End Date', headerCellClass: 'blue', field: 'EndDate' },
           { name: 'Estimated Cost', headerCellClass: 'blue', field: 'EstimatedCost' },
           { name: 'Expenditure', headerCellClass: 'blue', field: 'Expenditure' },
           { name: 'Status', headerCellClass: 'blue', field: 'Status' },
           { name: 'Agency', headerCellClass: 'blue', field: 'Agency' },
           {
               name: " ", cellTemplate: '<div style="text-align:center;">' +
                       '<a href="#fundsManagent/{{row.entity.id}}">Edit</a>' +
                       '</div>', enableFiltering: false
           },
           {
               name: "  ", cellTemplate: '<div>' +
                    '<div>   <div ng-click="grid.appScope.Removebeneficiary(row,col)" class="" style="text-align:center;cursor:pointer;color:#f44336">Delete</div> </div>',
               eenableFiltering: false
           },

         ],

     };
     var reqObj = {
         PRCID: "GETFUNDSMANAGDETAILS",
         paramArray: ["-1", window.localStorage.getItem("projectId")]
     };


     $scope.getBackGroundColor = function (index) {
         if (index % 2 == 0)
             return "blue";
         else
             return "green";
     }


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
             ['projectID', 'ProjectTitle', 'Type', 'Status', 'ProjectSubType', 'StartDate', 'Agency'].forEach(function (field) {
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
                 PRCID: "GETFUNDMANAGEDETAILS",
                 paramArray: [parseInt(row.entity.id)]
             };

             executeApi(reqObj, function (data) {
                 console.log(data);
                 //window.location.reload();
                 $scope.gridOptions.data = data;
                 $scope.$apply();
             });
             

             swal("Deleted!", "Your Beneficiary Deleted sucessfully !", "success");
         });

     }
    
        
     $scope.showChart = function () {

         Highcharts.chart('container', {
             chart: {
                 type: 'column'
             },
             title: {
                 text: 'Rajneethi Funds performance'
             },
             subtitle: {
                 text: 'Source: http://rajneethi.com'
             },
             xAxis: {
                 categories: [
                     'Jan',
                     'Feb',
                     'Mar',
                     'Apr',
                     'May',
                     'Jun',
                     'Jul',
                     'Aug',
                     'Sep',
                     'Oct',
                     'Nov',
                     'Dec'
                 ],
                 crosshair: true
             },
             yAxis: {
                 min: 0,
                 title: {
                     text: 'Investment (mm)'
                 }
             },
             tooltip: {
                 headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                 pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                     '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                 footerFormat: '</table>',
                 shared: true,
                 useHTML: true
             },
             plotOptions: {
                 column: {
                     pointPadding: 0.2,
                     borderWidth: 0
                 }
             },
             series: [{
                 name: 'Testing',
                 data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

             }, {
                 name: 'Testing 12',
                 data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

             }, {
                 name: 'tes',
                 data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

             }, {
                 name: 'www',
                 data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
             }]
         });
     }

     $scope.showChart();
    
 });