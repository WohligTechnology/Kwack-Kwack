connector.controller('HomeCtrl', function ($scope, $stateParams, Chats) {
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