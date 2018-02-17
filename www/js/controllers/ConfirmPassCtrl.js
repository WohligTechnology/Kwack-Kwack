connector.controller('ConfirmPassCtrl', function ($scope, ionicToast, $state, Chats) {
  $scope.verifiedUser = $.jStorage.get("user");
  $scope.resetPassword = function (formName) {
    $scope.savePassword = {
      mobile: $.jStorage.get("user").mobile,
      password: formName.password
    }
    if (formName.confirm == formName.password) {
      Chats.apiCallWithData("User/saveNewPassword", $scope.savePassword, function (info) {
        if (info.value == true) {
          ionicToast.show('Password changed successfully', 'top', false, 2500);
          $scope.verifiedUser.verified = true
          $.jStorage.set("user", $scope.verifiedUser);
          $state.go("login")
        }
      })
    } else {
      ionicToast.show('Password does not match', 'top', false, 2500);
    }
  }
});