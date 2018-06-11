connector.controller('SearchInputCtrl', function ($scope, Chats, $state, $rootScope) {
    $scope.searchText = {}
    $scope.headerState = $state.current.name
    console.log("$scope.headerState", $scope.headerState)
    if (_.isEmpty($.jStorage.get('mainTab'))) {

    } else {
        $scope.previousState = $.jStorage.get('mainTab').fromState
    }
    Chats.setkwackPollStateChange($state.current.name)
    $scope.goToFromState = function () {
        $scope.mainTab = Chats.getkwackPollStateChange();
        $state.go($scope.mainTab.fromState);
        Chats.flushMainTab();
    };
    Chats.setkwackPollStateChange($state.current.name)
    $scope.goBackHandler = function () {
        window.history.back(); //This works
    };
    $rootScope.toggleSearch = function () {
        Chats.setkwackPollStateChange($state.current.name)
        if ($scope.headerState == 'tab.explore') {
            $rootScope.searchInput = !$rootScope.searchInput
        } else if ($scope.headerState == 'tab.discoverNews') {
            $rootScope.searchInputdis = !$rootScope.searchInputdis
        } else if ($scope.headerState == 'tab.kwackScreen') {
            $rootScope.searchInputkwack = !$rootScope.searchInputkwack
        } else if ($scope.headerState == 'tab.exploremore') {
            $rootScope.searchInputexMore = !$rootScope.searchInputexMore
            console.log($rootScope.searchInputexMore)
        } else {
            $rootScope.searchInputsocial = !$rootScope.searchInputsocial
        }
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
            $state.go('tab.exploremorekwack', search)
        } else {
            $state.go('tab.exploremoresocial', search)
        }
    }
})