connector.controller('InviteCtrl', function($scope) {
    $scope.toggle=true
    $scope.people=function(){
      $scope.toggle = true
    }
    $scope.contact = function(){
      $scope.toggle = false
    }
     $scope.followersb = true;
    $scope.followers=function(){
      $scope.followersb = true;
      $scope.kwacksb = false;
      $scope.pollsb = false;
    }
    $scope.kwacks=function(){
      $scope.followersb = false;
      $scope.kwacksb = true;
      $scope.pollsb = false;
    }
    $scope.polls=function(){
      $scope.followersb = false;
      $scope.pollsb = true;
      $scope.kwacksb = false;
    }
  })