connector.controller('StartPollingCtrl', function ($scope, $stateParams, Chats, $state, ionicToast) {
    $scope.newsId = $stateParams.newsid
    $scope.previousState = $stateParams.previousState
    $scope.newState = $stateParams.newState
    $scope.goTo =$state.current.name
    console.log("hello state", $scope.goTo)
    Chats.setkwackPollStateChange( $scope.goTo)
    $scope.goToFromState = function () {
        $scope.mainTab = Chats.getkwackPollStateChange();
        $state.go($scope.mainTab.fromState);
        Chats.flushMainTab();
    };
    data = {}
    data.newsId = $scope.newsId
    data.userId = $.jStorage.get('user')._id;
    $scope.inApp = function (link) {
        var options = "location=no,toolbar=yes";
        var target = "_blank";
        $scope.finalURL = link;
        ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
        window.open = cordova.InAppBrowser.open;
    }
    $scope.goBackHandler = function () {
        window.history.back(); //This works
    };
    Chats.apiCallWithData("NewsInfo/getOneNews", data, function (data1) {
        Chats.setkwackPollStateChange($state.current.name)
      
        if (data1.value == true) {
            $scope.newsInfo = data1.data
            $scope.option1 = $scope.newsInfo.pollQuestionOption[0]
            $scope.option2 = $scope.newsInfo.pollQuestionOption[1]
        } else {}
    })
    $scope.savePoll = function (num) {
        $scope.data = num
    }
    $scope.nextPage = function () {
      
        if ($scope.data == undefined) {
            ionicToast.show('Choose Your side', 'top', false, 2500);
        } else {
            var data = {}
            data.newsId = $stateParams.newsid
            data.pollname = $scope.data
            data.userId = $.jStorage.get("user")._id

            Chats.apiCallWithData("PollAnswer/addPollAnswer", data, function (data1) {
                if (data1.value == true) {
                    $state.go("polling-inside", {
                        newsid: $stateParams.newsid,
                        previousState: $scope.previousState,
                        newState: $scope.newState
                    })
                } else {}
            })
        }
    }
})