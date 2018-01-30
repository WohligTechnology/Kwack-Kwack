connector.controller('SettingsCtrl', function($scope,Chats,$state) {
$scope.jstorage={}
$scope.allInterest=[]
$scope.jstorage = $.jStorage.get('user');
$scope.addInterest={}      
$scope.addInterest.userId= $scope.jstorage._id
$scope.addInterest.interest=[]
console.log("heyyjstorage",$scope.addInterest)
$scope.interestarr=[]
$scope.viewmore = false;

$scope.goBackHandler = function() {
  window.history.back(); //This works
};

$scope.viewall = function(){
    $scope.viewmore = true;
   }
  //  logout
   $scope.logout = function(){
     $.jStorage.flush();
      $state.go("login");
   }
//change font size
  $scope.font = '';
    $scope.changesize = function(data){
       $scope.font = data;
    }

    // interest
    Chats.apiCallWithoutData("Interests/getAllInterests", function (data) {
        $scope.allInterest = data.data
    
       console.log("data is*****************", $scope.allInterest)
     $scope.interestdup = _.chunk($scope.allInterest, 2); 
    })

    //search interest

    $scope.select = function(interest){
        console.log("$scope.allInterest",interest);
        
      
        _.forEach($scope.allInterest, function(value){
          
        console.log("helloworld",$scope.allInterest)
         if(value.name==interest){
             value.value=!value.value
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
 // Triggered on a button click, or some other target
 $scope.showPopup = function() {
  $scope.data = {}

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<input type="password" ng-model="data.wifi">',
    title: 'Enter Wi-Fi Password',
    subTitle: 'Please use normal things',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.wifi) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            return $scope.data.wifi;
          }
        }
      },
    ]
  });
  myPopup.then(function(res) {
    console.log('Tapped!', res);
  });
  $timeout(function() {
     myPopup.close(); //close the popup after 3 seconds for some reason
  }, 3000);
 };
  // A confirm dialog
  $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Consume Ice Cream',
      template: 'Are you sure you want to eat this ice cream?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        console.log('You are sure');
      } else {
        console.log('You are not sure');
      }
    });
  };

  


});








})