// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var connector=angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova','ionic-toast'])

.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('home', {
      url: '/home',
      templateUrl: 'templates/homeSlider.html',
      controller: 'HomeCtrl'

    })
    .state('friends', {
      url: '/friends',
      templateUrl: 'templates/friends.html',
      controller: 'FriendsCtrl'

    })
    .state('tab.privacy', {
      url: '/privacy',
      views: {
        'tab-explore': {
          templateUrl: 'templates/privacy.html',
      controller: 'PrivacyCtrl'
        }
      }
   })
   .state('tab.terms', {
    url: '/terms',
    views: {
      'tab-explore': {
        templateUrl: 'templates/terms.html',
    controller: 'TermsCtrl'
      }
    }
 })
 .state('tab.about', {
  url: '/about',
  views: {
    'tab-explore': {
      templateUrl: 'templates/about.html',
  controller: 'AboutCtrl'
    }
  }
})
.state('tab.guidelines', {
  url: '/guidelines',
  views: {
    'tab-explore': {
      templateUrl: 'templates/guidelines.html',
  controller: 'GuidelinesCtrl'
    }
  }
})
    .state('tab.exploremore', {
      url: '/exploremore/:newsid',
      cache:false,
      views: {
        'tab-explore': {
          templateUrl: 'templates/exploremore.html',
          controller: 'ExploremoreCtrl'
        }
      }
    })

    .state('invite', {
      url: '/invite',
      templateUrl: 'templates/invite.html',
      controller: 'InviteCtrl'
    })

    .state('tab.trailer', {
      url: '/trailer/:newsid',
      // cache:false,
      views: {
        'tab-trailer': {
          templateUrl: 'templates/tab-trailer.html',
          controller: 'TrailerCtrl'
        }
      }

    })

    .state('tab.kwackScreen', {
      url: '/kwackScreen',
      cache:false,
      views: {
        'tab-kwackScreen': {
          templateUrl: 'templates/kwack-screen.html',
          controller: 'KwackScreenCtrl'
        }
      }
 })

  .state('profile', {
    url: '/profile',
    templateUrl: 'templates/profile.html',
    controller: 'ProfileCtrl'
  })
  .state('mobileVerification', {
    url: '/mobileverification',
    templateUrl: 'templates/mobileVerification.html',
    controller: 'MobileVerificationCtrl'
  })


  .state('success', {
    url: '/success',
    templateUrl: 'templates/success.html',
    controller: 'SuccessCtrl'
  })
   .state('discover', {
    url: '/discover',
    templateUrl: 'templates/discover.html',
    controller: 'DiscoverCtrl'
  })

  .state('tab.discoverNews', {
    url: '/discoverNews',
     cache:false,
    views: {
      'tab-discoverNews': {

        templateUrl: 'templates/tab-discoverNews.html',
        controller: 'DiscoverNewsCtrl',
       
      }
    }

  })
  .state('tab.discoverfull', {
    url: '/discoverfull',
  
   views: {
      'tab-discoverNews': {

        templateUrl: 'templates/discover-full.html',
        controller: 'DiscoverFullCtrl'
      }
    }

 })

  .state('filter', {
    url: '/filter',

    templateUrl: 'templates/filter.html',
    controller: 'FilterCtrl'

  })

  .state('signUp', {
    url: '/signup',
    templateUrl: 'templates/signUp.html',
    controller: 'SignUpCtrl'

  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'

  })


  .state('location', {
    url: '/location/:userEmail',
    templateUrl: 'templates/location.html',
    controller: 'LocationCtrl'

  })
  .state('parampage', {
    url: '/parampage',
    templateUrl: 'templates/parampage.html',
    controller: 'ParampageCtrl'

  })

  .state('otp', {
      url: '/otp',
      templateUrl: 'templates/otp.html',
      controller: 'OtpCtrl'

    })
    .state('tab.explore', {
      url: '/explore',
      views: {
        'tab-explore': {
      templateUrl: 'templates/explore.html',
      controller: 'ExploreCtrl'
        }
      }
    })
    .state('tab.exploreDetail', {
      views: {
        'tab-explore': {
      url: '/exploredetail',
      templateUrl: 'templates/exploreDetail.html',
      controller: 'ExploreDetailCtrl'
        }
      }
    })
  .state('inviteFriends', {
      url: '/inviteFriends',
      templateUrl: 'templates/inviteFriends.html',
      controller: 'InviteFriendsCtrl'
    })
   
    .state('accountinside', {
      url: '/accountinside',
      templateUrl: 'templates/accountinside.html',
      controller: 'AccountInsieCtrl'
    })

    .state('aboutinside', {
      url: '/aboutinside',
      templateUrl: 'templates/aboutinside.html',
      controller: 'AboutInsieCtrl'
    })

    .state('edit', {
      url: '/edit',
      templateUrl: 'templates/edit.html',
      controller: 'EditCtrl'
    })
   
  .state('settings', {
      url: '/settings',
      templateUrl: 'templates/settings.html',
      controller: 'SettingsCtrl'
    })
    .state('polling-inside', {
      url: '/pollinginside/:newsid',
      cache:false,
      templateUrl: 'templates/polling-inside.html',
      controller: 'PollingInsideCtrl'
    })
    .state('debate', {
      url: '/debate/:kwackId/:newsid',
        cache:false,
      templateUrl: 'templates/debate.html',
      controller: 'DebateCtrl'
    })
    .state('tab.startPolling', {
      url: '/startPolling/:newsid',
      // cache:false,
      views: {
        'tab-startPolling': {
      templateUrl: 'templates/startPolling.html',
      controller: 'StartPollingCtrl'
        }
      }
    })
    .state('tab.social', {
      url: '/social',
      views: {
        'tab-social': {
          templateUrl: 'templates/tab-social.html',
          controller: 'SocialCtrl'
        }
      }

    })
    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    });

   
  // if none of the above states are matched, use this as the fallback

  $urlRouterProvider.otherwise('/login');


})

.filter('uploadpath', function () {
  return function (input) {
      if (input){
        console.log(adminurl + "upload/readFile?file=" + input);
        return adminurl + "upload/readFile?file=" + input;
      }
  };
})

.filter('fromNow', function () {
  return function (date) {
    return moment(date).fromNow();
  };
})

.filter('fromNowDay', function () {
  return function (date) {
    return moment(date).format('dddd');
  };
})

.filter('fromNowDMY', function () {
  return function (date) {
    return moment(date).format("DD MMM YYYY");
  };
})

.filter('serverimage', function () {
  return function (input, width, height, style) {
      if (input) {
          if (input.substr(0, 4) == "http") {
              return input;
          } else {
              image = imgpath + "?file=" + input;
              if (width) {
                  image += "&width=" + width;
              }
              if (height) {
                  image += "&height=" + height;
              }
              if (style) {
                  image += "&style=" + style;
              }
              return image;
          }

      } else {
          return ;
      }
  };
})