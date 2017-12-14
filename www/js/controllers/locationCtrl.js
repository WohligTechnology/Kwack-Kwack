connector.controller('LocationCtrl', function ($scope, Chats, $state,$stateParams) {
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