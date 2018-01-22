connector.controller('SettingsCtrl', function($scope,Chats) {
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



})