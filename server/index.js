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
			var userPersisted = users.get(user.getId());

			if (userPersisted === undefined) {
				userPersisted = user;
				users.add(userPersisted);
				socket._user = userPersisted;
				emitter.newUser(socket);
			}

			socket._user = userPersisted;
			userPersisted.addSocket(socket);

			callback(null, userPersisted.toDTO());
		} catch(error) {
			console.log(error);
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
			console.log(error);
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
