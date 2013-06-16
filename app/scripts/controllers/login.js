'use strict';

angular.module('standhubApp')
  .controller('LoginCtrl', ['$scope', 'Data', function ($scope, Data) {

    $scope.loggedIn = false;
    $scope.$watchCollection(
    function () {return Data.user;},
    function (user) {
      $scope.user = user;
      if (user) {
        $scope.loggedIn = true;
      }
    });

    $scope.facebookLogin = function() {
      Data.authClient.login('facebook', {rememberMe:true});
      $scope.loggedIn = 'pending';
    };

    $scope.addTags = function(tags) {
      //tags should be an array
      Data.userRef.child('tags').set(tags);
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

    $scope.tags = ['Angular.JS', 'Backbone.js'];

    //ui customization
    $scope.opts = {
      backdropFade: true,
      dialogFade:true
    };
    $scope.open = function () {
      $scope.shouldBeOpen = true;
    };
    $scope.close = function (tags) {
      $scope.addTags(tags);
      $scope.shouldBeOpen = false;
    };
  }]);
