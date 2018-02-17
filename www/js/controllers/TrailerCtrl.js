connector.controller('TrailerCtrl', function ($scope, $ionicModal, Chats, $stateParams, $state, ionicToast) {
    $scope.newsId = $stateParams.newsid
    $scope.previousState = $stateParams.previousState
    $scope.newState = $stateParams.newState
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
        if (data1.value == true) {
            $scope.newsInfo = data1.data
        } else {}
    })
    $scope.saveKwack = function (kwack) {
        $scope.kwack1 = kwack
    }
    $scope.setvriableValue = false
    $scope.goANONYMOUS = function () {
        if ($scope.setvriableValue == false) {
            $scope.setvriableValue = true
        } else {
            $scope.setvriableValue = false
        }
    }
    $scope.nextPage = function () {
        if ($scope.kwack1 == undefined) {
            ionicToast.show('Choose Your side', 'top', false, 2500);
        } else {
            if ($scope.setvriableValue == true) {
                $state.go("debate1", {
                    kwackId: $scope.kwack1,
                    newsid: $stateParams.newsid,
                    ann: "ANONYMOUS",
                    previousState: $scope.previousState,
                    newState: $scope.newState
                })
            }
            if ($scope.setvriableValue == false) {
                $state.go("debate", {
                    kwackId: $scope.kwack1,
                    newsid: $stateParams.newsid,
                    previousState: $scope.previousState,
                    newState: $scope.newState
                })
            }
        }
    }
})