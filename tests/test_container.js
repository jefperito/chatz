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
			return error.name == 'InvalidItemException';
		});
	});

	test('should permits set an item', function() {
		var db  = {};
		var db2 = {whatever: 123};

		container.add('db', db);
		container.set('db', db2);

		assert.deepEqual(db2, container.get('db'));
	});

	test('should throw InvalidItemException when receive a absent namespace', function() {
		var db = {};

		assert.throws(function() {
			container.set('db', db);
		}, function(error) {
			return error.name == 'InvalidItemException';
		});
	});

	test('should throw InvalidItemException when try get an item with absent namespace', function() {
		assert.throws(function() {
			container.get('teste');
		}, function(error) {
			return error.name == 'InvalidItemException';
		});
	});
});
