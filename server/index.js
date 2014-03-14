var users = require('./repositories/users');
var emitter = require('./communication/emitter');
var db = require('./persistence/db');
var redis = require('redis');
var RedisStore = require('socket.io/lib/stores/redis');
var config = require('./config');
var controller = require('./controller');

db.init();

var configuration = {
    'log level': config.SOCKET_LOG_LEVEL,
    'browser client minification': true,
    'origins': config.ORIGINS
};

var io = require('socket.io').listen(config.PORT, configuration);
io.set('store', new RedisStore({
    redis: redis,
    pub: redis.createClient(),
    sub: redis.createClient(),
    client: redis.createClient()
}));

// Protocol
io.sockets.on('connection', function (socket) {
    var pub = redis.createClient();
    socket.on('login', function (userDTO, callback) {
        pub.publish('login', JSON.stringify(userDTO));
        try {
            controller.login(socket, userDTO, callback);
        } catch (error) {
            console.error(error);
            callback(error);
        }
    });

    socket.on('sendMessage', function (messageDTO, callback) {
        try {
            pub.publish('message', JSON.stringify(messageDTO));
            controller.sendMessage(socket, messageDTO, callback);
        } catch (error) {
            console.error(error);
            callback(error);
        }
    });

    socket.on('getUsers', function (callback) {
        controller.getUsers(socket, callback);
    });

    socket.on('disconnect', function () {
        controller.disconnect(socket);
    });
});

console.log('Running...');