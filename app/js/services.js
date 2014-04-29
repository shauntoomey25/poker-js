'use strict';

/* Services */

var app = angular.module('pokerJS.services', []);

app.service('EventService', function($rootScope, UserService, MessagingService, LobbyConfigService, GameStateService) {

  // Bootstrap Function
  // Must set Lobby ID before anything can be populated
  this.setLobbyID = angular.bind($rootScope, function(id) {
    $rootScope.lobbyID = id;
    $rootScope.$apply();
    socket.post('/public/subscribeToLobby', {lobby: id}, function(data) {
      var lobby = data.lobby;
      var commonState = data.commonState;
      var lock = data.lock;
      var afterAllUsersRetrieved = function() {
        MessagingService.addMessages(lobby.messages);
        LobbyConfigService.init(lobby);
        if(commonState && lock) {
          GameStateService.init(commonState, lock);
        }
        $rootScope.$emit('newLobby', lobby);
      };
      UserService.addUsersFromLobby(lobby, afterAllUsersRetrieved);
    });
  });

  // Wait until socket is connected before listening for events
  socket.on('connect', function socketConnected() {

    socket.on('lobby', function(message) {
      var data = message.data.data;
      console.log('new lobby::' + message.data.event + ' message:');
      console.log(data);
      switch(message.data.event) {

        case 'userAdded':
          UserService.addUser(data.state);
          break;

        case 'newUserMessage':
        case 'newSystemMessage':
          MessagingService.addMessage(data);
          break;

        case 'hostChanged':
          LobbyConfigService.changeHost(data);
          break;

      };
    });

    socket.on('match', function(message) {
      var data = message.data.data;
      console.log('new match::' + message.data.event + ' message:');
      console.log(data);
      switch(message.data.event) {

        case 'commonStateUpdated':
          GameStateService.updateCommonState(data.state);
          break;

        case 'turnover':
          GameStateService.updateLock(data.turnoverTo);
          break;

      };
    });
  });
});

app.service('UserService', function($rootScope) {

  var userDict = {};

  this.addUser = function(user) {
    if(user != null && user.id != null) {
      userDict[user.id] = user;
    }
    $rootScope.$emit('userAdded', user);
  };

  this.addUsers = function(users) {
    for(var i = 0; i < users.length; i++) {
      this.addUser(users[i]);
    }
  };

  this.addUsersFromLobby = function(lobby, cb) {

    // Add all current users
    this.addUsers(lobby.users);
    
    // Fetch unknown users from messages
    var usersToFetch = [];
    for(var i = 0; i < lobby.messages.length; i++) {
      var msg = lobby.messages[i];
      var fromUser = msg.from;
      if(fromUser != null && !(fromUser in userDict)) {
        usersToFetch.push(fromUser);
      }
    }
    var afterUsersFetched = angular.bind(this, function(users) {
      this.addUsers(users);
      if(cb) {
        cb();
      }
    });
    socket.post('/user/fetchUsers', {users: usersToFetch}, afterUsersFetched);
  };

  this.userWithID = function(userID) {
    if(userID == null) {
      return null;
    }
    return userDict[userID];
  };

  this.hasUserWithID = function(userID) {
    return (userID in userDict);
  };
});

app.service('MessagingService', function($rootScope, UserService) {

  var messages = [];

  this.addMessage = function(msg) {
    if(msg != null) {
      if(msg.from != null) {
        msg.from = UserService.userWithID(msg.from);
      }
      msg.isSystemMessage = (msg.from == null);
      messages.push(msg);
      $rootScope.$emit('newMessage', msg);
    }
  };

  this.addMessages = function(msgs) {
    for(var i = 0; i < msgs.length; i++) {
      this.addMessage(msgs[i]);
    }
  };

  this.getMessages = function() {
    return messages;
  };
});

app.service('LobbyConfigService', function($rootScope, UserService) {

  var host = null;
  var name = null;

  this.init = function(lobby) {
    this.changeName(lobby.name);
    this.changeHost(lobby.host);
  };

  this.changeName = function(newName) {
    name = newName;
    $rootScope.$emit('lobbyNameChanged', name);
  };

  this.changeHost = function(newHostID) {
    host = UserService.userWithID(newHostID);
    $rootScope.$emit('hostChanged', host);
  };
});

app.service('GameStateService', function($rootScope, UserService) {

  var commonState = null;
  var lock = null;

  this.init = function(commonState, lock) {
    this.updateCommonState(commonState);
    this.updateLock(lock);
  };

  this.updateCommonState = function(newState) {
    commonState = newState;
    $rootScope.$emit('commonStateUpdated', commonState);
  };

  this.updateLock = function(lockUserID) {
    lock = UserService.userWithID(lockUserID);
    $rootScope.$emit('lockUpdated', lockUserID);
  };
});

