
var validator = (function() {
	'use strict';

	function NoPropertyException(message) {
		this.name    = 'NoPropertyException';
		this.message = message;
	}

	function user(_user) {
		if (!_user.hasOwnProperty('id')) {
			throw new NoPropertyException('User has not property id');
		}

		if (!_user.hasOwnProperty('name')) {
			throw new NoPropertyException('User has not property name');
		}
	}

	function message(_message) {
		if (!_message.hasOwnProperty('target_id')) {
			throw new NoPropertyException('Message has not property target_id');
		}

		if (!_message.hasOwnProperty('sender_id')) {
			throw new NoPropertyException('Message has not property sender_id');
		}

		if (!_message.hasOwnProperty('body')) {
			throw new NoPropertyException('Message has not property body');
		}
	}

	return {
		user: user,
		message: message
	};
})();

module.exports = validator;
