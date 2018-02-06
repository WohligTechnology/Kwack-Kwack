connector.controller('StartPollingCtrl', function ($scope, $stateParams, Chats,$state,ionicToast) {
    $scope.newsId = $stateParams.newsid
    $scope.previousState = $stateParams.previousState
    console.log("helloStateParams",$scope.previousState )
    data = {}
    data.newsId = $scope.newsId
     data.userId =$.jStorage.get('user')._id;
    console.log(" $scope.newsId", $scope.newsId)
    console.log("$state",$scope.previousState)
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
            console.log("{{ $scope.newsInfo}}", $scope.newsInfo)
        } else {

            console.log("inside else not found")
        }
    })
    $scope.savePoll = function (num) {
        console.log("num is num",num)
        $scope.data=num
        // var data = {}
        // data.newsId=$stateParams.newsid
        // data.pollname=num
        // data.userId=$.jStorage.get("user")._id
        // console.log("num", num)
        // Chats.apiCallWithData("PollAnswer/addPollAnswer", data, function (data1) {
        //     console.log("data is", data1)
        //     if (data1.value == true) {
        //         console.log("inside if found")
        //     } else {

        //         console.log("inside else not found")
        //     }
        // })
    }
    $scope.nextPage = function () {
    console.log("inside next page click",  $scope.data)
    if( $scope.data == undefined){
        console.log("please select ")
          ionicToast.show('Choose Your side', 'top', false, 2500);
    }else{
        console.log("inside else")
            var data = {}
        data.newsId=$stateParams.newsid
        data.pollname=$scope.data
        data.userId=$.jStorage.get("user")._id
        
        Chats.apiCallWithData("PollAnswer/addPollAnswer", data, function (data1) {
            console.log("data is", data1)
            if (data1.value == true) {
                  $state.go("polling-inside",{
             newsid:$stateParams.newsid,
             previousState: $scope.previousState
          })
                console.log("inside if found")
            } else {

                console.log("inside else not found")
            }
        })
    }
   
    }
})