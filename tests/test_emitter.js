var assert = require('assert');
var sinon  = require('sinon');

suite('emitter', function() {
	suite('user', function() {
		setup(function() {
			var emitter = require('./../emitter');
			emitter.reset();
		});

		test('should permits to send broadcast to others users when an user is added', function() {
			var emitter    = require('./../emitter');
			var fakeUser   = {
				id: 1,
				name: 'Jeferson Viana Perito'
			};

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

			assert.equal(1, emitter.getSockets().length);
		});

		test('should permits remove an user', function() {
			var emitter = require('./../emitter');
			var fakeUser   = {
				id: 1,
				name: 'Jeferson Viana Perito'
			};

			var socketFake = {
				broadcast: {
					emit: function(protocolName, newUser) {}
				},
				_user: fakeUser
			};

			emitter.newUser(socketFake);
			emitter.userLogout(socketFake);

			assert.equal(0, emitter.getSockets().length);
		});

		test('should permits send a message', function() {
			var emitter = require('./../emitter');
			var message = {
				target_id: 1,
				sender_id: 2,
				body: 'Ola mundo'
			};

			var fakeUser1 = {
				id: 1,
				name: 'Jeferson Viana Perito'
			};

			var fakeUser2 = {
				id: 2,
				name: 'Francieli Rozza'
			};

			var fakeSocket1 = {
				broadcast: {
					emit: function(protocolName, message) {}
				},
				emit: function(protocolName, msg) {
					assert.equal('receiveMsg', protocolName, 'Wrong protocol name.');
					assert.deepEqual(message, msg, 'Wrong message.');
				},
				_user: fakeUser1
			};

			var count = 0;

			var fakeSocket2 = {
				broadcast: {
					emit: function(protocolName, msg) {}
				},
				emit: function(protocolName, msg) {
					assert(false, 'inverse emit');
				},
				_user: fakeUser2
			};

			emitter.newUser(fakeSocket1);
			emitter.newUser(fakeSocket2);

			emitter.message(message);
		});
	});
});
