'use strict';

/* Directives */

var app = angular.module('pokerJS.directives', []);

app.directive('resizeHeight', function ($window) {
	return function (scope, element) {

		var w = angular.element($window);
    scope.distToTop = element.offset().top;
    scope.getWindowDim = function() {
        return { 'h': w.height(), 'w': w.width() };
    };
    scope.$watch(scope.getWindowDim, function(newValue, oldValue) {
        scope.style = function() {
            return {
                height: (newValue.h - scope.distToTop) + 'px'
            };
        };
    }, true);

    w.bind('resize', function () {
        scope.$apply();
    });
	}
})
