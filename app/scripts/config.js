;(function(app) {
'use strict';

/* Config */
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}])
.config(['$locationProvider', function($locationProvider) {
  // $locationProvider.html5Mode(true).hashPrefix('!');;
}])
.run(['$rootScope', '$routeParams', '$log', function($rootScope, $routeParams, $log) {
  $rootScope.$routeParams = $routeParams;
  $rootScope.$log = $log;
}])


}(angular.module('standhub')));
