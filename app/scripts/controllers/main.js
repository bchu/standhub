'use strict';

angular.module('standhubApp', ['firebase'])
  .controller('MainCtrl', ['$scope', 'firebase', 'angularFire', function ($scope, angularFire) {
    $scope.firebase = new Firebase("https://standhubdev.firebaseio.com");
    $scope.authClient = new FirebaseAuthClient($scope.firebase, function(error, user) {
      if (error) {
        // an error occurred while attempting login
        console.log(error);
      } else if (user) {
        // user authenticated with Firebase
        console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
      } else {
        // user is logged out
      }
    });




  }]);
