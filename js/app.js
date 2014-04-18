'use strict';

// Declare app level module which depends on filters, and services
angular.module('pokerJS', [
  'ngRoute',
  'ngAnimate',
  'pokerJS.services',
  'pokerJS.controllers'
]).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/main.html',
      controller: 'MainCtrl'
    });
  $locationProvider.html5Mode(true);
}]);
