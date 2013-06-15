'use strict';

angular.module('standhubApp')
  .factory('Data', ['angularFire', function(angularFire) {
    var data = {};
    data.fireUrl = 'https://standhubdev.firebaseio.com/';
    data.firebase = new Firebase(data.fireUrl);
    data.user = null;
    data.userUrl = data.fireUrl + 'users/';
    data.userRef = null;

    data.allUsernames = {};
    var listRef = new Firebase(data.userUrl);
    listRef.on('child_added', function(snapshot) {
      var usrData = snapshot.val();
      data.allUsernames[usrData.id] = true;
    });
    data.authClient = new FirebaseAuthClient(data.firebase, function(error, user) {
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
        console.log(user);
      } else {
        data.user = null;
        data.userRef = null;
      }
    });


    data.requestsUrl = data.fireUrl + 'requests';
    // data.requests = angularFireCollection(new Firebase(data.requestsUrl));

    return data;
  }]);