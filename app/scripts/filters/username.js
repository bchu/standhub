'use strict';

angular.module('standhubApp')
  .filter('username', function(Data) {
    return function(user_id) {
      for (var i = 0; i < Data.users.length; i++) {
        var user = Data.users[i];
        if (user.$id === user_id) {
          return user.name;
        }
      }
    };
  });
