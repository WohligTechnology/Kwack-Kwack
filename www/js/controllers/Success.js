connector.controller('SuccessCtrl', function ($scope, $state) {
    $scope.success = $.jStorage.get("mobile")
    $scope.nextstate = function () {
        if ($scope.success != null) {
            $state.go("confirmpass")
        } else {
            $state.go("location")
        }
    }
})