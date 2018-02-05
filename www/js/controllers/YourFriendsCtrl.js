connector.controller('YourFriendsCtrl', function($scope, Chats, $location, $ionicScrollDelegate, $cordovaContacts) {
    // $scope.alll = false;
    // $scope.contactt = false;
    $scope.followingId={}
    $scope.sorted_users={}
    $scope.followingId.userId = $.jStorage.get("user")._id
   
    $scope.allpeople = 'all';
    $scope.allcontactpeople = function(data){
      $scope.allpeople = data;

      $scope.loadMore = function () {
        $scope.$broadcast('scroll.refreshComplete');
       $ionicScrollDelegate.resize()
       $scope.pagination.shouldLoadMore = false;
       $scope.pagination.currentPage++;
       $scope.pagination1 = {
         "page": $scope.pagination.currentPage,
         "userId": $.jStorage.get("user")._id
       }
  
       if($scope.allpeople=='people'){
       
        Chats.apiCallWithData("UserFollow/getAllUser", $scope.pagination1, function (data) {
         
          if (data.value == true) {
            $scope.followingData = _.concat($scope.followingData, data.data.results);
            // console.log("$scope.followingData", $scope.followingData)
            var users =  $scope.followingData
            var log = [];
            
          // console.log("var users", users)
          
            $scope.alphabet = iterateAlphabet();
          
            //Sort user list by first letter of name
            var tmp={};
            for(i=0;i<users.length;i++){
             
                // console.log("users[i].name", users[i].name)
                
                var letter=users[i].name.toUpperCase().charAt(0);
                
                
                if( tmp[ letter] ==undefined){
                  tmp[ letter]=[]
                }
                  tmp[ letter].push( users[i] );
              
              
            }
            $scope.sorted_users = tmp;
           
            //Click letter event
            $scope.gotoList = function(id){
              $location.hash(id);
              $ionicScrollDelegate.anchorScroll();
            }
          
            //Create alphabet object
            function iterateAlphabet()
            {
               var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
               var numbers = new Array();
               for(var i=0; i<str.length; i++)
               {
                  var nextChar = str.charAt(i);
                  numbers.push(nextChar);
               }
               return numbers;
            }$scope.groups = [];
            for (var i=0; i<10; i++) {
              $scope.groups[i] = {
                name: i,
                items: []
              };
              for (var j=0; j<3; j++) {
                $scope.groups[i].items.push(i + '-' + j);
              }
            }
            
            /*
             * if given group is the selected group, deselect it
             * else, select the given group
             */
            $scope.toggleGroup = function(group) {
              if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
              } else {
                $scope.shownGroup = group;
              }
            };
            $scope.isGroupShown = function(group) {
              return $scope.shownGroup === group;
            };
             if (data.data.results.length == 10) {
               $scope.pagination.shouldLoadMore = true;
             }
            
          }
          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
        // $scope.getAlpha = getAlphaFunc();
       }else if($scope.allpeople=='contact'){
       
  
       }else{
        Chats.apiCallWithData("UserFollow/getAllFollowingName", $scope.pagination1, function (data) {
          if (data.value == true) {
            $scope.followingData = _.concat($scope.followingData, data.data.results);
            
             if (data.data.results.length == 10) {
               $scope.pagination.shouldLoadMore = true;
             }
            console.log("followingData", $scope.followingData)
          }  
          $scope.$broadcast('scroll.infiniteScrollComplete');
    })
       }
      
      
      }

      $scope.doRefresh = function (val) {
        $scope.followingData = [],
          $scope.pagination = {
            shouldLoadMore: true,
            currentPage: 0,
            userId: $.jStorage.get("user")._id
          };
   
        if (val) {
          $scope.loadMore();
        }
      };
      $scope.doRefresh(true);
  
  
  
   
    }
    
    $scope.allcontactpeople('all')
   

    $scope.contacts=function(){
      var users={}
      console.log("contacts search")
      $scope.addContact = function() {
        $cordovaContacts.save($scope.contactForm).then(function(result) {
          // Contact saved
        }, function(err) {
          // Contact error
        });
      };
      
      
       console.log('contacts',$scope.contacts)
        $cordovaContacts.find({}).then(function(allContacts) { //omitting parameter to .find() causes all contacts to be returned
          $scope.contacts = allContacts;
          console.log('contacts',$scope.contacts)
          $scope.contacts=_.orderBy($scope.contacts, ['displayName'], ['asc'])
          var users =  $scope.contacts
          var log = [];
          
        console.log("var users", users)
        
          $scope.alphabet = iterateAlphabet();
        
          //Sort user list by first letter of name
          var tmp={};
          for(i=0;i<users.length;i++){
            if(users[i].displayName!=null){
              console.log("users[i].displayName", users[i].displayName)
              
              var letter=users[i].displayName.toUpperCase().charAt(0);
              
              
              if( tmp[ letter] ==undefined){
                tmp[ letter]=[]
              }
                tmp[ letter].push( users[i] );
            }
            
          }
          $scope.contactuser = tmp;
         
          //Click letter event
          $scope.gotoList = function(id){
            $location.hash(id);
            $ionicScrollDelegate.anchorScroll();
          }
        
          //Create alphabet object
          function iterateAlphabet()
          {
             var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
             var numbers = new Array();
             for(var i=0; i<str.length; i++)
             {
                var nextChar = str.charAt(i);
                numbers.push(nextChar);
             }
             return numbers;
          }$scope.groups = [];
          for (var i=0; i<10; i++) {
            $scope.groups[i] = {
              name: i,
              items: []
            };
            for (var j=0; j<3; j++) {
              $scope.groups[i].items.push(i + '-' + j);
            }
          }
          
          /*
           * if given group is the selected group, deselect it
           * else, select the given group
           */
          $scope.toggleGroup = function(group) {
            if ($scope.isGroupShown(group)) {
              $scope.shownGroup = null;
            } else {
              $scope.shownGroup = group;
            }
          };
          $scope.isGroupShown = function(group) {
            return $scope.shownGroup === group;
          };
        })
      
      
      $scope.findContactsBySearchTerm = function (searchTerm) {
        var opts = {                                           //search options
          filter : searchTerm,                                 // 'Bob'
          multiple: true,                                      // Yes, return any contact that matches criteria
          fields:  [ 'displayName', 'name' ],                  // These are the fields to search for 'bob'.
          desiredFields: [id]    //return fields.
        };
      
        if ($ionicPlatform.isAndroid()) {
          opts.hasPhoneNumber = true;         //hasPhoneNumber only works for android.
        };
      
        $cordovaContacts.find(opts).then(function (contactsFound) {
          $scope.contacts = contactsFound;
        });
      }
      
      $scope.pickContactUsingNativeUI = function () {
        $cordovaContacts.pickContact().then(function (contactPicked) {
          $scope.contact = contactPicked;
        })
      }
    }
   

    //followUnfollow
    $scope.followUnfollow=function(userId, index, type, parentObject){
      $scope.userFollowUnfollow={}
      $scope.userFollowUnfollow.userBeenFollowed = userId
      $scope.userFollowUnfollow.user = $.jStorage.get('user')._id
      $scope.userFollowUnfollow.userFollwing = userId
      $scope.userFollowUnfollow.userFollowed = $.jStorage.get('user')._id
      Chats.apiCallWithData("UserFollow/areBothFollowing", $scope.userFollowUnfollow, function (data) {
        if (data.value == true) { 
          // $scope.follow =! $scope.follow
          Chats.apiCallWithData("UserFollow/removeFollowerCount", $scope.userFollowUnfollow, function (data) {
            if(type == 'all'){
              $scope.followingData[index].userBeenFollowed.flag='true'
            }else{
              $scope.sorted_users[parentObject][index].flag='false'
              console.log("parentindex", $scope.sorted_users[parentObject][index].flag)
              
            }
           
          })
          // $scope.doRefresh(true);
        } else {
          // $scope.follow =! $scope.follow
          Chats.apiCallWithData("UserFollow/addFollowerCount", $scope.userFollowUnfollow, function (data) {
            console.log("$scope.userFollowUnfollow", data)  
            if(type == 'all'){
              $scope.followingData[index].userBeenFollowed.flag='false'
            }else{
              $scope.sorted_users[parentObject][index].flag='true'
              console.log("parentindex", $scope.sorted_users[parentObject][index].flag)
              
            }
          })
         
          // $scope.doRefresh(true);
        }
  
      })
  
    }


    $scope.goBackHandler = function() {
        window.history.back(); //This works
    };

   

   

    
    // $scope.getAllContacts = function() {
      
          
    //    }

   

       function getAlphaFunc() {
         console.log("hello")
         if($scope.allpeople=='people'){
          var users = $scope.people;
         }else{
          var users = $scope.contacts
         }
          
       
       }

    // $scope.users  = [   {     "_id": "53fceb7ef214c5316e93e7c8",     "first_name": "Francis",     "last_name": "Hill"   },   {     "_id": "53fceb7e4a46965ec9f1d08f",     "first_name": "Lessie",     "last_name": "Caldwell"   },   {     "_id": "53fceb7e502379253e2e7b0d",     "first_name": "Alyson",     "last_name": "Woodward"   },   {     "_id": "53fceb7ee548c39f3d6d651e",     "first_name": "Malone",     "last_name": "Becker"   },   {     "_id": "53fceb7e216dabb188bf3cec",     "first_name": "Terrell",     "last_name": "Stein"   },   {     "_id": "53fceb7ed393a16f29b2dc78",     "first_name": "Laurie",     "last_name": "Ayers"   },   {     "_id": "53fceb7e956d8f3aaf33634e",     "first_name": "Rowland",     "last_name": "Rosario"   },   {     "_id": "53fceb7ec92ee5342dc5c5df",     "first_name": "Laurel",     "last_name": "Hobbs"   },   {     "_id": "53fceb7ed624f8dd26ebb171",     "first_name": "Kristie",     "last_name": "Barker"   },   {     "_id": "53fceb7e14cb861f7e72c202",     "first_name": "Riley",     "last_name": "Ortiz"   },   {     "_id": "53fceb7ecfe77b71b7a5d4fe",     "first_name": "Morin",     "last_name": "Terry"   },   {     "_id": "53fceb7e671c72b0dacb44f5",     "first_name": "Ida",     "last_name": "Haney"   },   {     "_id": "53fceb7e91f884a9dea10cb7",     "first_name": "Boyd",     "last_name": "Davis"   },   {     "_id": "53fceb7e91a18e0fd67cc7e6",     "first_name": "Milagros",     "last_name": "Blair"   },   {     "_id": "53fceb7e25edb893c03c320f",     "first_name": "Marissa",     "last_name": "Howell"   },   {     "_id": "53fceb7e67e3275edd8b577d",     "first_name": "Whitehead",     "last_name": "Sosa"   },   {     "_id": "53fceb7ed368d55809a0d1c8",     "first_name": "Potts",     "last_name": "Byers"   },   {     "_id": "53fceb7e433a701299f9c02b",     "first_name": "Tara",     "last_name": "Adams"   },   {     "_id": "53fceb7e8e7502eedfe0b0bc",     "first_name": "Velasquez",     "last_name": "Carver"   },   {     "_id": "53fceb7ef69a7352f0c2cd55",     "first_name": "Dale",     "last_name": "Flowers"   },   {     "_id": "53fceb7ed2212f228b769a86",     "first_name": "Baldwin",     "last_name": "Donovan"   },   {     "_id": "53fceb7e0bf90a7ab5801e32",     "first_name": "Lynch",     "last_name": "Gibson"   },   {     "_id": "53fceb7ee7053b2a611f0809",     "first_name": "Deana",     "last_name": "Norris"   },   {     "_id": "53fceb7e3c0e0d3e9350cbce",     "first_name": "Harrison",     "last_name": "Decker"   },   {     "_id": "53fceb7e1c3626c8d09db3f6",     "first_name": "Anne",     "last_name": "Harris"   },   {     "_id": "53fceb7e981cb971bf0b40eb",     "first_name": "Nanette",     "last_name": "Harmon"   },   {     "_id": "53fceb7ee8f2b6ecf8fd0338",     "first_name": "Byers",     "last_name": "Maldonado"   } ];
    
    // $scope.contact = function(){
    //     $scope.contactt = true;
    //     $scope.alll = false;
    // }
    
})