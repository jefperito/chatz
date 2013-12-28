
var emitter = (function() {
	'use strict';

	function newUser(socket) {
		socket.broadcast.emit('newUser', socket._user);
	}

	function logoutUser(socket) {
		socket.broadcast.emit('removeUser', socket._user);
	}

	function message(msg, targetUser) {
		targetUser.getSockets().forEach(function(socket) {
			socket.emit('receiveMsg', msg);
		});
	}

	return {
		newUser: newUser,
		logoutUser: logoutUser,
		message: message
	};
})();

module.exports = emitter;