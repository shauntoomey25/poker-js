'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('pokerJS.controllers'));

  it('should define MainCtrl at startup', inject(function($controller) {
    var mainCtrl = $controller('MainCtrl');
    expect(mainCtrl).toBeDefined();
  }));

});
