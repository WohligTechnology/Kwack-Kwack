connector.controller('DiscoverCtrl', function($scope,Chats, $ionicModal) {
$scope.jstorage={}
$scope.jstorage = $.jStorage.get('user');
$scope.addInterest={}
$scope.addInterest.userId= $scope.jstorage._id
$scope.addInterest.interest=[]
console.log("heyyjstorage",$scope.addInterest)

$scope.interest=[]
    $ionicModal.fromTemplateUrl('templates/modal/filter1.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function () {
      $scope.modal.show();
    }
  $scope.select = function(interest){
    // console.log("addinterest",interest)
    
    
    var interestEdit = _.find($scope.interest, function (o){
      console.log("interestarray",o)
      if (interest == o.name) {
        return o;
        console.log("interestarray",o)
      }
      
    });
    if (interestEdit === undefined) {
    $scope.interest.push({name:interest})
    $scope.addInterest.interest = $scope.interest
    $scope.colorchange = interestEdit
    console.log("checknow", $scope.colorchange)
    }else{
     _.pull($scope.interest,interestEdit)
     $scope.addInterest.interest = $scope.interest
     $scope.colorchange = interestEdit
     console.log("checknow", $scope.colorchange)
    }
    Chats.apiCallWithData("User/addInterests", $scope.addInterest, function (data) {
      console.log("data is*****************", data)
     
    })
  }
    $scope.closeModal = function () {
      $scope.modal.hide();
    };
        Chats.apiCallWithoutData("Interests/getAllInterests", function (data) {
        console.log("data is*****************", data)
       
      })
  })