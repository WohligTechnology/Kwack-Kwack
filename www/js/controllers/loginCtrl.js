connector.controller('LoginCtrl', function ($scope, Chats, $state, $stateParams) {

    $scope.verifyUser = function (info) {
      Chats.apiCallWithData("User/VerifyUser", info, function (data) {
        console.log("data is", data)
        if (data.value == true) {
          $scope.data = data;
          $.jStorage.set("user", $scope.data.data);
          $state.go("otp")
        } else {
          toastr.error("incorrect");
        }
      })

    }
    $scope.navigation = Chats.getNavigation();
    $scope.currentHost = window.location.origin;
    console.log($state.current.name);
    console.log('Inside controller', $stateParams.id);
    if ($stateParams.id) {
      if ($stateParams.id === "AccessNotAvailable") {
        toastr.error("You do not have access for the Backend.");
      } else {
        console.log($stateParams.id);
        Chats.parseAccessToken($stateParams.id, function () {
          Chats.profile(function () {
            $state.go("home");
          }, function () {
            $state.go("login");
          });
        });
      }
    } else {
      Chats.removeAccessToken();
    }
})
