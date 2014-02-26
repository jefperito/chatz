var users = require('./repositories/users');
var emitter = require('./communication/emitter');
var db = require('./persistence/db');
var redis = require('redis');
var RedisStore = require('socket.io/lib/stores/redis');
var config = require('./config');

db.init();

var configuration = {
	'log level': 0,
	'browser client minification': true,
	origins: '*:*'
};

var io = require('socket.io').listen(config.PORT, configuration);
io.set('store', new RedisStore({
	redis: redis,
	pub: redis.createClient(),
	sub: redis.createClient(),
	client: redis.createClient()
}));

// Protocol
io.sockets.on('connection', function(socket) {
	var pub = redis.createClient();
	socket.on('login', function(userDTO, callback) {
		pub.publish('login', JSON.stringify(userDTO));
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
		} catch (error) {
			console.error(error);
			callback(error);
		}
	});

	socket.on('sendMessage', function(messageDTO, callback) {
		try {
			var Message = require('./../server/models/message');
			var message = new Message(messageDTO);

			pub.publish('message', JSON.stringify(messageDTO));
			emitter.message(message, socket._user, users.get(message.getTargetId()));
			callback();
		} catch (error) {
			console.error(error);
			callback(error);
		}
	});

	socket.on('getUsers', function(callback) {
		callback(null, users.toDTO());
	});

	socket.on('disconnect', function() {

	});
});

console.log('Running...');