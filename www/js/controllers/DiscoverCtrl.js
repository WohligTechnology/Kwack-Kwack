connector.controller('DiscoverCtrl', function($scope,Chats, $ionicModal) {
  $scope.jstorage={}
  $scope.allInterest=[]
$scope.jstorage = $.jStorage.get('user');
$scope.addInterest={}
$scope.addInterest.userId= $scope.jstorage._id
$scope.addInterest.interest=[]
console.log("heyyjstorage",$scope.addInterest)
$scope.interestarr=[]
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
    console.log("$scope.allInterest",interest);
    
  
    _.forEach($scope.allInterest, function(value){
      
      //  $scope.selectinterest.push({value:true})
      console.log("helloworld",$scope.allInterest)
     if(value.name==interest){
         value.value=!value.value
      //   console.log("seethis",value.value)
      }
    });
    
    var interestEdit = _.find($scope.interestarr, function (o){
      // console.log("interestarray",o)
      if (interest == o.name) {
        return o;
        console.log("interestarray",o)
      }
      
    });
    if (interestEdit === undefined) {
     $scope.interestarr.push({name:interest})
  
     $scope.addInterest.interest = $scope.interestarr
    $scope.colorchange = interestEdit
     console.log("checknow", $scope.interestarr)
    }else{
     _.pull($scope.interestarr,interestEdit)
      $scope.addInterest.interest = $scope.interestarr
     $scope.colorchange = interestEdit
      console.log("checknow", $scope.interestarr)
    }
    Chats.apiCallWithData("User/addInterests", $scope.addInterest, function (data) {
       console.log("data is*****************", data)
     
    })
  }


  Chats.apiCallWithoutData("Interests/getAllInterests", function (data) {
    $scope.allInterest = data.data

   console.log("data is*****************", $scope.allInterest)
 $scope.interestdup = _.chunk($scope.allInterest, 3); 
})


    // $scope.closeModal = function () {
    //   $scope.modal.hide();
    // };
    $scope.searchText = {};
     $scope.search = function (value) {
    $scope.companyCategory = [];
    $scope.isText = true;

    if (value.searchText != "") {
      Chats.apiCallWithData("Interests/globalSearch", value, function (data) {
        console.log("data is", data)
        if (data.value) {
          $scope.Interestsname = data.data.Interests;
          console.log("inside if")
        } else {
          console.log("Event data false");
        }
      });
    }
  };
      
  })

