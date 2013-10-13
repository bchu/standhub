;(function(app) {
'use strict';

/* Services */
app.factory('Data',
  ['angularFire', 'angularFireCollection', '$rootScope', '$timeout',
  function(angularFire, angularFireCollection, $rootScope, $timeout) {

  var data = {};

  // data.firebase = new Firebase(data.fireUrl); //possible refactor into inline
  data.fireUrl = 'https://standhubdev.firebaseio.com/';
  data.user;
  data.userRef;
  data.userUrl = data.fireUrl + 'users/';
  var usersRef = new Firebase(data.userUrl);
  data.users = angularFireCollection(usersRef);

  data.requestsUrl = data.fireUrl + 'requests/';
  var requestsRef = new Firebase(data.requestsUrl);
  data.requests = angularFireCollection(requestsRef);

  // data.tags = [];

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
  //HELP REQUESTS
  data.addRequest = function(obj) {
    obj.from = data.user.id;
    obj.utc_timestamp = new Date().getTime();
    //find experts to match with and then push data to server
    var targets = {};
    var count = 0;
    _.each(data.users, function(user) {
      if (_.contains(user.tags,obj.tag) && user.id !== data.user.id) {
        // targets.push({userId:user.id,response:null});
        targets[user.id] = 'pending'; //response, firebase doesn't like it if it's null
        count++;
      }
      if (count >=3) {
        return false;
      }
    });
    obj.targets = targets;
    data.requests.add(obj);
  };

  //ALERTS:
  data.requestsFromYou = [];
  data.requestsToYou = [];
  data.refreshRequestsRef = new Firebase(data.requestsUrl);
  data.refreshRequests  = function() {
    console.log('refresh requests');
    data.requestsFromYou = [];
    data.requestsToYou = [];
    data.refreshRequestsRef.off();
    data.refreshRequestsRef = new Firebase(data.requestsUrl);
    data.refreshRequestsRef.on('child_added', function(snapshot) {
      console.log('fired!!!!');
      if (!data.user) {
        return;
      }
      var reqData = snapshot.val();
      reqData.refName = snapshot.name();
      // reqData.ref = snapshot.ref();
      // var targeted = _.any(reqData.targets,function(el) {
      //   return el.userId === data.user.id;
      // });
      if (reqData.targets && typeof reqData.targets[data.user.id]==='string' && reqData.from !== data.user.id) {
        if (reqData.targets[data.user.id]!=='decline') {
          data.requestsToYou.push(reqData);
        }
      }
      if(reqData.from === data.user.id) {
        data.requestsFromYou.push(reqData);
      }
    });
    data.refreshRequestsRef.on('child_changed', function(snapshot) {
      // debugger;
      var refName = snapshot.name();
      for (var i = data.requestsFromYou.length-1; i >=0 ; i--) {
        if (data.requestsFromYou[i].refName === refName) {
      // debugger;
          data.requestsFromYou[i].targets = snapshot.val().targets;
        }
      }
      for (var i = data.requestsToYou.length-1; i >=0 ; i--) {
        if (data.requestsToYou[i].refName === refName) {
      // debugger;
          data.requestsToYou[i].targets = snapshot.val().targets;
          //you declined someone's alert
          if (snapshot.val().targets[data.user.id]==='decline') {
            data.requestsToYou.splice(i,1);
          }
        }
      }
      // debugger;
    });
    data.refreshRequestsRef.on('child_removed', function(oldSnapshot) {
      // debugger;
      var refName = oldSnapshot.name();
      for (var i = data.requestsFromYou.length-1; i >=0 ; i--) {
        if (data.requestsFromYou[i].refName === refName) {
          data.requestsFromYou.splice(i,1);
        }
      }
      for (var i = data.requestsToYou.length-1; i >=0 ; i--) {
        if (data.requestsToYou[i].refName === refName) {
          data.requestsToYou.splice(i,1);
        }
      }
    });
  };

  data.userFromId = function(userid) {
    for (var i = 0; i < data.users.length; i++) {
      if (userid === data.users[i].id) {
        return data.users[i];
      }
    }
    return false;
  };

  //handle auth
  data.authClient = new FirebaseAuthClient(new Firebase(data.fireUrl), function(error, user) {
    if (error) {
      // an error occurred while attempting login
      console.log(error);
    } else if (user) {
      data.user = user;
      var oldUser = data.userFromId(user.id);
      var ending = function() {
        data.user = oldUser;
        data.userUrl += oldUser.id;
        data.userRef = new Firebase(data.userUrl);
        $rootScope.$apply(); //needed for digest to update after FB popup
        // data.tags = data.user.tags || [];
        data.refreshRequests();
        // var refreshUserRef = function() {
        //   var refreshedUser = data.userFromId(user.id);
        //   if (refreshedUser) {
        //     data.user = refreshedUser;
        //   }
        //   else {
        //     $timeout(refreshUserRef, 200);
        //   }
        // };
        // $timeout(refreshUserRef, 200);
      };
      if (!oldUser) {
        // var query = usersRef.startAt(null, user.id).endAt(null,user.id);
        //   query.on('child_added', function(child) {
        //     debugger;
        //     var status = child.val().status;
        //     if (status !== undefined) {
        //       usersRef.child(user.id).update({status:status});
        //     }
        // });
        usersRef.child(user.id).transaction(function(currentValue) {
          currentValue = currentValue || {};
          var obj = _.assign(currentValue,user);
          return obj;
          }, function() {
          oldUser = data.userFromId(user.id);
          ending();
        });
      }
      else {
        ending();
      }
    } else {
      data.user = undefined;
      data.userRef = undefined;
      data.userUrl = data.fireUrl + 'users/';
      data.requestsFromYou = [];
      data.requestsToYou = [];
      // data.tags = [];
    }
  });

  return data;

}]);

}(angular.module('services')));
