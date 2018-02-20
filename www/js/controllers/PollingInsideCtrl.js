connector.controller('PollingInsideCtrl', function ($scope, $stateParams, $state, Chats, $ionicHistory) {
    $scope.newsId = $stateParams.newsid
    $scope.previousState = $.jStorage.get("mainTab").fromState
    $scope.newState = $stateParams.newState
    data = {}
    $scope.userId = $.jStorage.get('user')._id
    $scope.yes = []
    $scope.no = []
    data.newsId = $scope.newsId
    data.userId = $.jStorage.get('user')._id;
    $scope.inApp = function (link) {
        var options = "location=no,toolbar=yes";
        var target = "_blank";
        $scope.finalURL = link;
        ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
        window.open = cordova.InAppBrowser.open;
    }

    $scope.goToFromState = function () {
        $scope.mainTab = Chats.getkwackPollStateChange();
        $state.go($scope.mainTab.fromState);
        Chats.flushMainTab();
    };
    Chats.apiCallWithData("NewsInfo/getOneNews", data, function (data1) {
        if (data1.value == true) {
            $scope.newsInfo = data1.data
            if( $scope.newsInfo.IsPoll=="YES"){
                $scope.option1 = data1.data.pollQuestionOption[0]
                $scope.option2 = data1.data.pollQuestionOption[1]
            }
           
            $scope.TotalKwacks = data1.data.comments.length
            $scope.TotalPoll = data1.data.polls.length
            $scope.yesno = data1.data.polls
            console.log("$scope.yesno", $scope.newsInfo)
            if ($scope.newsInfo.IsPoll=="NO") {
                console.log("Innside poll f condi yes no")
                _.forEach($scope.yesno, function (value) {
                    if (value.poll == null) {} else if (value.poll.pollOptions == 'YES') {
                        $scope.yes.push(value)
                        var yes = $scope.yes.length / $scope.TotalPoll * 100
                        $scope.yespercent = _.round(yes)
                    } else {
                        $scope.no.push(value)
                        var no = $scope.no.length / $scope.TotalPoll * 100
                        $scope.nopercent = _.round(no)
                    }
                });
            }else{
                _.forEach($scope.yesno, function (value) {
                    if (value.poll == null) {} else if (value.poll.pollOptions == $scope.option1) {
                        $scope.yes.push(value)
                        var yes = $scope.yes.length / $scope.TotalPoll * 100
                        $scope.yespercent = _.round(yes)
                    } else {
                        $scope.no.push(value)
                        var no = $scope.no.length / $scope.TotalPoll * 100
                        $scope.nopercent = _.round(no)
                    }
                });
                // $scope.opt1=$scope.newsInfo
                console.log("Inide else part demo1 demo2")
            }
        } else {}
    })

    $scope.nextPage = function (data, kwackPoll) {
        var data1 = {}
        data1.newsId = data,
            data1.userId = $.jStorage.get("user")._id
        Chats.apiCallWithData("Comment/getKwack", data1, function (data1) {
            if (data1.value == true) {
                $state.go("debate", {
                    newsid: data,
                    previousState: $scope.previousState,
                    newState: $scope.newState
                })
            } else {
                var KwackParams = {
                    newsid: data,
                    previousState: $scope.previousState,
                    newState: $scope.newState
                }
                if ($scope.previousState == 'tab.discoverNews') {
                    $state.go('tab.trailerdis', KwackParams)
                } else if ($scope.previousState == 'tab.explore') {
                    $state.go('tab.trailerex', KwackParams)
                } else if ($scope.previousState == 'tab.kwackScreen') {
                    $state.go('tab.trailerkwack', KwackParams)
                } else {
                    $state.go('tab.trailersocial', KwackParams)
                }
            }
        })
    }
})