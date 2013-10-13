;(function(app) {
'use strict';

/* Login Controller */
app.controller('LoginCtrl', ['$scope', 'Data', function($scope, Data) {

  $scope.loggedIn = false;

  $scope.$watchCollection(
  function() { return Data.user; },
  function(user) {

    $scope.user = user;

    if (user) {
      var tags = [];
      _(user.tags).each(function(tag) {
        tags.push({id:tag,text:tag});
      });
      $scope.tags = tags;
      $scope.loggedIn = true;
    }

  });

  //options for tag field
  $scope.tagOptions = {
    tags: ["AngularJS", "JavaScript","Objective-C", "iOS","Unix","Pitch decks"],
    tokenSeparators: [",",";"],
    initSelection : function (element, callback) {
      callback($scope.tags);
    }
  };

  $scope.facebookLogin = function() {
    Data.authClient.login('facebook', {rememberMe:true});
    $scope.loggedIn = 'pending';
  };

  $scope.addTags = function(tags) {
    if (!tags) { return; }
    tags = _.pluck(tags,'text');
    Data.userRef.child('tags').set(tags);
  };

  $scope.logout = function() {
    Data.authClient.logout();
    $scope.loggedIn = false;
    $scope.tags = [];
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
    $scope.shouldBeOpen = false;
  };

}]);

}(angular.module('controllers')));
