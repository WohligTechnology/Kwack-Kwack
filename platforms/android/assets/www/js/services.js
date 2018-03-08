// var adminurl = "http://192.168.1.126:80/api/";
var adminurl = "http://kwack-backend.wohlig.co.in/api/";

var imgurl = adminurl + "upload/";
var imgpath = imgurl + "readFile?file=";
angular.module('starter.services', [])

  .factory('Chats', function ($http, $ionicLoading, $timeout, $ionicActionSheet, $cordovaCamera, $cordovaFileTransfer, $cordovaImagePicker) {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
      id: 0,
      name: 'Ben Sparrow',
      lastText: 'You on your way?',
      // face: 'img/ben.png'
    }, {
      id: 1,
      name: 'Max Lynx',
      lastText: 'Hey, it\'s me',
      // face: 'img/max.png'
    }, {
      id: 2,
      name: 'Adam Bradleyson',
      lastText: 'I should buy a boat',
      // face: 'img/adam.jpg'
    }, {
      id: 3,
      name: 'Perry Governor',
      lastText: 'Look at my mukluks!',
      // face: 'img/perry.png'
    }, {
      id: 4,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/mike.png'
    }];

    return {
      all: function () {
        return chats;
      },
      getNavigation: function () {
        return chats;
      },
      remove: function (chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      removeAccessToken: function (data, callback) {
        $.jStorage.flush();
      },
      get: function (chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      },
      apiCallWithData: function (url, formData, callback) {
        if (!formData.noLoader) {
          $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
          });
        }
        delete formData.noLoader;
        $http.post(adminurl + url, formData).then(function (data) {
          if (data) {
            if (!formData.noLoader) {
              $ionicLoading.hide();
            }
            data = data.data;
            callback(data);
          }

        }, function errorCallback(response) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Something went wrong',
            noBackdrop: true,
            duration: 2000
          });
        });
      },

      apiCallWithoutData: function (url, callback) {
        $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });
        $http.post(adminurl + url).then(function (data) {
          if (data) {
            $ionicLoading.hide();
            data = data.data;
            callback(data);
          }

        }, function errorCallback(response) {
          $ionicLoading.hide();
          $ionicLoading.show({
            template: 'Something went wrong',
            noBackdrop: true,
            duration: 2000
          });
        });
      },

      noLoaderApi: function (url, formData, callback) {
        $http.post(adminurl + url, formData).then(function (data) {
          if (data) {
            data = data.data;
          }
          callback(data);
        });
      },


      setkwackPollStateChange: function (fromState) {
        if(fromState== 'tab.explore' || fromState== 'tab.startPollingex' || fromState== 'tab.trailerex' || fromState== 'tab.exploremore'){
          var mainTab = {
            fromState: 'tab.explore'
          }
        }else if (fromState== 'tab.discoverNews' || fromState== 'tab.startPollingdis' || fromState== 'tab.trailerdis'|| fromState== 'tab.exploremoredis'){
          var mainTab = {
            fromState: 'tab.discoverNews'
          }
        }else if (fromState== 'tab.kwackScreen' || fromState== 'tab.startPollingkwack' || fromState=='tab.trailerkwack' || fromState== 'tab.exploremorekwack'){
          var mainTab = {
            fromState: 'tab.kwackScreen'
          }
        }else if (fromState== 'tab.social' || fromState== 'tab.startPollingsocial' || fromState== 'tab.trailersocial'|| fromState== 'tab.exploremoresocial'){
          var mainTab = {
            fromState: 'tab.social'
          }
        }else{
          var mainTab = {
            fromState: fromState
          }
        }
        
        $.jStorage.set('mainTab', mainTab);
      },
      getkwackPollStateChange: function () {
        return $.jStorage.get('mainTab');
      },
      flushMainTab: function () {
        return $.jStorage.deleteKey('mainTab');
      },
    }
  });