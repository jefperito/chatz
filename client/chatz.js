var chatz = (function() {
    var socket;
    var events = {
        newUser: [],
        removeUser: [],
        receiveMsg: []
    };

    function init(url) {
        try {
            socket = io.connect(url);
        } catch (e) {
            console.error('socket.io not loaded - start your server and insert the socket.io client library');
            return ;
        }

        socket.on('removeUser', function(user) {
            events.removeUser.forEach(function(callback) {
                callback(user);
            });
        });

        socket.on('receiveMsg', function(message) {
            events.receiveMsg.forEach(function(callback) {
                callback(message);
            });
        });

        socket.on('newUser', function(user) {
            events.newUser.forEach(function(callback) {
                callback(user);
            });
        });
    }

    function addUser(user, callback) {
        if (user === undefined || user.id === undefined || user.name === undefined) {
            callback({message: 'bad formed user'});
            return ;
        }

        socket.emit('login', user, callback);
    }

    function getUsers(callback) {
        socket.emit('getUsers', callback);
    }

    function joinRoom(roomId, callback) {
        socket.emit('joinRoom', roomId, callback);
    }

    function getRooms(callback) {
        socket.emit('getRooms', callback);
    }

    function sendMessage(message, callback) {
        if (message === undefined || message.target_id === undefined || message.sender_id === undefined || message.body === undefined) {
            callback({message: 'bad formed message'});
            return ;
        }

        socket.emit('sendMessage', message, callback);
    }

    function addEvent(eventName, callback) {
        if (!events.hasOwnProperty(eventName)) {
            throw Error("This event doesnt exist!");
        }

        events[eventName].push(callback);
    }

    return {
        init: init,
        addUser: addUser,
        getUsers: getUsers,
        getRooms: getRooms,
        sendMessage: sendMessage,
        addEvent: addEvent,
        joinRoom: joinRoom
    };
})();
