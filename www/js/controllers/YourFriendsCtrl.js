connector.controller('YourFriendsCtrl', function($scope) {
    // $scope.alll = false;
    // $scope.contactt = false;
    $scope.all = function(data){
        $scope.alll = true;
        $scope.contactt = true;
    }

    $scope.goBackHandler = function() {
        window.history.back(); //This works
    };
    // $scope.contact = function(){
    //     $scope.contactt = true;
    //     $scope.alll = false;
    // }
})