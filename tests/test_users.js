var assert = require('assert');

suite('users', function() {
	setup(function() {
		var users = require('./../users');
		users.setList([]);
	});

	suite('list', function() {
		test('should to have empty list', function() {
			var users = require('./../users');

			assert.deepEqual([], users.getList());
		});

		test('should permits add a user to the list', function() {
			var users = require('./../users');

			var user = {
				id: 1,
				name: 'Jeferson Viana Perito'
			};

			users.add(user);

			assert.equal(1, users.getList().length);
		});

		test('should permits remove a user from the list', function() {
			var users = require('./../users');

			var user = {
				id: 1,
				name: 'Jeferson Viana Perito'
			};

			users.add(user);
			users.remove(user);

			assert.equal(0, users.getList().length);
		});

		test('should throws exception if user not found to remove', function() {
			var users = require('./../users');

			var user1 = {
				id: 1,
				name: 'Jeferson Viana Perito'
			};

			var user2 = {
				id: 2,
				name: 'Francieli Rozza'
			};

			users.add(user1);

			assert.throws(
				function() {
					users.remove(user2);
				},
				function(error) {
					return error instanceof TypeError && /User not found/.test(error);
				}
			);
		});
	});
});