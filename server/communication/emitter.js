var emitter = (function () {
	'use strict';

	function emitMessageToSockets(room, sockets, msg) {
		sockets.forEach(function (socket) {
			socket.emit('receiveMsg', msg, room.getId());
		});
	}

	function newUser(socket) {
		socket.broadcast.emit('newUser', socket._user.toDTO());
	}

	function logoutUser(socket) {
		socket.broadcast.emit('removeUser', socket._user.toDTO());
	}

	function message(room, msg, senderUser, targetUser) {
		emitMessageToSockets(room, senderUser.getSockets(), msg);
		emitMessageToSockets(room, targetUser.getSockets(), msg);
	}

	return {
		newUser: newUser,
		logoutUser: logoutUser,
		message: message
	};
})();

module.exports = emitter;