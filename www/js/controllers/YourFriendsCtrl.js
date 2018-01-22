connector.controller('YourFriendsCtrl', function($scope) {
    // $scope.alll = false;
    // $scope.contactt = false;
    $scope.allpeople = 'all';
    $scope.allcontactpeople = function(data){
         $scope.allpeople = data;
    }
    
})