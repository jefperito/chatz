var users = require('./repositories/users');
var emitter = require('./communication/emitter');

var configuration = {
	'log level': 0,
	'browser client minification': true,
	origins: '*:*'
};

var io = require('socket.io').listen(8080, configuration);

// Protocol

io.sockets.on('connection', function(socket) {
	socket.on('login', function(userDTO, callback) {
		try {
			var User = require('./../server/models/user');
			var user = new User(userDTO);

			if (!users.get(user.getId())) {
				users.add(user);
			} else {
				user = users.get(user.getId());
			}

			user.addSocket(socket);

			socket._user = user;
			emitter.newUser(socket);

			callback(null, user.toDTO());
		} catch(error) {
			callback(error);
		}
    });

    socket.on('sendMessage', function(messageDTO, callback) {
		try {
			var Message = require('./../server/models/message');
			var message = new Message(messageDTO);

			emitter.message(message, socket._user, users.get(message.getTargetId()));
			callback();
		} catch(error) {
			callback(error);
		}
    });

    socket.on('getUsers', function(callback) {
		callback(null, users.toDTO());
    });

	socket.on('disconnect', function () {

	});
});

console.log('Running...');
