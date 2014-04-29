'use strict';

/* Controllers */

var app = angular.module('pokerJS.controllers', []);

app.controller('MainCtrl', function() {
  // Currently nothing to do here
  // Note: app initialization moved to bootstrap.js outside of Angular's scope
});

app.controller('PokerCtrl', function($scope, $rootScope) {

  // Scope
  $scope.isWaitingForMatch = true;
  $scope.lobby_name = "";
  $scope.userInLock = null;
  $scope.communityCards = null;
  $scope.potSize = null;

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
        $scope.chat_title = "Lobby Chat";
        $scope.messages.push(msg);
    });
  });
});
