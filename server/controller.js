var socketController = (function () {
    var users = require('./repositories/users');
    var rooms = require('./repositories/rooms');
    var emitter = require('./communication/emitter');
    var config = require('./config');
    var counters = {};
    // Protocol Functions

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
        messageDTO.target = users.get(messageDTO.target_id).toDTO();
        messageDTO.sender = users.get(messageDTO.sender_id).toDTO();
        var message = new Message(messageDTO);
        var room = rooms.getByMessage(message);
        var target = users.get(message.getTarget().id);

        if (room.isNew()) {
            socket._user.addRoom(room.getId());
            target.addRoom(room.getId());
            room.ok();
        }

        room.addMessage(message);
        emitter.message(room, message, socket._user, target);

        callback();
    }

    function getUsers(socket, callback) {
        callback(null, users.toDTO());
    }

    function getRooms(socket) {
        return socket._user.getRoomsDTO();
    }

    function disconnect(socket) {
        var user = users.get(socket._user.getId());
        user.removeSocket(socket);

        if (user.getSockets().length === 0) {
            counter(socket, user);
        }
    }

    // Helper functions

    function counter(socket, user) {
        var userId = user.getId();
        counters[userId] = setInterval(function () {
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
        getRooms: getRooms,
        get emitter() {
            return emitter;
        },
        set emitter(_emitter) {
            emitter = _emitter;
        }
    };
})();

module.exports = socketController;