
var container = (function() {
	'use strict';

	function InvalidItemException(message) {
		this.message = message;
		this.name    = 'InvalidItemException';
	}

	var box = {};

	function add(namespace, item) {
		if (box.hasOwnProperty(namespace)) {
			throw new InvalidItemException('Ja existe item com este namespace.');
		}

		box[namespace] = item;
	}

	function get(namespace) {
		if (!box.hasOwnProperty(namespace)) {
			throw new InvalidItemException('Nao existe item com este namespace.');
		}

		return box[namespace];
	}

	function set(namespace, item) {
		if (!box.hasOwnProperty(namespace)) {
			throw new InvalidItemException('Nao existe item com este namespace.');
		}

		box[namespace] = item;
	}

	function reset() {
		box = {};
	}

	return {
		add: add,
		get: get,
		set: set,
		reset: reset
	};
})();

module.exports = container;