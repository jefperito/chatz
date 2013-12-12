var assert = require('assert');

suite('container', function() {
	var container = require('./../container');

	setup(function() {
		container.reset();
	});

	test('should permits add an item', function() {
		var db = {};
		container.add('db', db);

		assert.deepEqual(db, container.get('db'));
	});

	test('should throw InvalidItemException when receive an item with namespace already included', function() {
		var db = {};

		assert.throws(function() {
			container.add('db', db);
			container.add('db', db);
		}, function(error) {
			if (error.name == 'InvalidItemException') {
				return true;
			}
		});
	});
});
