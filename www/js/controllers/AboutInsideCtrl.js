connector.controller('AboutInsieCtrl', function($scope) {
    $scope.goBackHandler = function() {
        window.history.back(); //This works
      };
})