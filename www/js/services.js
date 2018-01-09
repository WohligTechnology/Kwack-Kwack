var adminurl = "http://192.168.1.113:80/api/";
// var adminurl = "http://localhost:80/api/";
var imgurl = adminurl + "upload/";
var imgpath = imgurl + "readFile?file=";
angular.module('starter.services', [])

.factory('Chats', function($http, $ionicActionSheet, $ionicActionSheet, $cordovaCamera,  $cordovaFileTransfer, $cordovaImagePicker) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
     getNavigation: function () {
            return chats;
        },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    }, removeAccessToken: function (data, callback) {
            $.jStorage.flush();
        },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    },
       apiCallWithData: function (url, formData, callback) {
                $http.post(adminurl + url, formData).then(function (data) {
                    data = data.data;
                    callback(data);

                });
            },

            apiCallWithoutData: function (url, callback) {
                $http.post(adminurl + url).then(function (data) {
                    data = data.data;
                    callback(data);

                });
            },
            showActionsheet: function (maxImage, callback) {
              var actionsheet = [];
              $ionicActionSheet.show({
                buttons: [{
                    text: '<i class="icon ion-ios-camera-outline"></i> Choose from gallery'
                  }, {
                    text: '<i class="icon ion-images"></i> Take from camera'
                  },
             
                ],
                cancelText: 'Cancel',
                cancel: function () {
                  console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                  console.log('BUTTON CLICKED', index);
                  if (index === 0) {
                    var options = {
                      maximumImagesCount: maxImage, // Max number of selected images
                      width: 800,
                      height: 800,
                      quality: 80 // Higher is better
                    };
                    cordova.plugins.diagnostic.isCameraAuthorized({
                      successCallback: function (authorized) {
                        if (authorized == false) {
                          cordova.plugins.diagnostic.requestCameraAuthorization({
                            successCallback: function (status) {
                              $cordovaImagePicker.getPictures(options).then(function (results) {
                                var i = 0;
            
                                _.forEach(results, function (value) {
                                  console.log("value",value);
                                  console.log("adminurl + 'upload'",adminurl + 'upload');
                                  $cordovaFileTransfer.upload(adminurl + 'upload', value)
                                    .then(function (result) {
                                      console.log("result",result);
                                      result.response = JSON.parse(result.response);
                                      console.log(result.response);
                                      actionsheet.push(result.response);
                                      i++;
                                      if (results.length == i) {
                                        callback(actionsheet);
                                      }
                                    }, function (err) {
                                      // Error
                                    }, function (progress) {
                                      // constant progress updates
                                    });
                                });
      
                              }, function (error) {
                                console.log('Error: ' + JSON.stringify(error)); // In case of error
                              });
                            },
                            errorCallback: function (error) {
                              console.error(error);
                            }
                          });
      
                        } else {
                          $cordovaImagePicker.getPictures(options).then(function (results) {
                            var i = 0;
               
                            _.forEach(results, function (value) {
                              console.log("value",value);
                              console.log("adminurl + 'upload'",adminurl + 'upload');
                              $cordovaFileTransfer.upload(adminurl + 'upload', value)
                                .then(function (result) {
                                  console.log("result",result);
                                  result.response = JSON.parse(result.response);
                                  actionsheet.push(result.response);
                                  i++;
                                  if (results.length == i) {
                                    callback(actionsheet);
                                  }
                                }, function (err) {
                                  // Error
                                }, function (progress) {
                                  // constant progress updates
                                });
                            });
      
                          }, function (error) {
                            console.log('Error: ' + JSON.stringify(error)); // In case of error
                          });
                        }
                      },
                      errorCallback: function (error) {
                        console.error("The following error occurred: " + error);
                      }
                    });
                  } else if (index === 1) {
                    var cameraOptions = {
                      quality: 90,
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
                      var imageSrc = "data:image/jpeg;base64," + imageData;
              
                      $cordovaFileTransfer.upload(adminurl + 'uploadfile/uploadmob', imageSrc)
                        .then(function (result) {
                     
                          result.response = JSON.parse(result.response);
                          console.log(result.response);
                          actionsheet.push(result.response);
                          callback(actionsheet);
      
                        }, function (err) {
                          // Error
                        }, function (progress) {
                          // constant progress updates
                        });
                    }, function (err) {
                      console.log(err);
                    });
                  }
                  return true;
                },
                destructiveButtonClicked: function () {
                  console.log('DESTRUCT');
                  return true;
                }
              });
              console.log("done");
            },
  };
});
