connector.controller('LocationCtrl', function ($scope, Chats, $state, $stateParams, ionicToast) {

  $scope.dataToSave = {
    _id: $.jStorage.get("user")._id
  }


  $scope.selectedCountry = {
    countryName: "",
    _id: ""
  };

  $scope.countryData = [{
    "countryName": "India",
    "_id": "1"
  }, {
    "countryName": "USA",
    "_id": "2"
  }];

  $scope.stateData = [{
      "_id": "1",
      "stateName": "Andaman and Nicobar Islands"
    },
    {
      "_id": "2",
      "stateName": "Andhra Pradesh"
    },
    {
      "_id": "3",
      "stateName": "Arunachal Pradesh"
    },
    {
      "_id": "4",
      "stateName": "Assam"
    },
    {
      "_id": "5",
      "stateName": "Bihar"
    },
    {
      "_id": "6",
      "stateName": "Chandigarh"
    },
    {
      "_id": "7",
      "stateName": "Chhattisgarh"
    },
    {
      "_id": "8",
      "stateName": "Dadra and Nagar Haveli"
    },
    {
      "_id": "9",
      "stateName": "Daman and Diu"
    },
    {
      "_id": "10",
      "stateName": "Delhi"
    },
    {
      "_id": "11",
      "stateName": "Goa"
    },
    {
      "_id": "12",
      "stateName": "Gujarat"
    },
    {
      "_id": "13",
      "stateName": "Haryana"
    },
    {
      "_id": "14",
      "stateName": "Himachal Pradesh"
    },
    {
      "_id": "15",
      "stateName": "Jammu and Kashmir"
    },
    {
      "_id": "16",
      "stateName": "Jharkhand"
    },
    {
      "_id": "17",
      "stateName": "Karnataka"
    },
    {
      "_id": "18",
      "stateName": "Kerala"
    },
    {
      "_id": "19",
      "stateName": "Lakshadweep"
    },
    {
      "_id": "20",
      "stateName": "Madhya Pradesh"
    },
    {
      "_id": "21",
      "stateName": "Maharashtra"
    },
    {
      "_id": "22",
      "stateName": "Manipur"
    },
    {
      "_id": "23",
      "stateName": "Meghalaya"
    },
    {
      "_id": "24",
      "stateName": "Mizoram"
    },
    {
      "_id": "25",
      "stateName": "Nagaland"
    },
    {
      "_id": "26",
      "stateName": "Odisha"
    },
    {
      "_id": "27",
      "stateName": "Puducherry"
    },
    {
      "_id": "28",
      "stateName": "Punjab"
    },
    {
      "_id": "29",
      "stateName": "Rajasthan"
    },
    {
      "_id": "30",
      "stateName": "Sikkim"
    },
    {
      "_id": "31",
      "stateName": "Tamil Nadu"
    },
    {
      "_id": "32",
      "stateName": "Telangana"
    },
    {
      "_id": "33",
      "stateName": "Tripura"
    },
    {
      "_id": "34",
      "stateName": "Uttar Pradesh"
    },
    {
      "_id": "35",
      "stateName": "Uttarakhand"
    },
    {
      "_id": "36",
      "stateName": "West Bengal"
    }
  ];

  $scope.goTOProfile = function (data) {

    if (data.selectedCountry && data.selectedState) {

      if (data.selectedCountry.countryName && data.selectedState.stateName) {
        console.log("inside if 1 India", $scope.dataToSave)
        $scope.dataToSave.country = data.selectedCountry.countryName
        $scope.dataToSave.state = data.selectedState.stateName

        Chats.apiCallWithData("User/save", $scope.dataToSave, function (data) {
          if (data.value == true) {
            $state.go("profile")
          } else {

          }
        })
      } else if (data.selectedCountry.countryName && data.selectedState) {
        console.log("inside if 2nd Usa")
        $scope.dataToSave.country = data.selectedCountry.countryName
        $scope.dataToSave.state = data.selectedState

        Chats.apiCallWithData("User/save", $scope.dataToSave, function (data) {
          if (data.value == true) {
            $state.go("profile")
          } else {

          }
        })
      } else {
        console.log("inside else part")
      }
    } else {
      console.log("plase enter state and country")
    }

  }
})