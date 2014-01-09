
var emitter = (function() {
	'use strict';

	function emitMessageToSockets(sockets, msg) {
		sockets.forEach(function(socket) {
			socket.emit('receiveMsg', msg);
		});
	}

	function newUser(socket) {
		socket.broadcast.emit('newUser', socket._user.toDTO());
	}

	function logoutUser(socket) {
		socket.broadcast.emit('removeUser', socket._user.toDTO());
	}

	function message(msg, senderUser, targetUser) {
		emitMessageToSockets(senderUser.getSockets(), msg);
		emitMessageToSockets(targetUser.getSockets(), msg);
	}

	return {
		newUser: newUser,
		logoutUser: logoutUser,
		message: message
	};
})();

module.exports = emitter;
