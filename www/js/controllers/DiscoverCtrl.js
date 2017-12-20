connector.controller('DiscoverCtrl', function($scope,Chats, $ionicModal) {
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
        Chats.apiCallWithoutData("Interests/getAllInterests", function (data) {
        console.log("data is*****************", data)
       
      })
  })