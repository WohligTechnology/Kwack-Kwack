connector.controller('DiscoverCtrl', function($scope,Chats, $ionicModal) {
$scope.selectinterest=[{
  "name":"Sports",
  "value":false
},
{
  "name":"Comedy",
  "value":false
},
{
  "name":"Food",
  "value":false
},
{
  "name":"Science",
  "value":false
},
{
  "name":"Entertainment",
  "value":false
},
{
  "name":"Fashion",
  "value":false
},
{
  "name":"International",
  "value":false
},
{
  "name":"Books",
  "value":false
},
{
  "name":"Health",
  "value":false
},

]
  $scope.jstorage={}
$scope.jstorage = $.jStorage.get('user');
$scope.addInterest={}
$scope.addInterest.userId= $scope.jstorage._id
$scope.addInterest.interest=[]
console.log("heyyjstorage",$scope.addInterest)
$scope.colorchange={}
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
    _.forEach($scope.selectinterest, function(value){
      console.log('hellomoto',value);
      console.log("seevalue",interest)
      console.log("seevalue",value.name)
      if(value.name==interest){
        value.value=!value.value
        console.log("seethis",value.value)
        $scope.selectinterest.push({value:value.value})
      }
  });
    
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