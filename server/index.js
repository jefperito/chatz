var db = require('./persistence/db');
var config = require('./config');
var controller = require('./controller');
var fs = require('fs');

db.init();

var configuration = {
    'log level': config.SOCKET_LOG_LEVEL,
    'browser client minification': true,
    'origins': config.ORIGINS,
    transports: ['websocket', 'polling']
};

var io = require('socket.io').listen(config.PORT, configuration);

// Protocol
io.sockets.on('connection', function(socket) {
    socket.on('login', function(userDTO, callback) {
        try {
            controller.login(socket, userDTO, callback);
        } catch (error) {
            console.error(error);
            callback(error);
        }
    });

    socket.on('sendMessage', function(messageDTO, callback) {
        try {
            controller.sendMessage(socket, messageDTO, callback);
        } catch (error) {
            console.error(error);
            callback(error);
        }
    });

    socket.on('getUsers', function(callback) {
        controller.getUsers(socket, callback);
    });

    socket.on('getRooms', function(callback) {
        callback(controller.getRooms(socket));
    });

    socket.on('joinRoom', function(roomId, callback) {
        controller.joinRoom(socket, roomId);
        callback();
    });

    socket.on('disconnect', function() {
        controller.disconnect(socket);
    });
});

console.log('Running...');