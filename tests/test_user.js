var assert = require('assert');

suite('user', function() {
	var User = require('./../server/models/user');

	suite('attributes', function() {
		test('should set attributes when the User is initialized', function() {
			var user = new User({
				id: 1,
				name: 'Jeferson Viana Perito'
			});

			assert.equal('Jeferson Viana Perito', user.getName());
			assert.equal(1, user.getId());
		});

		test('should get attributes from User object', function() {
			var user = new User();

			assert.equal(undefined, user.getId());
			assert.equal(undefined, user.getName());
		});

		test('should hold attributes when set them', function() {
			var user = new User();

			user.setId(2);
			user.setName('Liu Kang');

			assert.equal(2, user.getId());
			assert.equal('Liu Kang', user.getName());
		});
	});
});