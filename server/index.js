
var logger    = require('./logger_handler');
var users     = require('./repositories/users');
var validator = require('./validator');

var configuration = {
	'log level': 0,
	'browser client minification': true
};

var io = require('socket.io').listen(8080, configuration);

io.sockets.on('connection', function (socket) {

	socket.on('login', function(user, callback) {
		try {
			users.add(user);
			socket._user = user;
			//@TODO Notifica outros usuários da entrada deste usuário
		} catch(error) {
			callback(error);
		}
    });

    socket.on('send_message', function(message, callback) {
		try {
			validator.message(message);
			logger.message(message);
			//@TODO Enviar a mensagem pro destinatário
		} catch(error) {
			callback(error);
		}
    });

	socket.on('disconnect', function () {
		io.sockets.emit('user disconnected');
	});
});

console.log('Running...');
