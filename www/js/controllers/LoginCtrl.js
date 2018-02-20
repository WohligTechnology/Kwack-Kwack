connector.controller('LoginCtrl', function ($scope, $cordovaFileTransfer, Chats, $state, $stateParams, $cordovaOauth, ionicToast, $http) {
  if ($.jStorage.get("user")) {
    if ($.jStorage.get("user").verified) {
      $state.go("tab.explore")
    } else {
      $state.go("mobile")
    }
  }
  $scope.showerrMsg = false
  $scope.verifyUser = function (info) {
    $scope.str = info.email
    info.email = $scope.str.toLowerCase();

    Chats.apiCallWithData("User/VerifyUser", info, function (data) {
      if (data.value == true) {
        $scope.data = data;
        $.jStorage.set("user", $scope.data.data);
        $state.go("tab.explore")
      } else {
        if (data.error == "DeactiveAcc") {
          ionicToast.show('Account is Deleted', 'top', false, 2500);
        } else {
          $scope.showerrMsg = true
          // toastr.error("incorrect");
          ionicToast.show('incorrect credentials', 'top', false, 2500);
        }
      }
    })
  }
  $scope.hideToast = function () {
    ionicToast.hide();
  };

  $scope.facebook = function (link) {
    $scope.navigation = Chats.getNavigation();
    $scope.currentHost = window.location.origin;
    if ($stateParams.id) {
      if ($stateParams.id === "AccessNotAvailable") {
        toastr.error("You do not have access for the Backend.");
      } else {
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
    var options = "location=no,toolbar=yes";
    var target = "_blank";
    $scope.finalURL = link;
    ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
    window.open = cordova.InAppBrowser.open;
  }

  $scope.facebookLogin = function() {
      $cordovaOauth.facebook("1814304471935090", ["email", "user_location", "user_relationships"]).then(function(result) {
        console.log("Response Object -> " + JSON.stringify(result));
        console.log("facebookLogin",result)
        $.jStorage.set("socialLogin", result);
        $scope.socialLogin =  $.jStorage.get("socialLogin")
        console.log($scope.socialLogin)
        if($scope.socialLogin.access_token != '') {
            $http.get("https://graph.facebook.com/v2.5/me", { params: { access_token: $scope.socialLogin.access_token, fields: "id,name,mobile,email,gender,location,website,picture,relationship_status", format: "json" }}).then(function(result) {
                $scope.profileData = result.data;
                var Socialstate = result.data.location.name.split(",")
                $scope.socialLoginData = {
                  name: $scope.profileData.name,
                  email: $scope.profileData.email,
                  photo: $scope.profileData.picture.data.url,
                  state: Socialstate[1],
                  // city: Socialstate[0],
                  country: "India"
                }

                Chats.apiCallWithData("User/saveUser", $scope.socialLoginData, function (data) {
                  if (data.value == true) {
                      $scope.userData = data.data;
                      $scope.userData.verified = false;
                      $.jStorage.set("user", $scope.userData);
                      $state.go("invite")
                  } else {
                      console.log("display error")
                  }
              })
            }, function(error) {
                alert("There was a problem getting your profile.  Check the logs for details.");
                console.log(error);
            });

        } else {
            alert("Not signed in");
            $state.go("login");
        } 
        //  $state.go("signUp")
          // results
      }, function(error) {
          console.log("facebook login crashed")
      })
      
}
})