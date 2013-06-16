'use strict';

angular.module('standhubApp')
  .filter('username', function(Data) {
    return function(userId) {
      for (var i = 0; i < Data.users.length; i++) {
        var user = Data.users[i];
        if (user.id === userId) {
          return user.name;
        }
      }
    };
  });
