connector.controller('SettingsCtrl', function($scope) {
   
    $scope.font = '';
    $scope.changesize = function(data){
       $scope.font = data;
    }
})