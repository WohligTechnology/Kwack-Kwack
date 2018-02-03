connector.controller('ParampageCtrl', function ($scope, Chats, $state, $stateParams, $location) {

    console.log("param page ctrl")
    $scope.param = $location.search();
    console.log("$scope.param", $scope.param);

    if ($.jStorage.get('user') == null) {
         $scope.user={}
        $scope.user.userEmail= $scope.param.email
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", $scope.user)
        Chats.apiCallWithData("User/getUser", $scope.user, function (data) {
            if (data.value == true) {
                console.log("****************data", data)
                   $.jStorage.set("user",data.data);
                    $state.go("tab.explore")
            } else {

            }
        })
     
    }
   
})