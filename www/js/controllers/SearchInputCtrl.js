connector.controller('SearchInputCtrl', function ($scope, Chats, $state, $rootScope) {
    $scope.searchText = {}
    $scope.headerState = $state.current.name
    if (_.isEmpty($.jStorage.get('mainTab'))) {

    } else {
        $scope.previousState = $.jStorage.get('mainTab').fromState
    }

    Chats.setkwackPollStateChange($state.current.name)
    $scope.goBackHandler = function () {
        window.history.back(); //This works
    };
    $rootScope.toggleSearch = function () {
        Chats.setkwackPollStateChange($state.current.name)
        $rootScope.searchInput = !$rootScope.searchInput
    }
    $scope.search = function (value) {
        $scope.discoverFull = [];
        $scope.isText = true;
        if (value.searchText != "") {
            Chats.apiCallWithData("NewsInfo/globalSearchForNews", value, function (data) {
                if (data.data) {
                    $scope.discoverFull = data.data.NewsInfo;
                } else {}
            });
        }
    };

    $scope.searchCancel = function (data) {
        $scope.searchText.searchText = ""
    }

    $scope.viewsNextPage = function (data) {
        var search = {
            newsid: data,
        }
        if ($scope.previousState == 'tab.discoverNews') {
            $state.go('tab.exploremoredis', search)
        } else if ($scope.previousState == 'tab.explore') {
            $state.go('tab.exploremore', search)
        } else if ($scope.previousState == 'tab.kwackScreen') {
            $state.go('tab.trailerkwack', search)
        } else {
            $state.go('tab.trailersocial', search)
        }
    }
})