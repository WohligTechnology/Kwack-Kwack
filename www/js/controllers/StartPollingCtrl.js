connector.controller('StartPollingCtrl', function ($scope, $stateParams, Chats,$state) {
    $scope.newsId = $stateParams.newsid
    data = {}
    data.newsId = $scope.newsId
    console.log(" $scope.newsId", $scope.newsId)
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
        var data = {}
        data.newsId=$stateParams.newsid
        data.pollname=num
        data.userId=$.jStorage.get("user")._id
        console.log("num", num)
        Chats.apiCallWithData("PollAnswer/addPollAnswer", data, function (data1) {
            console.log("data is", data1)
            if (data1.value == true) {
                console.log("inside if found")
            } else {

                console.log("inside else not found")
            }
        })
    }
    $scope.nextPage = function () {
    console.log("inside next page click")
     $state.go("polling-inside",{
             newsid:$stateParams.newsid
          })
    }
})