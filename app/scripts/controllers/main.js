'use strict';

angular.module('standhubApp', ['firebase'])
  .controller('MainCtrl', ['$scope', 'firebase', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
