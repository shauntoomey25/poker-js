'use strict';

/* jasmine specs for services go here */

describe('Services', function() {

  beforeEach(module('pokerJS'));

  describe('UserService', function() {

    it('should store a single user', inject(function(UserService) {
      UserService.addUser({id: '1', name: 'TEST'});
      expect(UserService.hasUserWithID('1')).toEqual(true);
      var user = UserService.userWithID('1');
      expect(user.name).toEqual('TEST');
    }));

    it('should store multiple users', inject(function(UserService) {
      UserService.addUsers([{id: '1', name: 'TEST1'}, {id: '2', name: 'TEST2'}]);
      expect(UserService.hasUserWithID('1')).toEqual(true);
      expect(UserService.hasUserWithID('2')).toEqual(true);
      var user1 = UserService.userWithID('1');
      expect(user1.name).toEqual('TEST1');
      var user2 = UserService.userWithID('2');
      expect(user2.name).toEqual('TEST2');
    }));

  });

});
