
var validator = (function() {
	'use strict';

	function user(user) {
		if (!user.hasOwnProperty('id')) {
			throw new Error('User has not property id');
		}

		if (!user.hasOwnProperty('name')) {
			throw new Error('User has not property name');
		}
	}

	function message(message) {
		if (!message.hasOwnProperty('target_id')) {
			throw new Error('Message has not property target_id');
		}

		if (!message.hasOwnProperty('sender_id')) {
			throw new Error('Message has not property sender_id');
		}

		if (!message.hasOwnProperty('body')) {
			throw new Error('Message has not property body');
		}
	}

	return {
		user: user,
		message: message
	};
})();

module.exports = validator;
