connector.controller('ConfirmPassCtrl', function($scope, ionicToast, $state, Chats) {
   $scope.resetPassword = function (formName) {
     console.log("confirmpassword", formName)
     $scope.savePassword={
       mobile: $.jStorage.get("user").mobile,
       password:formName.password
     }
     if(formName.confirm==formName.password){
      console.log("otp",$scope.savePassword)
      Chats.apiCallWithData("User/saveNewPassword", $scope.savePassword, function (info) {
        
        if (info.value == true) {
            ionicToast.show('Password changed successfully', 'top', false, 2500);
          $state.go("login")
        }
    })
     }else{
      ionicToast.show('Password does not match', 'top', false, 2500);
     }
   }
  });