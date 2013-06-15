'use strict';

angular.module('standhubApp')
  .controller('Login', ['$scope', 'firebase', function ($scope) {
    // authClient.login('<provider>');
    // authClient.logout();
    
    $scope.facebookLogin = function() {
      authClient.login('facebook', {rememberMe:true});
    };
    $scope.emailLogin = function(email, password) {
      authClient.login('password', {
        email: email,
        password: password,
        rememberMe:true
      });
    };
    $scope.emailCreate = function(email,password) {
      authClient.createUser(email, password, function(error, user) {
        if (!error) {
          console.log('User Id: ' + user.id + ', Email: ' + user.email);
        }
      });
    };
    $scope.logout = function() {
      authClient.logout();
    };

  }]);