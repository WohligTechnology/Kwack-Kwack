connector.controller('ExploremoreCtrl', function($scope,$stateParams, Chats) {
    $scope.newsId = {}
    $scope.newsId._id = $stateParams.newsid
    console.log("newsid", $scope.newsId)
    // $scope.jstorage = $.jStorage.get('user');
    data = {}
    $scope.dataToSend = {}
    data.newsId = $scope.newsId
    $scope.dataToSend.newsId = $stateParams.newsid
    $scope.dataToSend.userId = $scope.userId
    
    $scope.inApp=function(link){
console.log(link)
var options = "location=no,toolbar=yes";
var target = "_blank";
$scope.finalURL = link;
ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
window.open = cordova.InAppBrowser.open;
    }
    // Chats.apiCallWithData("Readlogs/readLogs",  function (data) {
//         Chats.apiCallWithData("Readlogs/readLogs", data, function (data1) {
//             $scope.news = data1.data
//         if(data.value == true){
//             Chats.apiCallWithData("Readlogs/checkingNewsReadOrNot", data, function (data) {
//             $scope.news = data.data
//             })
//         }
//        else{

//        }
//  })
console.log("*******insideif ")
 Chats.apiCallWithData("Readlogs/checkingNewsReadOrNot", $scope.dataToSend, function (data) {
   console.log("readlogs",data)
    if(data.value == true){
        console.log("insid if")
        Chats.apiCallWithData("NewsInfo/getOne", $scope.newsId, function (data) {
            console.log("*******insideif " ,data)
            $scope.news = data.data;
           
          })

    }
    else{
        console.log("insid else")
        
        Chats.apiCallWithData("Readlogs/readLogsCount", $scope.dataToSend, function (data1) {
            console.log("inside else",data1)
            $scope.news = data1.data
          })
    }
    })


})