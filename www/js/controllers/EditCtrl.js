connector.controller('EditCtrl', function ($scope, $cordovaCamera, Chats, $ionicActionSheet, $cordovaImagePicker, $cordovaFileTransfer, $state) {

    $scope.userData = {}
    $scope.userDataFollow = {}
    $scope.userDataFollow.userId = $.jStorage.get("user")._id;
    $scope.userData._id = $.jStorage.get("user")._id;
    $scope.get1 = function () {
        Chats.apiCallWithData("User/getOne", $scope.userData, function (data) {
            if (data.value == true) {
                $scope.userInfo = data.data;

            } else {

            }
        });
    }

    $scope.get1();

    $scope.datasave = function (data) {
        console.log("**********", data)

        Chats.apiCallWithData("User/save", data, function (data) {
            if (data.value == true) {
                $state.go("tab.settings")
            }
        })
    }

    $scope.showActionsheet = function (card) {
        console.log(card);
        $ionicActionSheet.show({
            //  titleText: 'choose option',
            buttons: [{
                text: '<i class="icon ion-images"></i> Choose from gallery'
            }, {
                text: '<i class="icon ion-ios-camera-outline"></i> Take from camera'
            }, ],
            //  destructiveText: 'Delete',
            cancelText: 'Cancel',
            cancel: function () {
                console.log('CANCELLED');
            },
            buttonClicked: function (index) {
                console.log('BUTTON CLICKED', index);
                if (index === 0) {
                    $scope.getImageSaveContact(card);
                } else {
                    $scope.openCamera(card);
                }
                return true;
            },
            destructiveButtonClicked: function () {
                console.log('DESTRUCT');
                return true;
            }
        });
    };

    $scope.openCamera = function (card) {
        var cameraOptions = {
            quantityuality: 90,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: false,
            encodingType: 0,
            targetWidth: 1200,
            popoverOptions: CameraPopoverOptions,
            correctOrientation: true
        };
        $cordovaCamera.getPicture(cameraOptions).then(function (imageData) {
            $scope.imageSrc = "data:image/jpeg;base64," + imageData;
            console.log($scope.imageSrc);
            $scope.uploadImage($scope.imageSrc, card);
        }, function (err) {

            console.log(err);
        });
    };

    $scope.getImageSaveContact = function (card) {
        // Image picker will load images according to these settings
        var options = {
            maximumImagesCount: 1, // Max number of selected images
            width: 800,
            height: 800,
            quantityuality: 80 // Higher is better
        };
        $cordovaImagePicker.getPictures(options).then(function (results) {
            console.log(results[0]);
            $scope.uploadImage(results[0], card);
        }, function (error) {
            console.log('Error: ' + JSON.stringify(error)); // In case of error
        });
    };

    $scope.uploadImage = function (imageURI, card) {
        console.log('imageURI', imageURI);
        // $scope.showLoading('Uploading Image...', 10000);
        $cordovaFileTransfer.upload(adminurl + 'upload', imageURI)
            .then(function (result) {
                console.log("donewithprofile", result)
                // Success!
                // $scope.hideLoading();
                result.response = JSON.parse(result.response);
                $scope.userInfo.photo = result.response.data[0];
                console.log("changes", $scope.userData.photo)
                Chats.apiCallWithData("User/save", $scope.userInfo, function (data) {
                    console.log("value", data)
                    $scope.get1();
                });
            })
    };

    //all fllowers kwack polls


    Chats.apiCallWithData("UserFollow/getAllFollowerName", $scope.userDataFollow, function (data) {

        if (data.value == true) {
            $scope.setFollowCountValueZero = data.data.length
        } else {
            $scope.setFollowCountValueZero = "0"
        }
    })


    Chats.apiCallWithData("Comment/getKwackForOneUser", $scope.userDataFollow, function (data) {

        if (data.value == true) {
            $scope.setKwackCountValueZero = data.data.length

        } else {
            $scope.setKwackCountValueZero = "0"

        }
    })


    Chats.apiCallWithData("PollAnswer/getPollForOneUser", $scope.userDataFollow, function (data) {

        if (data.value == true) {
            $scope.setPollCountValueZero = data.data.length

        } else {
            $scope.setPollCountValueZero = "0"

        }
    })


})