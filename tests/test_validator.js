var assert = require('assert');

suite('validator', function() {
	suite('user', function() {
		test('should throws exception if user is empty object', function() {
			var validator = require('./../validator');

			assert.throws(
				function() {
					validator.user({});
				},
				function(error) {
					return error instanceof Error && /User has not property id/.test(error);
				}
			);
		});

		test('should throws exception if user not has own property id', function() {
			var validator = require('./../validator');

			var user = {
				name: 'Jeferson Viana Perito'
			};

			assert.throws(
				function() {
					validator.user(user);
				},
				function(error) {
					return error instanceof Error && /User has not property id/.test(error);
				}
			);
		});

		test('should throws exception if user not has own property name', function() {
			var validator = require('./../validator');

			var user = {
				id: 1
			};

			assert.throws(
				function() {
					validator.user(user);
				},
				function(error) {
					return error instanceof Error && /User has not property name/.test(error);
				}
			);
		});

		test('should validate if user has own property name and id', function() {
			var validator = require('./../validator');

			var user = {
				id: 1,
				name: 'Jeferson Viana Perito'
			};

			assert.doesNotThrow(
				function() {
					validator.user(user);
				},
				'User is invalid'
			);
		});
	});

	suite('message', function() {
		test('should throws exception if message has not own property target_id', function() {
			var validator = require('./../validator');

			var message = {
				sender_id: 2,
				body: 'Hello World!'
			};

			assert.throws(
				function() {
					validator.message(message);
				},
				function(error) {
					return error instanceof Error && /Message has not property target_id/.test(error);
				}
			);
		});

		test('should throws exception if message has not own property sender_id', function() {
			var validator = require('./../validator');

			var message = {
				target_id: 1,
				body: 'Hello World'
			};

			assert.throws(
				function() {
					validator.message(message);
				},
				function (error) {
					return error instanceof Error && /Message has not property sender_id/.test(error);
				}
			);
		});

		test('should throws exception if message has not own property body', function() {
			var validator = require('./../validator');

			var message = {
				target_id: 1,
				sender_id: 2
			};

			assert.throws(
				function() {
					validator.message(message);
				},
				function(error) {
					return error instanceof Error && /Message has not property body/.test(error);
				}
			);
		});

		test('should validate if message has all properties', function() {
			var validator = require('./../validator');

			var message = {
				target_id: 1,
				sender_id: 2,
				body: 'Hello World!'
			};

			assert.doesNotThrow(
				function() {
					validator.message(message);
				},
				'Message is invalid'
			);
		});
	});
});