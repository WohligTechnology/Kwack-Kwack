connector.controller('LocationCtrl', function ($scope, Chats, $state, $stateParams ) {

  $scope.dataToSave = {
    _id:$.jStorage.get("user")._id
  }
  $scope.addCountry = function (data) {
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
  $scope.goTOProfile = function () {
    if ($scope.dataToSave.state && $scope.dataToSave.country) {
      $state.go("profile", {
        userId: $scope.dataToSave._id
      })
    } else {
      
      console.log("Enter state and country")
      // ionicToast.show('This is a toast at the top.', 'top', true, 2500);
    }

  }
  // $scope.hideToast = function(){
  //   ionicToast.hide();
  // };
  //  if($stateParams.userEmail){
  // $scope.emailData={
  //     email:$stateParams.userEmail
  //   }
  //   console.log("inside login stateparams", $scope.emailData)
  //   Chats.apiCallWithData("User/getUser", $scope.emailData, function (data) {
  //           $scope.formData = data.data;
  //            $.jStorage.set("user",  $scope.formData);
  //         $scope.dataToSave = {
  //   _id: $.jStorage.get("user")._id
  // }

  //       })
  //  }
  //        $scope.dataToSave = {
  //       _id: $.jStorage.get("user")._id
  //     }
  //      console.log(" $scope.dataToSave ", $scope.dataToSave )
  //   $scope.addCountry = function (data) {
  //   if (data.state && data.country) {
  //     $scope.dataToSave.country = data.country,
  //       $scope.dataToSave.state = data.state,
  //       console.log("data to store", $scope.dataToSave)
  //       Chats.apiCallWithData("User/save", $scope.dataToSave, function (data) {
  //         if (data.value == true) {

  //         } else {

  //         }
  //       })
  //   } else {
  //     console.log("inside else part")
  //   }

  // }
  // $scope.addState = function (data) {
  //   if (data.state && data.country) {
  //     $scope.dataToSave.country = data.country,
  //       $scope.dataToSave.state = data.state,
  //       Chats.apiCallWithData("User/save", $scope.dataToSave, function (data) {
  //         if (data.value == true) {

  //         } else {

  //         }
  //       })
  //   } else {
  //     console.log("inside else part")
  //   }
  // }




})