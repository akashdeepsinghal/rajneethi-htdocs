 var app = angular.module('rajneethi');

 app.controller('casteEquationCtrl', function($scope, $routeParams, $http) {
     var projectId = $routeParams.id;
    

     $http.get('http://ec2-52-66-83-57.ap-south-1.compute.amazonaws.com/api/v1/constituencymap/'+projectId).success(function(res){


      $scope.constituencymap=res;
        $scope.booths=[];       
        $scope.constituencymap.forEach(function(item){
            $scope.selectedBooth="Default";
            $scope.showchart($scope.selectedBooth);
            $scope.booths.push(item.booth_panchayat_name);
        });


     }).error(function(err){
      console.log(err)
     }); 
     

     function chunk(arr, chunkSize) {
         var R = [];
         for (var i = 0, len = arr.length; i < len; i += chunkSize)
             R.push(arr.slice(i, i + chunkSize));
         return R;
     }

     function oddOrEven(x) {
         return (x & 1) ? true : false;
     }

     $scope.showchart = function(booth) {

         var result = []
         $scope.constituencymap.forEach(function(item) {
             if (item.booth_panchayat_name === booth) {
                 $scope.constituency = item.local_assembly_name;
                 var data = item.caste_equation_percentage.split("_");
                 var d = [];
                 data.forEach(function(item, index) {
                     if (oddOrEven(index)) {
                         d.push(parseInt(item))
                     } else {
                         d.push(item)
                     }
                 });
                 result = chunk(d, 2);
             }
         })


         if(booth=='Default'){
         var heading= 'Constituency' ;
         }else{
          var heading= booth;
         }

         Highcharts.chart('chart', {
             colors: ["#4885ed", "#f4c20d", "#db3236", "#3cba54", "#aaeeee"],
             chart: {
                 type: 'pie',
                 marginTop: -300,
                 marginBottom: -300,
                 marginLeft: 0,
                 marginRight: 300,
                 backgroundColor: 'rgba(255, 255, 255, 0.1)',

             },
             credits: {
                 enabled: false
             },
             colorByPoint: true,
             title: {
                 text: heading + '- Caste Equation'
             },
             yAxis: {
                 title: {
                     text: 'Total percent Castes'
                 }
             },
             plotOptions: {
                 pie: {
                     shadow: false,
                     center: ['50%', '50%']
                 },
             },
             tooltip: {
                 formatter: function() {
                     return '<b>' + this.point.name + '</b>: ' + this.y;
                 }
             },
             legend: {
                 enabled: true,
                 itemStyle: {
                     fontWeight: 'bold',
                     fontSize: '20px',
                     padding: '10px',
                 },

                 layout: 'vertical',
                 align: 'right',
                 verticalAlign: 'middle',
                 labelFormatter: function() {
                     return '<b> ' + this.name + '</b> ';
                 }
             },
             series: [{
                 name: 'Caste Equation',
                 data: result,
                 size: '40%',
                 innerSize: '60%',
                 showInLegend: true,
                 dataLabels: {
                     formatter: function() {
                         return '<b>' + this.point.y + '%</b> ';
                     }
                 }
             }]

         });
     }




 });