var socketController = (function () {
    var users = require('./repositories/users');
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
        var message = new Message(messageDTO);
        emitter.message(message, socket._user, users.get(message.getTargetId()));

        callback();
    }

    function getUsers(socket, callback) {
        callback(null, users.toDTO());
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
        get emitter() {
            return emitter;
        },
        set emitter(_emitter) {
            emitter = _emitter;
        }
    };
})();

module.exports = socketController;