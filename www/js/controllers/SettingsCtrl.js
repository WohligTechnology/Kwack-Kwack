connector.controller('SettingsCtrl', function($scope) {

     $scope.changefont = false;
    $scope.changesize = function(){
        $scope.changefont = true;
    }
})