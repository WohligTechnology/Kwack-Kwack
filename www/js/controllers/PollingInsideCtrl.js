connector.controller('PollingInsideCtrl', function($scope,$stateParams,Chats) {
      $scope.newsId = $stateParams.newsid
    data = {}
    $scope.yes=[]
    $scope.no=[]
    data.newsId = $scope.newsId
    console.log(" $scope.newsId", $scope.newsId)
    $scope.inApp=function(link){
        console.log(link)
        var options = "location=no,toolbar=yes";
        var target = "_blank";
        $scope.finalURL = link;
        ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
        window.open = cordova.InAppBrowser.open;
            }
            $scope.goBackHandler = function() {
                window.history.back(); //This works
            };
    Chats.apiCallWithData("NewsInfo/getOneNews", data, function (data1) {
        console.log("data is", data1)
        if (data1.value == true) {
            console.log("inside if found")
            $scope.newsInfo = data1.data
            $scope.TotalPoll=data1.data.polls.length
            $scope.yesno = data1.data.polls
            _.forEach($scope.yesno,function(value) {
               
               if(value.poll==null){

               }else if(value.poll.pollOptions=='YES'){  
                $scope.yes.push(value)
                console.log("yes",$scope.yes)
                var yes=$scope.yes.length/$scope.TotalPoll * 100
               $scope.yespercent= _.round(yes)
                console.log("nopercent",$scope.yespercent)
               }else{
                $scope.no.push(value)
                console.log("no",$scope.no)
                var no=$scope.no.length/$scope.TotalPoll * 100
                $scope.nopercent=_.round(no)
                console.log("nopercent",$scope.nopercent)
               }
            });
            console.log("{{ $scope.newsInfo}}", $scope.newsInfo)
            console.log("{{ $scope.newsInfo}}", $scope.TotalPoll)
        } else {

            console.log("inside else not found")
        }
    })
     
})