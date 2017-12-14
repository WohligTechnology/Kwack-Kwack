var connector = angular.module('starter.controllers', ['starter.controllers'])

  .controller('DashCtrl', function ($scope) {})

  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('HomeCtrl', function ($scope, $stateParams, Chats) {
    $scope.sliderData = {};
    console.log("after api called login")

    var setupSlider = function () {
      //some options to pass to our slider
      $scope.sliderData.sliderOptions = {
        initialSlide: 0,
        direction: 'horizontal', //or vertical
        speed: 300, //0.3s transition
        autoplay: 5000
      };

      //create delegate reference to link with slider
      $scope.sliderData.sliderDelegate = null;
      //watch our sliderDelegate reference, and use it when it becomes available
      $scope.$watch('data.sliderDelegate', function (newVal, oldVal) {
        if (newVal != null) {
          $scope.sliderData.sliderDelegate.on('slideChangeEnd', function () {
            $scope.sliderData.currentPage = $scope.sliderData.sliderDelegate.activeIndex;
            //use $scope.$apply() to refresh any content external to the slider
            $scope.$apply();
          });
        }
      });
    };

    setupSlider();
  })



  .controller('DiscoverCtrl', function ($scope, $ionicModal) {
    $ionicModal.fromTemplateUrl('templates/modal/filter1.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function () {
      $scope.modal.show();
    }

    $scope.closeModal = function () {
      $scope.modal.hide();
    };
  })

  .controller('DiscoverNewsCtrl', function ($scope) {
    $scope.activeTab = 1;
    $scope.changeTab = function (num) {
      $scope.activeTab = num;
    }
  })

  .controller('ProfileCtrl', function ($scope) {})

  .controller('FilterCtrl', function ($scope) {})

  .controller('SignUpCtrl', function ($scope, Chats, $state) {
    $scope.saveUser = function (info) {
      if (info.password == info.forgotPassword) {
        Chats.apiCallWithData("User/save", info, function (data) {
          console.log("data is", data)
          if (data.value == true) {
            $scope.data = data;

            $state.go("otp")
          }
        })
      } else {
        console.log("inside else")
      }
    }

  })

  .controller('SocialCtrl', function ($scope) {})
  .controller('DebateCtrl', function ($scope) {})

  .controller('OtpCtrl', function ($scope) {})

  .controller('InviteFriendsCtrl', function ($scope) {
    $scope.toggle = true
    $scope.people = function () {
      $scope.toggle = true
    }
    $scope.contact = function () {
      $scope.toggle = false
    }
    $scope.followersb = true;
    $scope.followers = function () {
      $scope.followersb = true;
      $scope.kwacksb = false;
      $scope.pollsb = false;
    }
    $scope.kwacks = function () {
      $scope.followersb = false;
      $scope.kwacksb = true;
      $scope.pollsb = false;
    }
    $scope.polls = function () {
      $scope.followersb = false;
      $scope.pollsb = true;
      $scope.kwacksb = false;
    }
  })

  .controller('SrartPollingCtrl', function ($scope) {})


  .controller('ExploreCtrl', function ($scope) {})

  .controller('LocationCtrl', function ($scope, Chats, $state,$stateParams) {
   if($stateParams.userEmail){
  $scope.emailData={
      email:$stateParams.userEmail
    }
    console.log("inside login stateparams", $scope.emailData)
    Chats.apiCallWithData("User/getUser", $scope.emailData, function (data) {
            $scope.formData = data.data;
             $.jStorage.set("user",  $scope.formData);
              $scope.dataToSave = {
        _id: $.jStorage.get("user")._id
      }
 
        })
   }
         $scope.dataToSave = {
        _id: $.jStorage.get("user")._id
      }
       console.log(" $scope.dataToSave ", $scope.dataToSave )
        $scope.addCountry = function (data) {
        if (data.state && data.country) {
          $scope.dataToSave.country = data.country,
            $scope.dataToSave.state = data.state,
            console.log("data to store", $scope.dataToSave)
            Chats.apiCallWithData("User/save", $scope.dataToSave, function (data) {
              if (data.value == true) {

              } else {

              }
            })
        } else {
          console.log("inside else part")
        }

      }
      $scope.addState = function (data) {
        if (data.state && data.country) {
          $scope.dataToSave.country = data.country,
            $scope.dataToSave.state = data.state,
            Chats.apiCallWithData("User/save", $scope.dataToSave, function (data) {
              if (data.value == true) {

              } else {

              }
            })
        } else {
          console.log("inside else part")
        }
      }
    




  })

  .controller('InviteCtrl', function ($scope) {
    $scope.toggle = true
    $scope.people = function () {
      $scope.toggle = true
    }
    $scope.contact = function () {
      $scope.toggle = false
    }
    $scope.followersb = true;
    $scope.followers = function () {
      $scope.followersb = true;
      $scope.kwacksb = false;
      $scope.pollsb = false;
    }
    $scope.kwacks = function () {
      $scope.followersb = false;
      $scope.kwacksb = true;
      $scope.pollsb = false;
    }
    $scope.polls = function () {
      $scope.followersb = false;
      $scope.pollsb = true;
      $scope.kwacksb = false;
    }
  })

  .controller('LoginCtrl', function ($scope, Chats, $state, $stateParams) {

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

  .controller('AccountInsieCtrl', function ($scope) {})
  .controller('ParampageCtrl', function ($scope, $state, $location, $state) {
    $scope.param = $location.search();
    console.log("$scope.param", $scope.param.email);

    if ($.jStorage.get('user') == null) {
      $.jStorage.set("user", $scope.param);
    }
    $state.go('location', {
      userEmail: $scope.param.email
    });


  })
  .controller('AboutInsieCtrl', function ($scope) {})

  .controller('KwackScreenCtrl', function ($scope) {})
  .controller('PollingInsideCtrl', function ($scope) {})
  .controller('SettingsCtrl', function ($scope) {})
  .controller('EditCtrl', function ($scope) {})
  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });