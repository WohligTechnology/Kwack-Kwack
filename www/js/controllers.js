angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('HomeCtrl', function($scope, $stateParams, Chats) {
  $scope.sliderData = {};

   
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

.controller('TrailerCtrl', function($scope) {
})

.controller('DiscoverCtrl', function($scope) {
})

.controller('DiscoverNewsCtrl', function($scope) {
})

.controller('ProfileCtrl', function($scope) {
})

.controller('FilterCtrl', function($scope) {
})

.controller('SignUpCtrl', function($scope) {
})


.controller('OtpCtrl', function($scope) {
})

.controller('InviteFriendsCtrl', function($scope) {
})

.controller('SrartPollingCtrl', function($scope) {
})


.controller('ExploreCtrl', function($scope) {
})


.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
