connector.controller('YourFriendsCtrl', function($scope) {
    // $scope.alll = false;
    // $scope.contactt = false;
     $scope.all = true;
    $scope.allcontactpeople = function(data){
         $scope.alll = data;
    }
    
})