var socketController = (function() {
    var users = require('./repositories/users');
    var rooms = require('./repositories/rooms');
    var emitter = require('./communication/emitter');
    var config = require('./config');
    var counters = {};
    // Protocol Functions

    if (!config.MULTIPLE_ROOMS) {
        rooms.createDefault();
    }

    function login(socket, userDTO, callback) {
        var User = require('./../server/models/user');
        var user = new User(userDTO);
        var userPersisted = users.get(user.getId());

        if (userPersisted === undefined) {
            userPersisted = user;
            users.add(userPersisted);
            socket._user = userPersisted;
            emitter.newUser(socket);
        } else {
            if (counters.hasOwnProperty(userPersisted.getId())) {
                clearInterval(userPersisted.getId());
            }
        }

        socket._user = userPersisted;
        userPersisted.addSocket(socket);

        callback(null, userPersisted.toDTO());
    }

    function sendMessage(socket, messageDTO, callback) {
        var Message = require('./../server/models/message');
        messageDTO.sender = socket._user.toDTO();
        var message = new Message(messageDTO);
        var room = rooms.get(messageDTO.room_id);

        if (!room) {
            callback({
                message: 'Room not found'
            });
            return;
        }

        room.addMessage(message);
        emitter.message(room, message, socket);

        callback();
    }

    function getUsers(socket, callback) {
        callback(null, users.toDTO());
    }

    function joinRoom(socket, roomId) {
        if (rooms.get(roomId)) {
            socket._user.addRoom(roomId);
        }
    }

    function getRooms(socket) {
        var roomsDTO = [];
        var roomsIds = socket._user.getRooms();
        roomsIds.forEach(function(roomId) {
            roomsDTO.push(rooms.get(roomId).toDTO());
        });

        return roomsDTO;
    }

    function disconnect(socket) {
        if (socket._user) {
            var user = users.get(socket._user.getId());
            user.removeSocket(socket);

            if (user.getSockets().length === 0) {
                counter(socket, user);
            }
        }
    }

    // Helper functions

    function counter(socket, user) {
        var userId = user.getId();
        counters[userId] = setInterval(function() {
            emitter.logoutUser(socket);
            users.remove(user);

            clearInterval(counters[userId]);
        }, config.OUT_TIME);
    }

    return {
        login: login,
        sendMessage: sendMessage,
        disconnect: disconnect,
        getUsers: getUsers,
        joinRoom: joinRoom,
        getRooms: getRooms,
        get emitter() {
            return emitter;
        },
        set emitter(_emitter) {
            emitter = _emitter;
        },
        get rooms() {
            return rooms;
        },
        set rooms(_rooms) {
            rooms = _rooms;
        }
    };
})();

module.exports = socketController;