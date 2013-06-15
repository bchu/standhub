'use strict';

angular.module('standhubApp')
  .controller('MainCtrl', ['$scope', 'angularFire', function ($scope) {
    $scope.fireUrl = 'https://standhubdev.firebaseio.com/';
    $scope.firebase = new Firebase($scope.fireUrl);
    $scope.user = {};

    $scope.allUsernames = {};
    var listRef = new Firebase($scope.fireUrl+'users');
    listRef.on('child_added', function(snapshot) {
      var usrData = snapshot.val();
      $scope.allUsernames[usrData.username] = true;
    });

    $scope.authClient = new FirebaseAuthClient($scope.firebase, function(error, user) {
      if (error) {
        // an error occurred while attempting login
        console.log(error);
      } else if (user) {
        $scope.user = user;
        if (!$scope.allUsernames[user.username]) {
          var usersPushRef = listRef.push();
          usersPushRef.set(user);
        }
        console.log(user);
      } else {
        $scope.user = null;
      }
    });
    $scope.authTest = function() {
      $scope.authClient.login('facebook', {rememberMe:true});
    };








  }]);
