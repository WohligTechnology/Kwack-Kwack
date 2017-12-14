    $scope.param = $location.search();
    console.log("$scope.param", $scope.param.email);

    if ($.jStorage.get('user') == null) {
      $.jStorage.set("user", $scope.param);
    }
    $state.go('location', {
      userEmail: $scope.param.email
    });
