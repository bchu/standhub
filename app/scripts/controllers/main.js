'use strict';

angular.module('standhubApp')
  .controller('MainCtrl', ['$scope', 'angularFire', function ($scope) {
    $scope.fireUrl = 'https://standhubdev.firebaseio.com/';
    $scope.firebase = new Firebase($scope.fireUrl);
    $scope.user = {};
    $scope.authClient = new FirebaseAuthClient($scope.firebase, function(error, user) {
      if (error) {
        // an error occurred while attempting login
        console.log(error);
      } else if (user) {
        $scope.user = user;
        console.log(user);
      } else {
        $scope.user = null;
      }
    });






  }]);
