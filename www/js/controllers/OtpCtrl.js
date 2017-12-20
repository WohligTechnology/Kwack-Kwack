connector.controller('OtpCtrl', function($scope,$stateParams,  $state) {
    
   

    $scope.goToLocation = function (info) {
 var userId=$stateParams.userId
     $state.go("location",{
              userEmail:userId
            })
    }
})