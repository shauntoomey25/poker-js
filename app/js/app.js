'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('pokerJS', [
  'ngRoute',
  'ngAnimate',
  'pokerJS.services',
  'pokerJS.controllers'
]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/main.html',
      controller: 'MainCtrl'
    });
}]);

app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode(true);
}]);
