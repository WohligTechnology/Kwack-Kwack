connector.controller('SettingsCtrl', function ($scope, Chats, $state, $rootScope) {
  $scope.jstorage = {}
  $scope.pollKwack = {}
  $scope.allInterest = []
  $scope.jstorage = $.jStorage.get('user');
  $scope.toggle = $.jStorage.get("notify") ? $.jStorage.get("notify") : true;
  $scope.pollKwack._id = $scope.jstorage._id
  $scope.addInterest = {}
  $scope.addInterest.userId = $scope.jstorage._id
  $scope.addInterest.interest = []
  $scope.interestarr = []
  $scope.viewmore = false;
  $scope.view3 = true;
  $scope.showRemove = false
$scope.fontapply=$rootScope.font
  $scope.goBackHandler = function () {
    window.history.back(); //This works
  };

  $scope.notiToggle = function(){

   
    if (window.plugins) {
      if (window.plugins.OneSignal) {
        window.plugins.OneSignal.setSubscription($scope.toggle)
      }
    }
    $scope.toggle = !$scope.toggle;
    $.jStorage.set("notify",$scope.toggle)
    console.log($scope.toggle)
  }

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
    window.plugins.googleplus.logout(
      function (msg) {
      }
  );
    $.jStorage.flush();
    $state.go("login");
   
  }
  //profile
  $scope.user = {}
  $scope.user._id = $scope.jstorage._id
  Chats.apiCallWithData("User/getOne", $scope.user, function (data) {
    console.log("dta",data)
    if (data.value == true) {
      $scope.userInfo = data.data
    } else {

    }
  })

  $scope.select = function (interest, filter) {
    // console.log(interest)
    var interestEdit = _.find($scope.interestarr, function (o) {
      if (interest == o.name) {
        return o;
      }
    });
    if (interestEdit === undefined && filter == 'add') {
      console.log('adaas',filter)
      if (_.isEmpty($scope.interestarr)) {
        $scope.interestarr = []
      }
      $scope.interestarr.push({
        name: interest
      })

      $scope.addInterest.interest = $scope.interestarr
      console.log($scope.addInterest)
      Chats.noLoaderApi("User/addInterests", $scope.addInterest, function (data) {
        console.log($scope.addInterest)
        Chats.noLoaderApi("User/getOne", $scope.pollKwack, function (data) {
          $scope.getInterest = data.data.interests
        })
  
        _.forEach($scope.allInterest, function (value) {
          if (value.name == interest) {
            value.value = !value.value
          }
        })
      })
    } else if(filter == 'remove') {
      _.pull($scope.interestarr, interestEdit)
      $scope.addInterest.interest = $scope.interestarr
      Chats.noLoaderApi("User/addInterests", $scope.addInterest, function (data) {
        console.log($scope.addInterest)
        Chats.noLoaderApi("User/getOne", $scope.pollKwack, function (data) {
          $scope.getInterest = data.data.interests
        })
  
        _.forEach($scope.allInterest, function (value) {
          if (value.name == interest) {
            value.value = !value.value
          }
        })
      })
    }
    
  }

  $scope.editInt = function(){
    
$scope.showRemove = !$scope.showRemove;
console.log($scope.showRemove)
  }

  console.log($rootScope.font);
  //change font size
  //  $rootScope.fontChange = 'verysmall';
  $scope.changesize = function (data) {
    $rootScope.fontChange = data
    // $state.reload();
    // $scope.$emit("SendUp", {
    //   message: data
    // });
    // $scope.fontChange = $rootScope.font
  }
  // $scope.changesize = function (data) {
  //   $rootScope.font = data;
  // }

  // interest
  // Chats.apiCallWithoutData("Interests/getAllInterests", function (data) {
  //   $scope.allInterest = data.data
  //   $scope.interestdup = _.chunk($scope.allInterest, 2);
  // })

  //search interest

$scope.addRemoveInterest = function(){
  Chats.apiCallWithoutData("Interests/getAllInterests", function (data) {
    $scope.allInterest = data.data
    $scope.interestdup = _.chunk($scope.allInterest, 3);
  })
  Chats.apiCallWithData("User/getOne", $scope.pollKwack, function (data) {
    $scope.getInterest = data.data.interests
    $scope.interestarr = data.data.interests
    _.forEach($scope.allInterest, function (allInterest) {
      _.forEach($scope.getInterest, function (value) {
        if (value.name == allInterest.name) {
          allInterest.value = true
        } else {}
      })
    })
  })
}

$scope.addRemoveInterest()

  // $scope.select = function (interest) {
  //   _.forEach($scope.allInterest, function (value) {
  //     if (value.name == interest) {
  //       value.value = !value.value
  //     }
  //   });
  //   var interestEdit = _.find($scope.interestarr, function (o) {
  //     if (interest == o.name) {
  //       return o;

  //     }

  //   });
  //     if (interestEdit === undefined) {
  //       if(_.isEmpty($scope.interestarr)){
  //         $scope.interestarr =[];
  //       }
  //    $scope.interestarr.push({name:interest})

  //     $scope.addInterest.interest = $scope.interestarr
  //   // $scope.colorchange = interestEdit
  //   }else {
  //     _.pull($scope.interestarr, interestEdit)
  //     $scope.addInterest.interest = $scope.interestarr
  //     $scope.colorchange = interestEdit
  //   }
  //   Chats.noLoaderApi("User/addInterests", $scope.addInterest, function (data) {
  //   })
  // }
})