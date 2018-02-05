connector.controller('AccountInsieCtrl', function ($scope, Chats, $state, $ionicPopup, $timeout) {
    $scope.deleteThisUser = function () {
        $scope.datatoDelete = {}
        $scope.datatoDelete.userId = $.jStorage.get('user');
        Chats.apiCallWithData("User/setDeactiveUser", $scope.datatoDelete, function (data) {
            if (data.value == true) {
                var confirmPopup = $ionicPopup.confirm({
                    // title: 'Consume Ice Cream',
                    template: 'Are you sure you want to delete this account?'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        $.jStorage.flush()
                        $state.go("signUp")
                    } else {

                    }
                });
            }

        })
    };










})