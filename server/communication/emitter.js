var emitter = (function() {
    'use strict';

    function newUser(socket) {
        socket.broadcast.emit('newUser', socket._user.toDTO());
    }

    function logoutUser(socket) {
        socket.broadcast.emit('removeUser', socket._user.toDTO());
    }

    function message(room, msg, socket) {
        socket.broadcast.to(room.getId()).emit('receiveMsg', msg);
    }

    return {
        newUser: newUser,
        logoutUser: logoutUser,
        message: message
    };
})();

module.exports = emitter;