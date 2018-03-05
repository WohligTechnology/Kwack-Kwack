connector.controller('LoginCtrl', function ($scope, $cordovaFileTransfer, Chats, $state, $stateParams, $cordovaOauthUtility, $cordovaOauth, ionicToast, $http) {
  if ($.jStorage.get("user")) {
    if (_.isEmpty($.jStorage.get("user").state)) {
      $state.go("mobile")
    } else {
      $state.go("tab.explore")
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

  $scope.facebookLogin = function () {
    $cordovaOauth.facebook("524845611226910", ["email", "user_location", "user_relationships"]).then(function (result) {
      console.log("Response Object -> " + JSON.stringify(result));
      console.log("facebookLogin", result)
      $.jStorage.set("socialLogin", result);
      $scope.socialLogin = $.jStorage.get("socialLogin")
      console.log($scope.socialLogin)
      if ($scope.socialLogin.access_token != '') {
        $http.get("https://graph.facebook.com/v2.5/me", {
          params: {
            access_token: $scope.socialLogin.access_token,
            fields: "id,name,email,gender,location,website,picture,relationship_status",
            format: "json"
          }
        }).then(function (result) {
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
          console.log('$scope.socialLoginData', $scope.socialLoginData)
          Chats.apiCallWithData("User/save", $scope.socialLoginData, function (data) {
            if (data.value == true) {
              $scope.userData = data.data;
              $scope.userData.verified = false;
              $.jStorage.set("user", $scope.userData);
              $state.go("inviteFriends")
            } else {
              console.log("display error")
            }
          })
        }, function (error) {
          alert("There was a problem getting your profile. Check the logs for details.");
          console.log(error);
        });

      } else {
        alert("Not signed in");
        $state.go("login");
      }
      //  $state.go("signUp")
      // results
    }, function (error) {
      console.log("facebook login crashed")
    })

  }

  $scope.twitterLogin = function () {
    //   var timestamp = "01-03-2018 13:21"    
    //   var date = new Date(timestamp * 1000);
    // var datevalues = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
    // $scope.currentTimestamp = datevalues;  
    // console.log("$scope.currentTimestamp ",$scope.currentTimestamp )
    //   $cordovaOauth.twitter("7PkdYSniJJjMRjVvYpUk2rHaY", "Df9FqyquPcYPKT92Ezkpn16SN6qGWnMmbbIiX55cO1pJhPSaTL").then(function(result){
    //     alert(JSON.stringify(result))
    //     console.log("result", result)
    //     $scope.twitterData = {}
    //     $scope.twitterData = result
    //     console.log("$scope.twitterData",$scope.twitterData)
    //     $http.post("https://api.twitter.com/oauth/authorize", { params: { oauth_token: $scope.twitterData.oauth_token}}).then(function(result) {
    //       console.log('helloData',result)
    //       alert(JSON.stringify(result))
    //     }, function(error) {
    //       alert("show me error");
    //       alert(JSON.stringify(error))
    //   });
    //     if($scope.twitterData.screen_name != ''){
    //       $http.get("https://api.twitter.com/1.1/users/show.json", { params: { screen_name: $scope.twitterData.screen_name}}).then(function(result) {
    //         console.log('helloData',result)
    //         alert(JSON.stringify(result))
    //       }, function(error) {
    //         alert("There was a problem getting your profile. Check the logs for details.");
    //         alert(JSON.stringify(error))
    //     });
    //     }

    //   },  function(error){
    //     alert(JSON.stringify(error))
    //   });

    TwitterConnect.login(
      function (result) {
        console.log('Successful login!');
        console.log(result);
        if (result.userName != '') {
          TwitterConnect.showUser(
            function (result) {
              console.log('User Profile:');
              console.log(result);
              console.log('Twitter handle :' + result.name);
              $scope.socialLoginData = {
                name: result.name,
                email: result.location,
                // city: Socialstate[0],
                country: "India"
              }
              console.log('$scope.socialLoginData', $scope.socialLoginData)
              Chats.apiCallWithData("User/getUserforSocailLogin", $scope.socialLoginData, function (data) {
                if (data.value == true) {
                  $scope.userData = data.data;
                  $scope.userData.verified = false;
                  $.jStorage.set("user", $scope.userData);
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


            },
            function (error) {
              console.log('Error retrieving user profile');
              console.log(error);
            }
          );
        }
      },
      function (error) {
        console.log('Error logging in');
        console.log(error);
      }
    );
  }

  $scope.googleLogin = function () {
    window.plugins.googleplus.login({
        'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
        'webClientId': '441725615810-ahmpeivsqvig3f9r5rdk2j22hnos2hro.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
        'offline': true // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
      },
      function (obj) {
        alert(JSON.stringify(obj)); // do something useful instead of alerting
      },
      function (msg) {
        alert('error: ' + msg);
      }
    );
  }
})