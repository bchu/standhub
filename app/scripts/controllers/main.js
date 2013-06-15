'use strict';

angular.module('standhubApp')
  .controller('MainCtrl', ['$scope', 'firebase', 'angularFire', function ($scope) {
    $scope.fireUrl = 'https://standhubdev.firebaseio.com/';
    $scope.firebase = new Firebase($scope.fireUrl);
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
