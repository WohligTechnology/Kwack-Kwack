connector.controller('YourFriendsCtrl', function($scope) {
    // $scope.alll = false;
    // $scope.contactt = false;
     $scope.all = true;
    $scope.allcontactpeople = function(data){
         $scope.alll = data;
    }

    $scope.goBackHandler = function() {
        window.history.back(); //This works
    };
    // $scope.contact = function(){
    //     $scope.contactt = true;
    //     $scope.alll = false;
    // }
    
})