;(function(app) {
'use strict';

/* Filters */
app.filter('username', ['Data', function(Data) {
  return function(userId) {

    for (var i = 0; i < Data.users.length; i++) {
      var user = Data.users[i];
      if (user.id === userId) { return user.name; }
    }

  };
}]);

}(angular.module('filters')));
