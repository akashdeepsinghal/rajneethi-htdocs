var app = angular.module('rajneethi');
function getAPIBaseURL() {
    return "http://ec2-52-66-83-57.ap-south-1.compute.amazonaws.com/";
    //return "http://localhost:8081/";
}

function gethistrygraph(res) {
  //  var data=[];
   
        var dataobj=[];
        var votesdata = res.individual_votes_voteperentage_position.split('$');
        var votescount = votesdata[0].split('_');
        var votescount1 = votesdata[1].split('_');
        var totalvoter=votescount.concat(votescount1);
        var partydata = res.party_candidates.split('$')
        var partycount  =  partydata[0].split('_');
        var partycount1 = partydata[1].split('_');
        var totalparty = partycount.concat(partycount1);
       
        for (var t = 0; t < partycount.length; t++) {
            var s = {
                name: partycount[t],
                y: parseInt(votescount[t])
            }
            if (t == 0) {
                s.sliced = true;
                s.selected = true;
            }
            dataobj.push(s);
            //dataobj[t] = s.substring(0, s.lastIndexOf(","));
        }
      //  data[i] = [dataobj];
   
    
        return dataobj;
    
}

function executeApi(reqObj, cb, cberr) {
    //var url = "http://localhost:8081/api/v1/shared";
     var url = getAPIBaseURL()+"api/v1/shared";

    //var reqObj = {
    //    PRCID: "ELECTIONHISTORIES",
    //    paramArray: [10]
    //};

    $("#loadingModal").show();
    $.ajax({
        type: 'POST',
        url: url,
        contentType: 'application/json; charset=utf-8',
        async: true,
        processData: false,
        cache: false,
        data: JSON.stringify(reqObj),
        error: function (err) {
            $("#loadingModal").hide();
            cberr(err);
        },
        success: function (response) {
            $("#loadingModal").hide();
                cb(response);
            }
    });
}

function getConstituencyMap(projectId, cb, cberr) {
    console.log('getConstituencyMap called with projectId: ' + projectId)
    var url = getAPIBaseURL()+"api/v1/constituencymap/" + projectId;
    $("#loadingModal").show();
    $.ajax({
        type: 'GET',
        url: url,
        contentType: 'application/json; charset=utf-8',
        async: true,
        processData: false,
        cache: false,
        error: function (err) {
            console.log('err');
            console.log(err);
            $("#loadingModal").hide();
            cberr(err);
        },
        success: function (response) {
            console.log('response');
            console.log(response);
            $("#loadingModal").hide();
                cb(response);
            }
    });
}

function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

    var CSV = '';
    //Set Report title in first row or line

    //CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";

        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {

            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);

        //append Label row with line break
        CSV += row + '\r\n';
    }

    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";

        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);

        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {
        alert("Invalid data");
        return;
    }

    //Generate a file name
    var fileName = "Rajneethi_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g, "_");

    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    

    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    link.href = uri;

    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


function SetUser(user) {
    if (user)
        window.localStorage.setItem("USEROBJ", JSON.stringify(user));
    else
        window.localStorage.setItem("USEROBJ", null);
}

function GetUser(isLoginRequired) {
    var usr= null;
    try{
        var fromStorage = window.localStorage.getItem("USEROBJ");
        if(fromStorage){
            usr= JSON.parse(window.localStorage.getItem("USEROBJ"));
        }
    }catch(err){

    }

    if (usr)
        return usr;
    else {
        if (isLoginRequired)
            window.location.href = "#/login";
        else
            return null;
    }
}

