connector.controller('SettingsCtrl', function ($scope, Chats, $state) {
  $scope.jstorage = {}
  $scope.allInterest = []
  $scope.jstorage = $.jStorage.get('user');
  $scope.addInterest = {}
  $scope.addInterest.userId = $scope.jstorage._id
  $scope.addInterest.interest = []
  console.log("heyyjstorage", $scope.addInterest)
  $scope.interestarr = []
  $scope.viewmore = false;
  $scope.view3 = true;

  $scope.goBackHandler = function () {
    window.history.back(); //This works
  };

  $scope.viewall = function () {
    $scope.viewmore = true;
    $scope.view3 = false;
  }
  $scope.viewLess3 = function () {
    $scope.viewmore = false;
    $scope.view3 = true;
  }
  //  logout
  $scope.logout = function () {
    $.jStorage.flush();
    $state.go("login");
  }
  //profile
  $scope.user = {}
  $scope.user._id = $scope.jstorage._id
  Chats.apiCallWithData("User/getOne", $scope.user, function (data) {
     if (data.value == true) {
      $scope.userInfo = data.data
    } else {

    }
  })

  $scope.test='small'
  //change font size
  $scope.font = '';
  $scope.changesize = function (data) {
    $scope.font = data;
  }

  // interest
  Chats.apiCallWithoutData("Interests/getAllInterests", function (data) {
    $scope.allInterest = data.data

    console.log("data is*****************", $scope.allInterest)
    $scope.interestdup = _.chunk($scope.allInterest, 2);
  })

  //search interest

  $scope.select = function (interest) {
    console.log("$scope.allInterest", interest);


    _.forEach($scope.allInterest, function (value) {

      console.log("helloworld", $scope.allInterest)
      if (value.name == interest) {
        value.value = !value.value
      }
    });
    var interestEdit = _.find($scope.interestarr, function (o) {
      // console.log("interestarray",o)
      if (interest == o.name) {
        return o;
        console.log("interestarray", o)
      }

    });
    if (interestEdit === undefined) {
      $scope.interestarr.push({
        name: interest
      })

      $scope.addInterest.interest = $scope.interestarr
      $scope.colorchange = interestEdit
      console.log("checknow", $scope.interestarr)
    } else {
      _.pull($scope.interestarr, interestEdit)
      $scope.addInterest.interest = $scope.interestarr
      $scope.colorchange = interestEdit
      console.log("checknow", $scope.interestarr)
    }
    Chats.apiCallWithData("User/addInterests", $scope.addInterest, function (data) {
      console.log("data is*****************", data)

    })
  }

})