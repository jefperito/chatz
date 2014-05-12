var db = require('./persistence/db');
var config = require('./config');
var controller = require('./controller');
var fs = require('fs');

db.init();

var configuration = {
    'log level': config.SOCKET_LOG_LEVEL,
    'browser client minification': true,
    'origins': config.ORIGINS,
    transports: ['websocket', 'xhr-polling']
};

var app = require('http').createServer(handler);
var io = require('socket.io').listen(app, configuration);

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

function handler(req, res) {
    fs.readFile(__dirname + '/../demo/demo1/index.html',
        function(err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}

app.listen(process.env.PORT || 80);

console.log('Running...');