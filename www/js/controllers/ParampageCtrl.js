connector.controller('ParampageCtrl', function ($scope, Chats, $state, $stateParams,$location) {

    console.log("param page ctrl")
    $scope.param = $location.search();
    console.log("$scope.param", $scope.param);

    if ($.jStorage.get('user') == null) {
        $.jStorage.set("user", $scope.param);
    }
    $state.go("tab.explore")
})