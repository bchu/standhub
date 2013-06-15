'use strict';

angular.module('standhubApp')
  .controller('MainCtrl', ['$scope', 'angularFire', function ($scope) {
    $scope.fireUrl = 'https://standhubdev.firebaseio.com/';
    $scope.firebase = new Firebase($scope.fireUrl);
    $scope.user = null;
    $scope.userUrl = $scope.fireUrl + 'users/';
    $scope.userRef = null;

    $scope.allUsernames = {};
    var listRef = new Firebase($scope.userUrl);
    listRef.on('child_added', function(snapshot) {
      var usrData = snapshot.val();
      $scope.allUsernames[usrData.id];
    });
    $scope.authClient = new FirebaseAuthClient($scope.firebase, function(error, user) {
      if (error) {
        // an error occurred while attempting login
        console.log(error);
      } else if (user) {
        $scope.user = user;
        if (!$scope.allUsernames[user.id]) { //facebook id
          listRef.child(user.id).set(user); 
        }
        $scope.userUrl += user.id;
        $scope.userRef = new Firebase($scope.userUrl);
        console.log(user);
      } else {
        $scope.user = null;
        $scope.userRef = null;
      }
    });

  }]);
