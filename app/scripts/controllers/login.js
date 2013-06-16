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

    //options for tag field
    $scope.tagOptions = {
      tags:["AngularJS", "JavaScript","Objective-C", "iOS","Unix","Pitch decks"],
      tokenSeparators: [",",";"]
    };

    $scope.facebookLogin = function() {
      Data.authClient.login('facebook', {rememberMe:true});
      $scope.loggedIn = 'pending';
    };

    $scope.addTags = function(tags) {
      //tags should be an array
      Data.userRef.child('tags').set($scope.tags);
    };

    $scope.logout = function() {
      Data.authClient.logout();
    };

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
