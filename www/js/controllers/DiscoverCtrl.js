connector.controller('DiscoverCtrl', function ($scope, Chats, $ionicModal) {
  $scope.jstorage = {}
  $scope.allInterest = []
  $scope.jstorage = $.jStorage.get('user');
  $scope.addInterest = {}
  $scope.addInterest.userId = $scope.jstorage._id
  $scope.addInterest.interest = []
  $scope.interestarr = []
  $scope.goBackHandler = function () {
    window.history.back(); //This works
  };
  $ionicModal.fromTemplateUrl('templates/modal/filter1.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function () {
    $scope.modal.show();
  }
  $scope.select = function (interest) {
    _.forEach($scope.allInterest, function (value) {
      if (value.name == interest) {
        value.value = !value.value
      }
    });
    var interestEdit = _.find($scope.interestarr, function (o) {
      if (interest == o.name) {
        return o;
      }
    });
    if (interestEdit === undefined) {
      $scope.interestarr.push({
        name: interest
      })
      $scope.addInterest.interest = $scope.interestarr
      $scope.colorchange = interestEdit
    } else {
      _.pull($scope.interestarr, interestEdit)
      $scope.addInterest.interest = $scope.interestarr
      $scope.colorchange = interestEdit
    }
    Chats.noLoaderApi("User/addInterests", $scope.addInterest, function (data) {})
  }

  Chats.apiCallWithoutData("Interests/getAllInterests", function (data) {
    $scope.allInterest = data.data;
    $scope.interestdup = _.chunk($scope.allInterest, 3);
  })
  $scope.search = function (value) {
    $scope.companyCategory = [];
    $scope.isText = true;
    if (value.searchText != "") {
      Chats.apiCallWithData("Interests/globalSearch", value, function (data) {
        if (data.value) {
          $scope.Interestsname = data.data.Interests;
        } else {}
      });
    }
  };
})