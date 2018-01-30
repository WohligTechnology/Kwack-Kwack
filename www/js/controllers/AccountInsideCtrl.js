connector.controller('AccountInsieCtrl', function ($scope,Chats, $state) {
    $scope.deleteThisUser = function () {
        $scope.datatoDelete = {}
        $scope.datatoDelete.userId = $.jStorage.get('user');
        
        console.log("*********************I", $scope.datatoDelete)
        Chats.apiCallWithData("User/setDeactiveUser",$scope.datatoDelete, function (data) {
            if(data.value==true){
                $state.go("signUp")
            }
            console.log("$$$$$$$$$$$$$$$$$$$$$$$",data)
        })

    };
})