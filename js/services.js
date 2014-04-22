'use strict';

/* Services */

var app = angular.module('pokerJS.services', []);

app.service('EventService', function($rootScope, UserService, MessagingService) {

  var rootScope = $rootScope;
  var lobbyID = null;

  // Bootstrap Function
  // Must set Lobby ID before anything can be populated
  this.setLobbyID = function(id) {
    lobbyID = id;
    socket.post('/public/subscribeToLobby', {lobby: lobbyID}, function(lobby) {
      var afterAllUsersRetrieved = function() {
        MessagingService.addMessages(lobby.messages);
      };
      UserService.addUsersFromLobby(lobby, afterAllUsersRetrieved);
    });
  };

  // Wait until socket is connected before listening for events
  socket.on('connect', function socketConnected() {

    socket.on('userAdded', function(message) {
      UserService.addUser(message.data);  
    });

    socket.on('newUserMessage', function(message) {
      MessagingService.addMessage(message);
    });

    socket.on('newSystemMessage', function(message) {
      MessagingService.addMessage(message);
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
  }

  this.addUsers = function(users) {
    for(var i = 0; i < users.length; i++) {
      this.addUser(users[i]);
    }
  }

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

