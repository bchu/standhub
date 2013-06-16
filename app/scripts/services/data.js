'use strict';

angular.module('standhubApp')
  .factory('Data', ['angularFire', '$rootScope', function(angularFire,$rootScope) {
    var data = {};

    data.fireUrl = 'https://standhubdev.firebaseio.com/';
    data.userUrl = data.fireUrl + 'users/';
    data.firebase = new Firebase(data.fireUrl); //possible refactor into inline
    data.user;
    data.userRef;

    data.forEachUser = function(callback) {
      var listRef = new Firebase(data.fireUrl + 'users');
      listRef.on('child_added', function(snapshot) {
        var usrData = snapshot.val();
        callback(usrData);
      });
    };

    //store list of all usernames
    data.allUsernames = {};
    data.forEachUser(function(user) {
      data.allUsernames[user.id] = true;
      console.log('child added');
    });

    //handle auth
    data.authClient = new FirebaseAuthClient(data.firebase, function(error, user) {
      console.log('auth service active');
      if (error) {
        // an error occurred while attempting login
        console.log(error);
      } else if (user) {
        data.user = user;
        if (!data.allUsernames[user.id]) { //facebook id
          listRef.child(user.id).set(user); 
        }
        data.userUrl += user.id;
        data.userRef = new Firebase(data.userUrl);
        console.log('authservicelogin');
        console.log(user);
        $rootScope.$apply(); //needed for digest to update after FB popup
      } else {
        data.user = undefined;
        data.userRef = undefined;
      }
    });
    //for dev purposes (disable auto-login)
    data.authClient.logout();

    data.requestsUrl = data.fireUrl + 'requests';
    data.addRequest = function(obj) {
      obj.from = data.user.id;
    }
    // data.requests = angularFireCollection(new Firebase(data.requestsUrl));

    return data;
  }]);