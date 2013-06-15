'use strict';

angular.module('standhubApp')
  .controller('LoginCtrl', ['$scope', 'Data', function ($scope, Data) {

    $scope.facebookLogin = function() {
      Data.authClient.login('facebook', {rememberMe:true});
    };
    $scope.addSkills = function(skills) {
      //skills should be an array
      Data.userRef.child('skills').set(skills);
    };

    $scope.test = function() {
      debugger;
    }


    // $scope.emailLogin = function(email, password) {
    //   authClient.login('password', {
    //     email: email,
    //     password: password,
    //     rememberMe:true
    //   });
    // };
    // $scope.emailCreate = function(email,password) {
    //   $scope.authClient.createUser(email, password, function(error, user) {
    //     if (!error) {
    //       console.log('User Id: ' + user.id + ', Email: ' + user.email);
    //     }
    //   });
    // };

    $scope.logout = function() {
      Data.authClient.logout();
    };

    $scope.skills = ['Angular.JS', 'Backbone.js'];

    //ui customization
    $scope.opts = {
      backdropFade: true,
      dialogFade:true
    };
    $scope.open = function () {
      $scope.shouldBeOpen = true;
    };
    $scope.close = function () {
      $scope.shouldBeOpen = false;
    };
  }]);
