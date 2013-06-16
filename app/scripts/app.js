'use strict';

angular.module('standhubApp', ['firebase', 'ui.bootstrap','ui.select2', 'angularMoment'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
