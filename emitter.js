
var emitter = (function() {
	'use strict';

	function UserNotFoundException(message) {
		this.name    = 'UserNotFoundException';
		this.message = message;
	}

	var sockets = [];

	function reset() {
		sockets = [];
	}

	function newUser(socket) {
		sockets.push(socket);
		socket.broadcast.emit('newUser', socket._user);
	}

	function userLogout(socket) {
		for (var i in sockets) {
			if (sockets[i]._user.id === socket._user.id) {
				sockets.splice(i, 1);

				return ;
			}
		}

		throw new UserNotFoundException('User not found');
	}

	function message(msg) {
		for (var i in sockets) {
			if (sockets[i]._user.id == msg.target_id) {
				sockets[i].emit('receiveMsg', msg);
			}
		}
	}

	function getSockets() {
		return sockets;
	}

	return {
		newUser: newUser,
		userLogout: userLogout,
		message: message,
		getSockets: getSockets,
		reset: reset
	};
})();

module.exports = emitter;
