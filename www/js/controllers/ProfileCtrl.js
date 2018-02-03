connector.controller('ProfileCtrl', function ($scope, $cordovaContacts, $cordovaCamera, Chats, $ionicActionSheet, $cordovaImagePicker, $cordovaFileTransfer) {
    $scope.profileImage = {};
    $scope.setImage = {};
    $scope.goBackHandler = function () {
        window.history.back(); //This works
    };
    // $scope.profileImage._id = $.jStorage.get('user')._id;
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
                $scope.profileImage.photo = result.response.data[0];
                console.log("changes", $scope.profileImage.photo)
                Chats.apiCallWithData("User/save", $scope.profileImage, function (data) {
                    $scope.setImage = data.data;
                    console.log("value", $scope.setProfile);
                });
            })
    };

    // $scope.getAllContacts = function() {

    //         $scope.addContact = function() {
    //           $cordovaContacts.save($scope.contactForm).then(function(result) {
    //             // Contact saved
    //           }, function(err) {
    //             // Contact error
    //           });
    //         };

    //         $scope.getAllContacts = function() {
    //           $cordovaContacts.find({}).then(function(allContacts) { //omitting parameter to .find() causes all contacts to be returned
    //             $scope.contacts = allContacts;
    //             console.log('contacts',$scope.contacts)
    //           })
    //         };

    //         $scope.findContactsBySearchTerm = function (searchTerm) {
    //           var opts = {                                           //search options
    //             filter : searchTerm,                                 // 'Bob'
    //             multiple: true,                                      // Yes, return any contact that matches criteria
    //             fields:  [ 'displayName', 'name' ],                  // These are the fields to search for 'bob'.
    //             desiredFields: [id]    //return fields.
    //           };

    //           if ($ionicPlatform.isAndroid()) {
    //             opts.hasPhoneNumber = true;         //hasPhoneNumber only works for android.
    //           };

    //           $cordovaContacts.find(opts).then(function (contactsFound) {
    //             $scope.contacts = contactsFound;
    //           });
    //         }

    //         $scope.pickContactUsingNativeUI = function () {
    //           $cordovaContacts.pickContact().then(function (contactPicked) {
    //             $scope.contact = contactPicked;
    //           })
    //         }
    //     }

})