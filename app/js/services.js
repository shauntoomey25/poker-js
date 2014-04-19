'use strict';

/* Services */

var app = angular.module('pokerJS.services', []);

app.service('EventService', function($rootScope) {

  var rootScope = $rootScope;
  var lobbyID = null;

  this.setLobbyID = function(id) {
    lobbyID = id;
    socket.post('/public/subscribeToLobby', {lobby: lobbyID}, function(data) {
      console.log(data);
    });
  };
});
