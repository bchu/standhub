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
    // data.allUsernames = {};
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

    data.doesUsernameExist = function(userid) {
      for (var i = 0; i < angularFireCollection.length; i++) {
        if (userid === angularFireCollection[i].id) {
          return true;
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
        data.updateUsernames();
        if (doesUsernameExist(user.id)) { //facebook id
          data.users.add(user);
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
      obj.date = new Date();
      //find experts to match with and then push data to server
      var callback = function(userData) {

        data.requestsUrl.push(obj);
      }
    }
    // data.requests = angularFireCollection(new Firebase(data.requestsUrl));

    return data;
  }]);