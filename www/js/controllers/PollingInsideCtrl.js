connector.controller('PollingInsideCtrl', function($scope,$stateParams,Chats) {
      $scope.newsId = $stateParams.newsid
    data = {}
    data.newsId = $scope.newsId
    console.log(" $scope.newsId", $scope.newsId)
    Chats.apiCallWithData("NewsInfo/getOneNews", data, function (data1) {
        console.log("data is", data1)
        if (data1.value == true) {
            console.log("inside if found")
            $scope.newsInfo = data1.data
            $scope.TotalPoll=data1.data.polls.length
            console.log("{{ $scope.newsInfo}}", $scope.newsInfo)
            console.log("{{ $scope.newsInfo}}", $scope.TotalPoll)
        } else {

            console.log("inside else not found")
        }
    })
     
})