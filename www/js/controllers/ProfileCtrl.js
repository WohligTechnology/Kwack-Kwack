connector.controller('ProfileCtrl', function ($scope, $cordovaContacts, $cordovaCamera, Chats, $ionicActionSheet, $cordovaImagePicker, $cordovaFileTransfer) {
    $scope.reqData={};
    $scope.reqData._id = $.jStorage.get("user")._id

    $scope.getUserDetails = function () {
        Chats.apiCallWithData("User/getOne", $scope.reqData, function (data) {
            if (data.value == true) {
                $scope.userData = data.data;
            }
        });
    }
    $scope.getUserDetails();
    $scope.goBackHandler = function () {
        window.history.back(); //This works
    };
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
            saveToPhotoAlbum: true,
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
        $cordovaFileTransfer.upload(adminurl + 'upload', imageURI)
            .then(function (result) {
                console.log("donewithprofile", result)
                result.response = JSON.parse(result.response);
                $scope.userData.photo = result.response.data[0];
                Chats.apiCallWithData("User/save", $scope.userData, function (data) {
                    if (data.value) {
                        $scope.getUserDetails();
                    }
                });
            })
    };


})