var assert = require('assert');

suite('emitter', function() {
	var emitter = require('./../server/communication/emitter');
	var User = require('./../server/models/user');

	suite('user', function() {
		test('should permits to send broadcast to others users when an user is added', function() {
			var fakeUser = new User({
				id: 1,
				name: 'Jeferson Viana Perito'
			});

			var socketFake = {
				broadcast: {
					emit: function(protocolName, newUser) {
						assert.equal('newUser', protocolName);
						assert.deepEqual(fakeUser, newUser);
					}
				},
				_user: fakeUser
			};

			emitter.newUser(socketFake);
		});

		test('should permits remove an user', function() {
			var fakeUser = new User({
				id: 1,
				name: 'Jeferson Viana Perito'
			});

			var socketDummy = {
				broadcast: {
					emit: function() {}
				}
			};

			var socketFake = {
				broadcast: {
					emit: function(protocolName, user) {
						assert.equal('removeUser', protocolName);
						assert.deepEqual(fakeUser, user);
					}
				},
				_user: fakeUser
			};

			emitter.newUser(socketDummy);
			emitter.logoutUser(socketFake);
		});

		test('should permits send a message', function() {
			var message = {
				target_id: 1,
				sender_id: 2,
				body: 'Ola mundo'
			};

			var fakeUser = new User({
				id: 1,
				name: 'Jeferson Viana Perito'
			});

			var fakeSocket = {
				broadcast: {
					emit: function() {}
				},
				emit: function(protocolName, msg) {
					assert.equal('receiveMsg', protocolName, 'Wrong protocol name.');
					assert.deepEqual(message, msg, 'Wrong message.');
				},
				_user: fakeUser
			};

			fakeUser.addSocket(fakeSocket);

			emitter.message(message, fakeUser);
		});
	});
});
