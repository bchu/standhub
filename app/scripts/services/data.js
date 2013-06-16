'use strict';

angular.module('standhubApp')
  .factory('Data', ['angularFire', 'angularFireCollection', '$rootScope', function(angularFire, angularFireCollection, $rootScope) {
    var data = {};

    // data.firebase = new Firebase(data.fireUrl); //possible refactor into inline
    data.fireUrl = 'https://standhubdev.firebaseio.com/';
    data.user;
    data.userRef;
    data.userUrl = data.fireUrl + 'users/';
    data.users = angularFireCollection(data.userUrl);
    var requestsUrl = data.fireUrl + 'requests';
    data.requests = angularFireCollection(requestsUrl);
    var requestsRef = new Firebase(requestsUrl);

    // var listRef = new Firebase(data.fireUrl + 'users');
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
    data.authClient = new FirebaseAuthClient(new Firebase(data.fireUrl), function(error, user) {
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
        $rootScope.$apply(); //needed for digest to update after FB popup
      } else {
        data.user = undefined;
        data.userRef = undefined;
      }
    });
    //for dev purposes (disable auto-login)
    data.authClient.logout();


    //HELP REQUESTS
    data.addRequest = function(obj) {
      obj.from = data.user.$id;
      obj.utc_timestamp = new Date().getTime();
      //find experts to match with and then push data to server
      var targets = [];
      _.each(data.users, function(user) {
        if (_.contains(user.tags,obj.tag)) {
          targets.push({user_id:user.$id,response:null});
        }
        if (targets.length >=3) {
          return false;
        }
      });
      obj.targets = targets;
      data.requests.add(obj);
    };

    //ALERTS:
    data.requestsFromYou = [];
    data.requestsToYou = [];
    requestsRef.on('child_added', function(snapshot) {
      if (!data.user) {
        return;
      }
      var reqData = snapshot.val();
      if (_.contains(data.targets,data.user.$id)) {
        data.requestsToYou.push(data);
      }
      else if(data.from === data.user.$id) {
        data.requestsFromYou.push(data);
      }
    });
    // requestsRef.on('child_changed', function(snapshot) {
    //   if (!data.user) {
    //     return;
    //   }
    //   var reqData = snapshot.val();
    //   if (_.contains(data.targets,data.user.$id)) {
    //     data.requestsToYou.push(data);
    //   }
    //   else if(data.from === data.user.$id) {
    //     data.requestsFromYou.push(data);
    //   }
    // });


    return data;
  }]);
