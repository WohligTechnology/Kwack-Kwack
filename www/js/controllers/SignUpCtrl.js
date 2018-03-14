connector.controller('SignUpCtrl', function ($scope, Chats, $state, ionicToast, $http) {
   
    $scope.showMassage = false
    $scope.setEmailMsg = false
    $scope.saveUser = function (info) {
        if (info.password == info.forgotPassword) {
            if ($.jStorage.get('user')) {
                info._id = $.jStorage.get('user')._id
            } console.log("bvhjgjkhklj",info)
            Chats.apiCallWithData("User/saveUser", info, function (data) {
               
                if (data.value == true) {
                    $scope.userData = data.data;
                    $scope.userData.verified = false;
                    $.jStorage.set("user", $scope.userData);
                    $state.go("mobile")
                } else {
                    if (data.error == "emailExist") {
                        $scope.setEmailMsg = true
                    }
                    if (data.error == "mobileExist") {
                        $scope.setMobileMsg = true
                    }
                }
            })
        } else {
            $scope.showMassage = true
        }
    }
    $scope.demo = function () {
        $scope.setEmailMsg = false
    };
    $scope.demo1 = function () {
        $scope.setMobileMsg = false
    };

    $scope.facebookLogin = function() {
        $cordovaOauth.facebook("1814304471935090", ["email", "user_location", "user_relationships"]).then(function(result) {
          console.log("Response Object -> " + JSON.stringify(result));
          console.log("facebookLogin",result)
          $.jStorage.set("socialLogin", result);
          $scope.socialLogin =  $.jStorage.get("socialLogin")
          console.log($scope.socialLogin)
          if($scope.socialLogin.access_token != '') {
              $http.get("https://graph.facebook.com/v2.5/me", { params: { access_token: $scope.socialLogin.access_token, fields: "id,name,email,gender,location,website,picture,relationship_status", format: "json" }}).then(function(result) {
                  $scope.profileData = result.data;
                //   var Socialstate = result.data.location.name.split(",")
                  $scope.socialLoginData = {
                    name: $scope.profileData.name,
                    email: $scope.profileData.email,
                     socailLoginPhoto: $scope.profileData.picture.data.url,
                    // state: Socialstate[1],
                    // city: Socialstate[0],
                    // country: "India"
                  }
  
                     Chats.apiCallWithData("User/getUserforSocailLogin", $scope.socialLoginData, function (data) {
                if (data.value == true) {
                  $scope.userData = data.data;
                  $scope.userData.verified = false;
                  $.jStorage.set("user", $scope.userData);
                     $state.go("inviteFriends")
                } else {
                  Chats.apiCallWithData("User/save", $scope.socialLoginData, function (data) {
                    console.log("*********************after saving the user in database", data)
                    if (data.value == true) {
                      $scope.userData = data.data;
                      $scope.userData.verified = false;
                      $.jStorage.set("user", $scope.userData);
                      $state.go("inviteFriends")
                    } else {
                      console.log("display error")
                    }

                  })
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