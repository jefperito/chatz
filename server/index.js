var users = require('./repositories/users');
var emitter = require('./communication/emitter');

var configuration = {
	'log level': 0,
	'browser client minification': true
};

var io = require('socket.io').listen(8080, configuration);

// Protocol

io.sockets.on('connection', function(socket) {
	socket.on('login', function(userDTO, callback) {
		console.log('aqui no login');
		try {
			var User = require('./../server/models/user');
			var user = new User(userDTO);

			users.add(user);
			socket._user = user;
			emitter.newUser(socket);

			callback();
		} catch(error) {
			callback(error);
		}
    });

    socket.on('send_message', function(messageDTO, callback) {
		try {
			var Message = require('./../server/models/message');
			var message = new Message(messageDTO);
		} catch(error) {
			callback(error);
		}
    });

	socket.on('disconnect', function () {
		emitter.logoutUser(socket);
		//io.sockets.emit('user disconnected');
	});
});

console.log('Running...');
