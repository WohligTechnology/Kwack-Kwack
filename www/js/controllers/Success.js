connector.controller('SuccessCtrl', function($scope, $state) {
    $scope.success = $.jStorage.get("user")
    //   console.log("hellostorage", $scope.success._id)
      $scope.nextstate=function(){
        if($scope.success == null){
            $state.go("confirmpass")
        }else{
            $state.go("location")
        }
      }

})