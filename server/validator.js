
var validator = (function() {
	'use strict';

	function NoPropertyException(message) {
		this.name    = 'NoPropertyException';
		this.message = message;
	}

	function user(_user) {
		if (Object.prototype.toString.call(_user) !== '[object Object]') {
			throw new TypeError('the parameter is not an object');
		}

		if (!_user.hasOwnProperty('id')) {
			throw new NoPropertyException('object has not property id');
		}

		if (!_user.hasOwnProperty('name')) {
			throw new NoPropertyException('object has not property name');
		}
	}

	function message(_message) {
		if (Object.prototype.toString.call(_message) !== '[object Object]') {
			throw new TypeError('the parameter is not an object');
		}

		if (!_message.hasOwnProperty('target')) {
			throw new NoPropertyException('object has not property target');
		}

		if (!_message.hasOwnProperty('sender')) {
			throw new NoPropertyException('object has not property sender');
		}

		if (!_message.hasOwnProperty('body')) {
			throw new NoPropertyException('object has not property body');
		}
	}

	return {
		user: user,
		message: message
	};
})();

module.exports = validator;
