'use strict';

angular.module('standhubApp')
  .factory('Data', ['angularFire', 'angularFireCollection', '$rootScope', function(angularFire, angularFireCollection, $rootScope) {
    var data = {};

    data.fireUrl = 'https://standhubdev.firebaseio.com/';
    data.userUrl = data.fireUrl + 'users/';
    data.firebase = new Firebase(data.fireUrl); //possible refactor into inline
    data.user;
    data.userRef;
    var listRef = new Firebase(data.fireUrl + 'users');

    //store list of all usernames
    data.users = angularFireCollection(data.userUrl);
    // var promise = angularFire(data.userUrl, data, 'allUsers2',[]);
    // promise.then(function() {
    //   var d = data;
    //   debugger;
    // });
    // data.forEachUser = function(callback) {
    //   debugger;
    //   for (var i = 0; i < data.allUsers.length; i++) {
    //     // debugger;
    //     callback(data.allUsers[i]);
    //   }
    //   var listRef = new Firebase(data.fireUrl + 'users');
    //   listRef.on('child_added', function(snapshot) {
    //     var usrData = snapshot.val();
    //     callback(usrData);
    //   });
    // };

    // data.forEachUser(function(user) {
    //   data.allUsernames[user.id] = true;
    // });

    data.userKeyFromId = function(userid) {
      for (var i = 0; i < data.users.length; i++) {
        if (userid === data.users[i].id) {
          return data.users[i].$id;
        }
      }
      return false;
    };

    //handle auth
    data.authClient = new FirebaseAuthClient(data.firebase, function(error, user) {
      console.log('auth service active');
      if (error) {
        // an error occurred while attempting login
        console.log(error);
      } else if (user) {
        data.user = user;
        var userKey = data.userKeyFromId(user.id);
        if (!userKey) { //facebook id
          data.users.add(user);
        }
        data.userUrl += userKey;
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

    var requestsUrl = data.fireUrl + 'requests';
    data.requests = angularFireCollection(requestsUrl);
    data.addRequest = function(obj) {
      obj.from = data.user.id;
      obj.date = new Date();
      //find experts to match with and then push data to server
      var targets = [];
      _.each(data.users, function(user) {
        if (_.contains(user.tags,obj.tag)) {
          targets.push(user.$id);
        }
        if (targets.length >=3) {
          return false;
        }
      });
      data.requests.add(request);
    };

    return data;
  }]);