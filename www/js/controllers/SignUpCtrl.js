connector.controller('SignUpCtrl', function ($scope, Chats, $state, ionicToast, $http, $cordovaOauth) {
   
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

  $scope.facebookLogin = function () {
    $cordovaOauth.facebook("1979088845454078", ["email", "user_location", "user_relationships"]).then(function (result) {
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
          // var Socialstate = result.data.location.name.split(",")
          $scope.socialLoginData = {
            name: $scope.profileData.name,
            email: $scope.profileData.email,
            socailLoginPhoto: $scope.profileData.picture.data.url,
            // state: Socialstate[1],
            // city: Socialstate[0],
            // country: "India"
          }
          Chats.apiCallWithData("User/getUserforSocailLoginFacebook", $scope.socialLoginData, function (data) {
            if (data.value == true) {
              $scope.userData = data.data;
              $scope.userData.verified = false;
              $.jStorage.set("user", $scope.userData);
              $state.go("tab.explore")
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
                screenName: result.screen_name,
                socailLoginPhoto:result.profile_image_url
                // city: Socialstate[0],
                // country: "India"
              }
              console.log('$scope.socialLoginData', $scope.socialLoginData)
              Chats.apiCallWithData("User/getUserforSocailLogin", $scope.socialLoginData, function (data) {
                if (data.value == true) {
                  $scope.userData = data.data;
                  $scope.userData.verified = false;
                  $.jStorage.set("user", $scope.userData);
                  $state.go("tab.explore")
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
        'webClientId': '557842286830-hsea4a5agi4cqq9rk6i7aptsms98324v.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
        // 'offline': true // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
      },
      function (obj) {
         // do something useful instead of alerting
        console.log('done google login', obj)

        $scope.profileData = obj;
        // var Socialstate = result.data.location.name.split(",")
        $scope.socialLoginData = {
          name: $scope.profileData.displayName,
          email: $scope.profileData.email,
          socailLoginPhoto: $scope.profileData.imageUrl,
          // state: Socialstate[1],
          // city: Socialstate[0],
          // country: "India"
        }
        Chats.apiCallWithData("User/getUserforSocailLoginFacebook", $scope.socialLoginData, function (data) {
          if (data.value == true) {
            $scope.userData = data.data;
            $scope.userData.verified = false;
            $.jStorage.set("user", $scope.userData);
            $state.go("tab.explore")
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
      function (msg) {
        console.log('done google login', msg)
      }
    );
  }
})