;(function(app) {
'use strict';

/* Statuses Controller */
app.controller('StatusesCtrl', ['$scope', 'Data', function($scope, Data) {

  $scope.users = Data.users;

}]);

}(angular.module('controllers')));
