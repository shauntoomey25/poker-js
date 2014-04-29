'use strict';

/* Controllers */

var app = angular.module('pokerJS.controllers', []);

app.controller('MainCtrl', function() {
  // Currently nothing to do here
  // Note: app initialization moved to bootstrap.js outside of Angular's scope
});

app.controller('PokerCtrl', function($scope, $rootScope, UserService) {

  // Scope
  $scope.isWaitingForMatch = true;
  $scope.lobby_name = "";
  $scope.userInLock = null;
  $scope.communityCards = null;
  $scope.potSize = null;
  $scope.players = null;

  // Listeners
  $rootScope.$on('lobbyNameChanged', function(e, lobbyName) {
    $scope.$apply(function() {
      $scope.lobby_name = lobbyName.toUpperCase();
    });
  });

  $rootScope.$on('lockUpdated', function(e, newLockUser) {
    $scope.$apply(function() {
      $scope.isWaitingForMatch = false;
      $scope.userInLock = newLockUser;
    });
  });

  $rootScope.$on('commonStateUpdated', function(e, state) {
    $scope.$apply(function() {
      $scope.isWaitingForMatch = false;
      $scope.communityCards = state.communityCards;
      $scope.potSize = state.pot;

      var players = state.players;
      for(var i = 0; i < players.length; i++) {
        player = players[i];
        var user = UserService.userWithID(player.userId);
        if(user) {
          player.username = user.username;
        }
        player.isBetting = $.inArray(player.userId, state.bettingPlayers);
        player.isDealer = (player.userId == state.dealer);
      }
      $scope.players = players;
    });
  });
});

app.controller('ChatCtrl', function($scope, $rootScope, $timeout) {

  // Scope
  $scope.messages = [];
  $scope.chat_title = "";

  // Listeners
  $rootScope.$on('newMessage', function(e, msg) {
    $scope.$apply(function(){
        $scope.messages.push(msg);
    });
  });

  $rootScope.$on('newLobby', function(e, lobby) {
    $scope.$apply(function() {
      $scope.chat_title = "Lobby Chat";
    });
  });
});
