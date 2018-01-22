connector.controller('YourFriendsCtrl', function($scope) {
    // $scope.alll = false;
    // $scope.contactt = false;
    $scope.allpeople = 'all';
    $scope.allcontactpeople = function(data){
         $scope.allpeople = data;
    }

    $scope.goBackHandler = function() {
        window.history.back(); //This works
    };
    // $scope.contact = function(){
    //     $scope.contactt = true;
    //     $scope.alll = false;
    // }
    
})