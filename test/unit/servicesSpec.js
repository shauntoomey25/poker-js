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

  describe('MessagingService', function() {

    it('should store a single user message', inject(function(MessagingService, UserService) {
      UserService.addUser({id: '1', name: 'TEST'});
      MessagingService.addMessage({from: '1', content: 'HI'});
      var messages = MessagingService.getMessages();
      expect(messages.length).toEqual(1);
      var message = messages[0];
      expect(message.from.id).toEqual('1');
      expect(message.from.name).toEqual('TEST');
      expect(message.content).toEqual('HI');
    }));

    it('should store a single system message', inject(function(MessagingService) {
      MessagingService.addMessage({from: null, content: 'HI'});
      var messages = MessagingService.getMessages();
      expect(messages.length).toEqual(1);
      var message = messages[0];
      expect(message.content).toEqual('HI');
    }));

    it('should be able to add multiple messages simultaneously',
        inject(function(MessagingService, UserService) {
      UserService.addUser({id: '1', name: 'TEST'});
      MessagingService.addMessages([{from: '1', content: 'HI1'}, {from: null, content: 'HI2'}]);
      var messages = MessagingService.getMessages();
      expect(messages.length).toEqual(2);
      var message1 = messages[0];
      expect(message1.from.id).toEqual('1');
      expect(message1.from.name).toEqual('TEST');
      expect(message1.content).toEqual('HI1');
      var message2 = messages[1];
      expect(message2.content).toEqual('HI2');
    }));

  });

});
